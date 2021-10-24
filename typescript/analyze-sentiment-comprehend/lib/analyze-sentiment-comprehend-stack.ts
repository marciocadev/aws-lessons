import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';
import { Bucket } from '@aws-cdk/aws-s3';
import { Function, Code, Runtime } from '@aws-cdk/aws-lambda';
import { Duration } from '@aws-cdk/aws-cloudwatch/node_modules/@aws-cdk/core';

export class AnalyzeSentimentComprehendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const comprehendLambda = new Function(this, 'DetectSentiment', {
      code: Code.fromAsset('lambda-fns/comprehend'),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_14_X,
      timeout: Duration.minutes(3)
    });

    const comprehendPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ['*'],
      actions: [
        "comprehend:DetectDominantLanguage",
        "comprehend:DetectEntities",
        "comprehend:DetectSentiment"
      ]
    });
    comprehendLambda.addToRolePolicy(comprehendPolicy);

    const bucket = new Bucket(this, 'TextractBucket');
    const textractLambda = new Function(this, 'Textract', {
      code: Code.fromAsset('lambda-fns/textract'),
      handler: 'lambda.handler',
      runtime: Runtime.PYTHON_3_8,
      timeout: Duration.minutes(3)
    })
    bucket.grantRead(textractLambda);
    const textractPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ['*'],
      actions: [
        "textract:DetectDocumentText",
        "textract:AnalyzeDocument"
      ]
    });
    textractLambda.addToRolePolicy(textractPolicy);
  }
}
