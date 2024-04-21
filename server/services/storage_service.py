#want get data with boto3
# Path: services/storage_service.py
import boto3
import os
import io
import numpy as np
from numpy.linalg import norm

from server.services import inference

def download_wav(original_file, interview_file):
    s3 = boto3.resource(
        service_name='s3',
        region_name=os.getenv('AWS_REGION'),
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS KEY')
    )
                                        
    bucket = os.getenv('S3_BUCKET')
    s3.download_file(bucket, original_file, 'original.wav')
    s3.download_file(bucket, interview_file, 'interview.wav')

# Path: services/storage_service.py

def download_img(original_file, interview_file):
    s3 = boto3.resource(
        service_name='s3',
        region_name=os.getenv('AWS_REGION'),
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS KEY')
    )

    bucket = os.getenv('S3_BUCKET')
    s3.download_file(bucket, original_file, 'original.png')
    s3.download_file(bucket, interview_file, 'interview.png')