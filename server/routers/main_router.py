import logging
from fastapi import APIRouter

from server.routers import WickORJSONResponse


LOG = logging.getLogger(__name__)
router = APIRouter()


@router.get("/health", response_class=WickORJSONResponse)
async def get_albums():
    return {
        "status": "Up"
    }