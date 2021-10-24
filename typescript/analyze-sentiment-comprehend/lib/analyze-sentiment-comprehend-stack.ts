import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';
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
    comprehendLambda.addToRolePolicy(comprehendPolicy)
  }
}
