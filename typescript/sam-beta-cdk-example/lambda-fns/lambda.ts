const axios = require('axios');
const AWSXRay = require('aws-xray-sdk');
var AWS = require('aws-sdk');
//const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async(event: any, context: any) => {

    // AWS.captureFunc('annotations', function(subsegment: any){
    //     subsegment.addAnnotation('Name', "teste");
    //     subsegment.addAnnotation('UserID', event.userid);
    //   });

    const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } });

    console.log(res.data.args);

    const params = {
        TableName: 'dbtest',
        Item: {
            id: 'teste'
        }
    }

    try {
        const res = await db.put(params).promise();
    } catch(err) {
        console.log(err);
    }

    return {
        "statusCode": 200,
        "body": "ok"
    } 
}
