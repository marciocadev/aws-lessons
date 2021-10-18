# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Todos os passos da criação do projeto

* `cdk init app -l typescript`
* `npm i @aws-cdk/aws-lambda @aws-cdk/aws-apigateway`
* `mkdir lambda-fns`
* `cd lambda-fns`
* crie o lambda na pasta lambda-fns
* execute o comando npm init na pasta do lambda para criar o package.json
* `npm run build` para gerar os arquivos javascript
* `sam-beta-cdk build`
* `cdk deploy -a .aws-sam/build --profile marcio-dev`
* `mkdir layers\\nodejs` cria o folder para a layer
* `cd layers\\nodejs`
* `npm init`
* `npm install axios aws-xray-sdk` instala o xray sdk