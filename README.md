# This repository has a bug with python dependencies

- run `yarn`
- run `yarn build`
- run `cdk bootstrap`
- run `sam build` -> notice correct python pandas dependency in `.aws-sam/build/pickletovizservicePickleToVizHandler68C6D6E2/pandas`
- run `sam local invoke` -> notice error `Unable to import module 'handler': No module named 'pandas'`

# Getting started with AWS CDK

This readme is based one a few resources that you should read to fully understand the framework

- https://sanderknape.com/2019/05/building-serverless-applications-aws-cdk/
-

## Setup

- https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html
- AWS Profile Changer: https://github.com/antonbabenko/awsp
- for local lambda development use AWS SAM CLI: https://github.com/awslabs/aws-sam-cli

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Start the thing

- run `yarn run init` to bootrap the cdk
- run `yarn dev` to start local dev API

## Useful commands

- `yarn run build` compile typescript to js
- `yarn run watch` watch for changes and compile
- `yarn run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Invoking lambda functions locally with SAM

- `cdk synth --no-staging > template.yaml` to create a template.yml file which sam will use to invoke the function
- `sam local invoke mywidgetserviceWidgetHandlerFAB6825C --event events/get.json --env-vars environment.json` fire a local
- `mywidgetserviceWidgetHandlerFAB6825C` is the lambda function reference, you can find it in `template.yml`
- you can define GET/POST/ANY events as json and send them along your local function invocation
- if your lambda accesses real ressources (e.g. an S3 bucket), local invocation wont be able to access the real bucket because the local environment variables are just the references in `template.yml`, not the real urls of AWS resources.
- local invocations can therefore only access real existing AWS resources. You need to manually define environment variables to sam like that:

```
{
  "mywidgetserviceWidgetHandlerFAB6825C": {
    "BUCKET": "real-bucket-url"
  }
}
```

- start local development API: `sam local start-api --env-vars environment.json`

## Docs

### AWS cdk

- https://docs.aws.amazon.com/cdk/latest/guide/core_concepts.html

### List of all supported infrastructure components

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html

### sam CLI reference

- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html
