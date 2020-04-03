import * as core from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as apigateway from '@aws-cdk/aws-apigateway';

const path = require('path')

type PickleToVizServiceProps = {
  api: apigateway.RestApi;
};

export class PickleToVizService extends core.Construct {
  public readonly api: apigateway.RestApi;

  constructor(scope: core.Construct, id: string, props: PickleToVizServiceProps) {
    super(scope, id);
    this.api = props.api;

    const handler = new lambda.Function(this, 'PickleToVizHandler', {
      runtime: lambda.Runtime.PYTHON_3_6, // So we can use async in widget.js
      code: lambda.Code.asset(path.join(__dirname, '../handlers/pickleToViz')),
      handler: 'handler.main',
      timeout: core.Duration.minutes(1),
      initialPolicy: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3:*'],
          resources: ['*'],
        }),
      ],
    });

    const getVizIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    });
    this.api.root.addResource('pickle');
    this.api.root.getResource('pickle')?.addMethod('GET', getVizIntegration);
  }
}
