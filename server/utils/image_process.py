from PIL import Image, ExifTags

ORIENTATION_FLAG = [k for k, v in ExifTags.TAGS.items() if v == "Orientation"][0]
import numpy as np

def rotate_image(image: Image):
    exif = image.getexif()

    if ORIENTATION_FLAG not in exif:
        return image
    elif exif[ORIENTATION_FLAG] == 3:
        image = image.rotate(180, expand=True)
    elif exif[ORIENTATION_FLAG] == 6:
        image = image.rotate(270, expand=True)
    elif exif[ORIENTATION_FLAG] == 8:
        image = image.rotate(90, expand=True)

    return image

def lighten_image(image, factor=1.5):
    image_array = np.array(image)
    
    brightened_image_array = np.clip(image_array * factor, 0, 255).astype(np.uint8)
    
    brightened_image = Image.fromarray(brightened_image_array)
    
    return brightened_image

def get_processed_image(image):
    image = rotate_image(image)
    image = lighten_image(image)
    np.array(lighten_image(rotate_image(image).convert("RGB")))
    return np.array(image)