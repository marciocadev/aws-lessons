if (process.env.AWS_SAM_LOCAL) {
    var AWS = require('aws-sdk');
}
else {
    const AWSXray = require('aws-xray-sdk');
    var AWS = AWSXray.captureAWS(require('aws-sdk'));
}
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
const db = new DocumentClient({region: 'us-east-1'})

export const handler = async(event:any, context: any) => {
    let {id} = event.pathParameters;
    var res = 'ok';

    try {
        let tableName:string = process.env.TABLE_NAME || '';
        const params = {
            TableName: tableName,
            Key: { id: id }
        }
        const response = await db.get(params).promise();
        if (response.Item) {
            res = response.Item.data;
        }
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify(err)
        }
    }

    return {
        statusCode: 200,
        body: res
    }
}