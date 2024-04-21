from server.utils.image_process import get_processed_image
from server.services import app
import numpy as np
from numpy.linalg import norm

from PIL import Image

def get_face_embeddings(image_path):
    image = get_processed_image(Image.open(image_path))
    faces = app.get(image)
    if len(faces) == 0:
        return []
    embedding = faces[0]["embedding"]
    return embedding

def get_similarity(image_path_1, image_path_2):
    embedding_1 = get_face_embeddings(image_path_1)
    embedding_2 = get_face_embeddings(image_path_2)
    if len(embedding_1) == 0 or len(embedding_2) == 0:
        return 0
    similarity = np.dot(embedding_1, embedding_2)/(norm(embedding_1)*norm(embedding_2))
    return similarity