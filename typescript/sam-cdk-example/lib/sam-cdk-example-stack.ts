import { Stack, Construct, StackProps, Duration, RemovalPolicy } from '@aws-cdk/core';
import { Code, Function, LayerVersion, Runtime, Tracing } from '@aws-cdk/aws-lambda';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { LambdaRestApi, LambdaIntegration, Integration } from '@aws-cdk/aws-apigateway';
import { RetentionDays } from '@aws-cdk/aws-logs';

export class SamCdkExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new LayerVersion(this, 'SamCdkExampleLayer', {
      code: Code.fromAsset('layers'),
      compatibleRuntimes: [Runtime.NODEJS_14_X]
    });

    const lmb = new Function(this, 'SamCdkExampleLambda', {
      code: Code.fromAsset('lambda-fns'),
      handler: 'lambda.handler',
      runtime: Runtime.NODEJS_14_X,
      tracing: Tracing.ACTIVE,
      logRetention: RetentionDays.ONE_DAY, 
      timeout: Duration.minutes(3),
      layers: [layer]
    });

    const db = new Table(this, 'SamCdkExampleTable', {
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: 'dbtest',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      }
    });
    db.grantWriteData(lmb);

    const gtw = new LambdaRestApi(this, 'SamCdkExampleApiGateway', { 
      handler: lmb, 
      proxy: false 
    });

    const resource = gtw.root.addResource('api')
    const res_post = resource.addResource('post')
    res_post.addMethod('post', new LambdaIntegration(lmb))
  }
}
