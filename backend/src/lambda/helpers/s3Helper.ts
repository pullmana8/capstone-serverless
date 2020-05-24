import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from './logger'

const logger = createLogger('generate-upload')

let AWS
if (process.env.X_AMX_TRACE_ID) {
  AWS = require('aws-xray-sdk').captureAWS(require('aws-sdk'))
} else {
  logger.info('Serverless Offline detected; skipping AWS X-RAY Setup')
  AWS = require('aws-sdk')
}

export class S3Helper {
  constructor(
    private readonly XAWS = AWSXRay.captureAWS(AWS),
    private readonly s3: AWS.S3 = new XAWS.S3({
      signatureVersion: 'v4',
      region: process.env.region,
      params: { Bucket: process.env.ATTACHMENTS_BUCKET },
    }),
    private readonly signedUrlExpireSeconds = 60 * 5,
  ) {}
  async getTodoAttachmentUrl(todoId: string): Promise<string> {
    try {
      await this.s3
        .headObject({
          Bucket: process.env.ATTACHMENTS_BUCKET,
          Key: `${todoId}.png`,
        })
        .promise()

      return this.s3.getSignedUrl('getObject', {
        Bucket: process.env.ATTACHMENTS_BUCKET,
        Key: `${todoId}.png`,
        Expires: this.signedUrlExpireSeconds,
      })
    } catch (err) {
      logger.error(err)
    }
    return null!
  }

  getPresignedUrl(todoId: string): string {
    return this.s3.getSignedUrl('putObject', {
      Bucket: process.env.ATTACHMENTS_BUCKET,
      Key: `${todoId}.png`,
      Expires: this.signedUrlExpireSeconds,
    }) as string
  }
}
