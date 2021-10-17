import * as cdk from '@aws-cdk/core';
import { Code, Function, LayerVersion, Runtime, Tracing } from '@aws-cdk/aws-lambda';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Duration, RemovalPolicy } from '@aws-cdk/core';

export class SamCdkExampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
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
  }
}
