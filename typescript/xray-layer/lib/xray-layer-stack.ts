import * as cdk from '@aws-cdk/core';
import { Code, LayerVersion, Runtime } from '@aws-cdk/aws-lambda';

export class XrayLayerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LayerVersion(this, 'XrayLayer', {
      layerVersionName: 'xrayLayer',
      code: Code.fromAsset('layer'),
      compatibleRuntimes: [Runtime.NODEJS_14_X]
    });
  }
}
