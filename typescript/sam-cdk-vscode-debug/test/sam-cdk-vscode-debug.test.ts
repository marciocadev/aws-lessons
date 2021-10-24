import { expect as expectCDK, matchTemplate, MatchStyle, haveResource, countResources } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SamCdkVscodeDebug from '../lib/sam-cdk-vscode-debug-stack';

// test('Empty Stack', () => {
//     const app = new cdk.App();
//     // WHEN
//     const stack = new SamCdkVscodeDebug.SamCdkVscodeDebugStack(app, 'MyTestStack');
//     // THEN
//     expectCDK(stack).to(matchTemplate({
//       "Resources": {}
//     }, MatchStyle.EXACT))
// });

test('Table exists', () => {
  // GIVEN
  const app = new cdk.Stack();
  // WHEN
  const stack = new SamCdkVscodeDebug.SamCdkVscodeDebugStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource('AWS::DynamoDB::Table', {
    TableName: 'sam-cdk-vscode-debug-table'
  }));
});

test('Lambda count', () => {
  // GIVEN
  const app = new cdk.App();
  // WHEN
  const stack = new SamCdkVscodeDebug.SamCdkVscodeDebugStack(app, 'MyTestStack');
  // THEN
  const lambdaLogRetention = 1;
  const lambdaCount = 2;
  expectCDK(stack).to(countResources('AWS::Lambda::Function', lambdaCount + lambdaLogRetention))
});

test('Lambda exists', () => {
  // GIVEN
  const app = new cdk.App();
  // WHEN
  const stack = new SamCdkVscodeDebug.SamCdkVscodeDebugStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource('AWS::Lambda::Function', {
    Runtime: 'nodejs14.x'
  }))
});
