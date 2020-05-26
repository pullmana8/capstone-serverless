import { createLogger } from '../helpers/logger'
import { runWarm } from '../helpers/utils'
/* import { transform } from 'snowplow-analytics-sdk' */

const logger = createLogger('process-stream')

logger.info('Loading function')

const processStream: Function = async (event, context) => {
  for (const record of event.Records) {
    logger.info(record.eventID)
    logger.info(record.eventName)
    logger.info('DynamoDB Record: %j', record.dynamodb)
  }
  return `Successfully processed ${event.Records.length} records.`
}

export default runWarm(processStream)
