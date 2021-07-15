import boto3
import json

client = boto3.client('sns')

def handler(event, context):
  sns_arn = 'arn:aws:sns:us-east-2:109881088269:base4contactus'
  print('received event:')
  print(event)
  if event['httpMethod'] == 'POST':
    print('Sending message to SNS')
    body = json.loads(event['body'])
    name = body.get('nome')
    email = body.get('email')
    msg = body.get('message')
    print(name)
    print(email)
    print(msg)
    try:
      resp = client.publish(TargetArn=sns_arn,
        Message=json.dumps({'default': json.dumps(body)}),
        MessageStructure='json'
      )
    except Exception as e:
      print('Error sending SNS message')
      print(f'Error {e}')

  response = {
    'msg': 'Obrigado por nos contactar'
  }
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(response)
  }