//import axios from 'axios';
if (process.env.AWS_SAM_LOCAL) {
    var AWS = require('aws-sdk');
}
else {
    const AWSXray = require('aws-xray-sdk');
    var AWS = AWSXray.captureAWS(require('aws-sdk'));
}
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
const db = new DocumentClient({region: 'us-east-1'})

export const handler = async(event: any, context: any) => {
    let { id, name } = JSON.parse(event.body);

    // var result = await axios.post(`https://httpbin.org/anything/${id}`, body);

    try {
        let tableName:string = process.env.TABLE_NAME || '';
        const params = {
            TableName: tableName,
            Item: {
                id: id,
                data: name
            }
        }
        await db.put(params).promise();
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify(err)
        }
    }

    return {
        statusCode: 200,
        body: "ok"
    }
}

export const saveItem = async (id:string, data:any) => {
    let tableName:string = process.env.TABLE_NAME || '';
    const params = {
        TableName: tableName,
        Item: {
            id: id,
            data: data
        }
    }
    console.log(params);
    db.put(params).promise();
}