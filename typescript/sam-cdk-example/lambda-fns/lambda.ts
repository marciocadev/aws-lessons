const axios = require('axios');
const AWSXRay = require('aws-xray-sdk');
const AWS = require('aws-sdk');
//const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

export async function handler(event: AWSLambda.APIGatewayEvent, context: AWSLambda.Context) {
    
    // AWS.captureFunc('annotations', function(subsegment: any){
    //     subsegment.addAnnotation('Name', "teste");
    //     subsegment.addAnnotation('UserID', event.userid);
    //   });

    const res = await axios.get('https://httpbin.org/get', {
        params: {
            answer: 42
        }
    })

    const params = {
        TableName: 'dbtest',
        Item: {
            id: 'teste',
            get: res.data.args
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
