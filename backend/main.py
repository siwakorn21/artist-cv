import os
import tensorflow as tf
import numpy as np
import PIL.Image
import tensorflow_hub as hub
from fastapi import FastAPI, File, UploadFile
import uvicorn
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from starlette.responses import StreamingResponse
import boto3

os.environ['TFHUB_MODEL_LOAD_FORMAT'] = 'COMPRESSED'

class StyledTransferAPIBody(BaseModel):
  styled_image: str
  content_image: str

class UploadFileBody(BaseModel):
  content_image: str
  style_image: str

def tensor_to_image(tensor):
  tensor = tensor*255
  tensor = np.array(tensor, dtype=np.uint8)
  if np.ndim(tensor)>3:
    assert tensor.shape[0] == 1
    tensor = tensor[0]
  return PIL.Image.fromarray(tensor)

def load_img(path_to_img):
  max_dim = 512
  img = tf.io.read_file(path_to_img)
  img = tf.image.decode_image(img, channels=3)
  img = tf.image.convert_image_dtype(img, tf.float32)

  shape = tf.cast(tf.shape(img)[:-1], tf.float32)
  pic_dim = max(shape)
  scale = max_dim / pic_dim

  new_shape = tf.cast(shape * scale, tf.int32)

  img = tf.image.resize(img, new_shape)
  img = img[tf.newaxis, :]
  return img

def get_file_path(local_img):
  full_path = os.path.abspath("./" + local_img)  # or similar, depending on your scenario
  return full_path

def run_model(content_image, style_image):
  content_image = load_img(content_image)
  style_image = load_img(style_image)

  hub_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')
  stylized_image = hub_model(tf.constant(content_image), tf.constant(style_image))[0]
  tensor_to_image(stylized_image).save("assets/images/result.jpeg")

def uploadImage():
  ACCESS_KEY_ID = "AKIAYU67Y5BQB4WMU57E"
  SECRET_ACCESS_KEY = "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"
  client = boto3.client('s3', aws_access_key_id=ACCESS_KEY_ID, aws_secret_access_key=SECRET_ACCESS_KEY, region_name='ap-southeast-1')
  client.upload_file('assets/images/result.jpeg', 'comp-cv-artist-1', 'result.jpeg')

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"], # Allows all origins
  allow_credentials=True,
  allow_methods=["*"], # Allows all methods
  allow_headers=["*"], # Allows all headers
)

@app.post("/styletransfer")
async def create_upload_file(content_image: UploadFile, style_image: UploadFile):
  os.system("rm -rf /home/ubuntu/.keras")
  os.system("rm -rf assets/images/*")
  file_location = f"assets/images/target_image.jpeg"
  with open(file_location, "wb+") as file_object_1:
    file_object_1.write(content_image.file.read())

  file_location = f"assets/images/style_image.jpeg"
  with open(file_location, "wb+") as file_object_2:
    file_object_2.write(style_image.file.read())

  run_model(
    content_image = "assets/images/target_image.jpeg",
    style_image   = "assets/images/style_image.jpeg"
  )

  uploadImage()

  return { "image_url": "https://comp-cv-artist-1.s3.ap-southeast-1.amazonaws.com/result.jpeg" }
  # return FileResponse("assets/images/result.jpeg")
  # return StreamingResponse(io.BytesIO(im_png.tobytes()), media_type="image/png")

if __name__ == "__main__":
  # uploadImage()
  uvicorn.run(app, host="0.0.0.0", port=8000)
  