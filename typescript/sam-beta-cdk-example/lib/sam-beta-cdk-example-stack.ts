import * as cdk from '@aws-cdk/core';
import { Function, Runtime, Code, LayerVersion, Tracing } from '@aws-cdk/aws-lambda';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { Duration, RemovalPolicy } from '@aws-cdk/core';

export class SamBetaCdkExampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new LayerVersion(this, 'layer', {
      code: Code.fromAsset('layers'),
      compatibleRuntimes: [Runtime.NODEJS_14_X]
    });

    const lmb = new Function(this, 'lmb', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('lambda-fns'),
      handler: 'lambda.handler',
      tracing: Tracing.ACTIVE,
      timeout: Duration.minutes(3),
      layers: [layer]
    });

    const db = new Table(this, 'db', {
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: 'dbtest',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      }
    })

    db.grantWriteData(lmb)
  }
}
