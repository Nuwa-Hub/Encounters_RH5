from pyannote.audio import Model
from pyannote.audio import Inference

from insightface.app import FaceAnalysis

model = Model.from_pretrained("pyannote/wespeaker-voxceleb-resnet34-LM")
inference = Inference(model, window="whole")

app = FaceAnalysis(providers=["CUDAExecutionProvider", "CPUExecutionProvider"])
app.prepare(ctx_id=0, det_thresh=0.1)