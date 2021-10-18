import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { assert } from 'console';
import * as SamCdkExample from '../lib/sam-cdk-example-stack';

test('Lambda exists', () => {
    // GIVEN
    const app = new cdk.App();
    // WHEN
    const stack = new SamCdkExample.SamCdkExampleStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource('AWS::Lambda::Function', {
      Runtime: 'nodejs14.x'
    }))
});

test('Table exists', () => {
    // GIVEN
    const app = new cdk.App();
    // WHEN
    const stack = new SamCdkExample.SamCdkExampleStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource('AWS::DynamoDB::Table', {
      TableName: 'dbtest'
    }))
});