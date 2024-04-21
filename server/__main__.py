import logging

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from multiprocessing import Process
from threading import Event as TEvent
from multiprocessing import Event as MPEvent
from concurrent.futures import ThreadPoolExecutor
from contextlib import suppress

from server import CWD
from server.routers import main_router
from server.jobs import message_consumer, consumer
from server.models import async_client, client

import asyncio


LOG = logging.getLogger(__name__)
BKG_TASKS = dict()
TASK_KILL_THREADING = TEvent()
TASK_KILL_MPROCESSING = MPEvent()
executor = ThreadPoolExecutor(max_workers=8)

async def start_tasks():
    LOG.debug("Starting background tasks")
    loop = asyncio.get_running_loop()
    BKG_TASKS["TASKS_WATERFALL"] = loop.run_in_executor(
        executor, message_consumer.consume_messages, TASK_KILL_THREADING
    )

async def end_tasks():
    LOG.debug("Shutting down background tasks")
    TASK_KILL_THREADING.set()
    TASK_KILL_MPROCESSING.set()
    executor.shutdown(wait=False)

    for _, task in BKG_TASKS.items():
        task.cancel()

    with suppress(asyncio.CancelledError):
        for _, task in BKG_TASKS.items():
            await task
    consumer.close()
    async_client.close()
    client.close()


def create_app():
    LOG.debug(f"RUNNING FROM - {CWD}")

    LOG.debug("Initiating app")
    app = FastAPI()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(prefix="/api/v1", router=main_router.router)
    
    @app.on_event("startup")
    async def startup():
        await asyncio.create_task(start_tasks())
        
    @app.on_event("shutdown")
    async def shutdown():
        await end_tasks()

    LOG.debug("Initiating successful")

    return app


if __name__ == "__main__":
    app = create_app()
    uvicorn.run(app)
