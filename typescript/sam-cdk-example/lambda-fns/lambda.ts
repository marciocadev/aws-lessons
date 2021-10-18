const axios = require('axios');
if (!process.env.AWS_SAM_LOCAL) {
    const AWSXRay = require('aws-xray-sdk');
    var AWS = AWSXRay.captureAWS(require('aws-sdk'));    
}
else {
    var AWS = require('aws-sdk');
}
const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

export async function handler(event: AWSLambda.APIGatewayEvent,
                            context: AWSLambda.Context) {
    
    if (!process.env.AWS_SAM_LOCAL) {
        AWS.captureFunc('annotations', function(subsegment: any){
            subsegment.addAnnotation('Name', "teste");
            subsegment.addAnnotation('UserID', event.body);
        });
    }

    let res = await axios.get('https://httpbin.org/get', {
        params: {
            answer: 42
        }
    })

    const params = {
        TableName: 'dbtest',
        Item: {
            id: 'teste2',
            get: res.data.args,
            event: event
        }
    }

    try {
        await db.put(params).promise();
        return {
            statusCode: 200,
            body: "ok"
        }
    } catch(err) {
        console.log(err);
    }

    return 'erro';
}
