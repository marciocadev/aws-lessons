
# Custom Domain Example

Neste exemplo vou criar um roteamento de um gateway endpoint a um domínio criado para o endpoint

## Passos iniciais
### Crie o projeto no CDK
```
cdk init app --language python
```
### Caso o ambiente não tenha sido criado, crie manualmente e o ative
```
python3 -m venv .venv
source ./venv/bin/activate
```
### Coloque as dependências no arquivo requirements.txt e instale
```
pip install -r requirements.txt
```
### Para este projeto é necessário variáveis de ambiente conforme abaixo
Crie um arquivo chamado environment.sh e de permissão de execução para ele
```
echo '#!/bin/sh' >> environment.sh && chmod 755 environment.sh
```
Coloque as variaveis de ambiente nele
* CDK_DEFAULT_ACCOUNT       O número que aparece na sua conta AWS quando se loga
* CDK_DEFAULT_REGION        A região onde deve ser criada a stack (ex: us-east-1)
* ZONE_ID                   O ID da hosted zone existente (Deve ter sido criada no Route53)
* ZONE_NAME                 O domínio criado no Route53
* ZONE_CERT                 O ARN do certificado que deve ser usado 

Exemplo
```
export CDK_DEFAULT_REGION=us-east-1
```
Após criar o arquivo execute com o comando
```
source ./environment.sh
```
### Neste ponto você pode sintetizar o template Cloudformation com o código abaixo
```
cdk synth
```
### Outros comandos úteis do CDK
* `cdk ls`      Lista todas as stacks do app
* `cdk synth`   Lista todas as stacks do app
* `cdk deploy`  Faz o deploy da stack
* `cdk diff`    Compara a stack local com a corrente na AWS
* `cdk docs`    abre o documento do CDK

# Endpoints
* https://gtw.marciocadev.com/api/get
* https://site.marciocadev.com/api/get
* https://site.marciocadev.com/

## Rodando localmente
* sam-beta-cdk build --parallel
* sam-beta-cdk local invoke CustomDomainExampleStack/gtw-lmb
* sam-beta-cdk local invoke CustomDomainExampleStack/gtw2-lmb
* sam-beta-cdk local invoke --debug-port 5678 CustomDomainExampleStack/gtw-lmb