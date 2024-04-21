import os
import tempfile
import requests

async def download_image(image_url: str):
    
    response = requests.get(image_url, stream=True)
    if response.status_code == 200:
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as f:
            for chunk in response.iter_content(chunk_size=128):
                f.write(chunk)
        return f.name
    else:
        return None