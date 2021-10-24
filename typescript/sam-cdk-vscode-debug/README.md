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
* `mkdir sam-cdk-vscode-debug`
* `cd sam-cdk-vscode-debug`
* `cdk init -l typescript`
* `npm i @aws-cdk/aws-lambda @aws-cdk/aws-apigateway @aws-cdk/aws-dynamodb`
* `npm i --save-dev @types/aws-lambda` tipos para se pegar os objetos recebidos no handler do lambda
* `mkdir lambda-fns`
* `cd lambda-fns`
* `touch index.ts` Crie o lambda e escreva o código
* `npm init --y` crie o package.json na pasta lambda-fns
* `cd ..` 
* `npm run build` para gerar os arquivos do projeto em javascript
* `sam-beta-cdk build` para gerar o necessário para o deploy
* `cdk deploy -a .aws-sam/build --profile marcio-dev`
* `mkdir layer && mkdir layer/nodejs`
* `cd layer/nodejs`
* `npm init --y`
* `npm i axios`