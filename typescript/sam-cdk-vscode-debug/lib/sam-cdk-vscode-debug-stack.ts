import {Stack, StackProps, Construct, Duration, RemovalPolicy} from '@aws-cdk/core';
import {LayerVersion, Code, Runtime, Function, Tracing} from '@aws-cdk/aws-lambda';
import {Table, AttributeType} from '@aws-cdk/aws-dynamodb';
import {RestApi, LambdaIntegration} from '@aws-cdk/aws-apigateway';
import {RetentionDays} from '@aws-cdk/aws-logs';

export class SamCdkVscodeDebugStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new LayerVersion(this, 'SamCdkVscodeDebugLayer', {
      code: Code.fromAsset('layer'),
      compatibleRuntimes: [Runtime.NODEJS_14_X]
    });

    const table = new Table(this, 'SamCdkVscodeDebugTable', {
      tableName: 'sam-cdk-vscode-debug-table',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      removalPolicy: RemovalPolicy.DESTROY
    });

    const postLambda = new Function(this, 'SamCdkVscodeDebugLambdaPost', {
      code: Code.fromAsset('lambda-fns/post'),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_14_X,
      tracing: Tracing.ACTIVE,
      logRetention: RetentionDays.ONE_DAY,
      timeout: Duration.seconds(30),
      layers: [layer],
      environment: {
        "TABLE_NAME": table.tableName
      }
    });
    table.grantWriteData(postLambda);

    const get = new Function(this, 'SamCdkVscodeDebugLambdaGet', {
      code: Code.fromAsset('lambda-fns/get'),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_14_X,
      tracing: Tracing.ACTIVE,
      logRetention: RetentionDays.ONE_DAY,
      timeout: Duration.seconds(30),
      layers: [layer],
      environment: {
        "TABLE_NAME": table.tableName
      }
    });
    table.grantReadData(get);

    const gtw = new RestApi(this, 'SamCdkVscodeDebugApiGateway', {
      restApiName: 'crud'
    });
    const resource = gtw.root.addResource('api');
    resource.addMethod('post', new LambdaIntegration(postLambda));
    const resId = resource.addResource('{id}');
    resId.addMethod('get', new LambdaIntegration(get));
  }
}
