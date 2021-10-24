import { DocumentClient } from '../../__mocks__/aws-sdk/clients/dynamodb';
import { handler } from '../../../lambda-fns/post/index';

const db = new DocumentClient();

describe('Test post lambda', () => {
    beforeAll(() => {
        process.env = {
            TABLE_NAME: 'sam-cdk-vscode-debug-table'
        }
    });

    test('Post lambda success invocation', async () => {
        const event = {
            body: "{\"id\": \"1\", \"name\": \"marcio\"}"
        }
        const result = await handler(event, {});
        expect(result).toMatchObject({ statusCode: 200, body: "ok" });
        expect(db.put).toHaveBeenCalledWith({ 
            TableName: "sam-cdk-vscode-debug-table", 
            Item:{
                id: "1", 
                data: "marcio"
            }
        })        
    });
});

