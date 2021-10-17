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
* `mkdir sam-cdk-example`
* `cd sam-cdk-example`
* `npm i @aws-cdk/aws-lambda @aws-cdk/aws-apigateway @aws-cdk/aws-dynamodb`
* `mkdir lambda-fns`
* `cd lambda-fns`
* Crie o lambda
* execute o comando `npm init` na pasta do lambda
* `npm run build` para gerar os arquivos do projeto em javascript
* `sam-beta-build` para gerar o necessário para o deploy
* `cdk deploy -a .aws-sam/build --profile marcio-dev`
* `mkdir layers && mkdir layers/nodejs`
* `cd layers/nodejs`
* `npm i axios aws-xray-sdk`

## Rodando local
* `npm run local-lambda` roda localmente o lambda
* `npm run local -- SamCdkExampleStack/SamCdkExampleLambda` roda localmente passando a stack/lambda como argumento
 
## Debugando localmente
* `npm run debug -- SamCdkExampleStack/SamCdkExampleLambda` debugando localmente passando a stack/lambda como argumento

Após a execuçaão do comando deve aparecer no terminal uma linha similar a está `Debugger listening on ws://0.0.0.0:9999/d19f8203-4cce-4daf-a902-5a7aa4adb24c` 

Quando aparecer, coloque um breakpoint no lambda que se deseja debugar e execute o debug no vscode