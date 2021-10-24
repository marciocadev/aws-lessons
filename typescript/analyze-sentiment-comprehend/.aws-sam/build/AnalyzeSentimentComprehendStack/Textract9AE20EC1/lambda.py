import json
import boto3

def handler(event, context):
    bucket = 'analyzesentimentcomprehend-textractbucket21eaff1a-ztjxs157l27f'
    document = 'cnh-digital-ja-esta-disponivel-em-sao-paulo.jpg'
    client = boto3.client('textract')

    response = client.detect_document_text(
        Document={'S3Object': {'Bucket': bucket, 'Name': document}}
    )

    blocks = response['Blocks']

    print(blocks)

    return {
        'statusCode': 200,
        'body': json.dumps(blocks)
    }
