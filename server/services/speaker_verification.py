import numpy as np
from numpy.linalg import norm

from server.services import inference

def get_similarity(original_file, interview_file):
    embedding1 = inference(original_file)
    embedding2 = inference(interview_file)
    cosine = np.dot(embedding1, embedding2)/(norm(embedding1)*norm(embedding2))
    return cosine