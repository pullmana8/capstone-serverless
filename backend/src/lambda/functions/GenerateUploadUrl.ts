import { Injectable } from 'injection-js'
import {
  AWSLambdaApp,
  Handler,
  Message,
  HttpApp,
  RequestLogger,
  Compressor,
  CORS,
  Route,
} from 'serverx-ts'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { createServer } from 'http'

@Injectable()
class GenerateUploadUrl extends Handler {
  handle(message$: Observable<Message>): Observable<Message> {
    return message$.pipe(
      tap(({ response }) => {
        response.body = 'Hello, world!'
      }),
    )
  }
}

const routes: Route[] = [
  {
    path: '',
    methods: ['GET'],
    middlewares: [RequestLogger, Compressor, CORS],
    children: [
      {
        path: '/generateUploadUrl',
        handler: GenerateUploadUrl,
      },
    ],
  },
]

const httpApp = new HttpApp(routes)
createServer(httpApp.listen()).listen(4200)

const lambdaApp = new AWSLambdaApp(routes)
export function handler(event, context) {
  return lambdaApp.handle(event, context)
}
