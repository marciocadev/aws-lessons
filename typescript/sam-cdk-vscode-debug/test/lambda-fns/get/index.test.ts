import { DocumentClient, awsSdkPromiseResponse } from '../../__mocks__/aws-sdk/clients/dynamodb';
import { handler } from '../../../lambda-fns/get/index';

const db = new DocumentClient();

describe('Test post lambda', () => {
    beforeAll(() => {
        process.env = {
            TABLE_NAME: 'sam-cdk-vscode-debug-table'
        }
    });

    test('Get lambda success invocation', async () => {
        awsSdkPromiseResponse.mockReturnValueOnce(
            Promise.resolve({ Item: {data: "marcio"} }));
        const event = {
            pathParameters: { id: '1' }
        }
        const result = await handler(event, {});
        expect(result).toMatchObject({ statusCode: 200, body: "marcio" });
        expect(db.get).toHaveBeenCalledWith({ 
            TableName: "sam-cdk-vscode-debug-table", 
            Key:{ id: "1" }
        })        
    });
});

