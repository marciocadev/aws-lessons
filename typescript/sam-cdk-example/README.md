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
* `cdk init app -l typescript`
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

## Editei o package.json para executar comandos personalisados
```
  "scripts": {
    "debug": "sam-beta-cdk local invoke --profile marcio-dev -d 9999",
    "local": "sam-beta-cdk local invoke --profile marcio-dev",
    "local-lambda": "sam-beta-cdk local invoke --profile marcio-dev SamCdkExampleStack/SamCdkExampleLambda",
    "build": "tsc",
    "watch": "tsc -w",
    "test": "jest",
    "cdk": "cdk"
  },
```

## Rodando local
* `npm run local-lambda` roda localmente o lambda
* `npm run local -- SamCdkExampleStack/SamCdkExampleLambda` roda localmente passando a stack/lambda como argumento
 
## Debugando localmente
* `npm run debug -- SamCdkExampleStack/SamCdkExampleLambda` debugando localmente passando a stack/lambda como argumento

Após a execuçaão do comando deve aparecer no terminal uma linha similar a esta
* `Debugger listening on ws://0.0.0.0:9999/d19f8203-4cce-4daf-a902-5a7aa4adb24c` 

Quando aparecer, coloque um breakpoint no lambda que se deseja debugar e execute o debug no vscode

## Dicas
Para receber os parâmetros event e context em um objeto execute os passos abaixo:
* `npm i -D @types/aws-lambda`
No lambda que recebe um evento do APIGateway 
```
export async function handler(event: AWSLambda.APIGatewayEvent, context: AWSLambda.Context) {
  ...
}
``` 