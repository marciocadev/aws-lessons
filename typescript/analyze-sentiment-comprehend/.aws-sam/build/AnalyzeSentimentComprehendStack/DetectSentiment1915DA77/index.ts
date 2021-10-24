// if (process.env.AWS_SAM_LOCAL) {
//     var AWS = require('aws-sdk');
// }
// else {
//     const AWSXray = require('aws-xray-sdk');
//     var AWS = AWSXray.captureAWS(require('aws-sdk'));
// }
import * as Comprehend from 'aws-sdk/clients/comprehend';
const comprehend = new Comprehend();

/**
 * 
 * @param event 
 * @param context 
 */
export const handler = async(event: any, context: any) => {

    const txt: string = "I'm love my city, Rio de Janeiro is amazing, mas as vezes eu gostaria de morar em outro local.";

    var paramDominantLanguageRequest: Comprehend.DetectDominantLanguageRequest = {
        Text: txt
    }
    var paramDetectEntitiesRequest: Comprehend.DetectEntitiesRequest = {
        Text: txt,
        LanguageCode: 'en'
    }
    var paramDetectSentimentRequest: Comprehend.DetectSentimentRequest = {
        Text: txt,
        LanguageCode: 'en'
    }

    try {
        const dominantLanguage: Comprehend.DetectDominantLanguageResponse =
            await comprehend.detectDominantLanguage(paramDominantLanguageRequest)
                .promise();

        const entityResult: Comprehend.Types.DetectEntitiesResponse = 
            await comprehend.detectEntities(paramDetectEntitiesRequest)
                .promise();
        
        const sentimentResult: Comprehend.Types.DetectSentimentResponse =
            await comprehend.detectSentiment(paramDetectSentimentRequest)
                .promise();

        const responseData = {
            dominantLanguage,
            entityResult,
            sentimentResult
        }
        return {
            statusCode: 200,
            body: responseData
        }
    } catch (err) {
        return {
            statusCode: 400,
            body: err
        }
    }
    
}
