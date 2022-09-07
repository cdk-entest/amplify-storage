import boto3

BUCKET = "amplifystorage0adcf1d082df447f80fb3d620f03b22764808-dev"
KEY = "public/image-1.jpeg"

url = boto3.client('s3').generate_presigned_url(
ClientMethod='get_object',
Params={'Bucket': BUCKET, 'Key': KEY},
ExpiresIn=3600)

print(url)