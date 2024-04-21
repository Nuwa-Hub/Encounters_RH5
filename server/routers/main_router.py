import logging
from fastapi import APIRouter, File, UploadFile, HTTPException
from tempfile import NamedTemporaryFile
import shutil

from server.services import speaker_verification
from server.routers import WickORJSONResponse

from server import CWD
import os

from server.services.face_identification import get_similarity


LOG = logging.getLogger(__name__)
router = APIRouter()


@router.get("/health", response_class=WickORJSONResponse)
async def get_albums():
    return {
        "status": "Up"
    }
    
@router.post("/audio-verify")
async def upload_wav_file(file: UploadFile = File(...)):
    if file.filename.endswith(".wav"):
        try:
            with NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
                shutil.copyfileobj(file.file, temp_file)
            original_file = "/home/banula/Projects/RealHack/Encounters_RH5/notebooks/input_1.wav" # TODO: get the file location from db
            similarity = speaker_verification.get_similarity(original_file, temp_file.name)
            temp_file.close()
            return {"filename": file.filename, "similarity": str(similarity)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")
    else:
        raise HTTPException(status_code=400, detail="Only .wav files are allowed.")


@router.post("/face-verify")
async def verify_face(person: str):
    directory = f"/home/banula/Projects/RealHack/Encounters_RH5/notebooks/{person}"
    if not os.path.isdir(directory):
        return HTTPException(status_code=400, detail="User is not registered")
    original_image = f"{directory}/image_2.jpeg" # TODO: get the file location from db
    images = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            absolute_path = os.path.abspath(os.path.join(root, file))
            images.append(absolute_path)
    return dict(zip(
        list(map(lambda name: name[len(directory)+1:], images)),
        list(map(lambda image: str(get_similarity(original_image, image)), images))
    ))