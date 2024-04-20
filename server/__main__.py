import logging

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server import CWD
from server.routers import main_router


LOG = logging.getLogger(__name__)


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

    LOG.debug("Initiating successful")

    return app


if __name__ == "__main__":
    app = create_app()

    uvicorn.run(app)
