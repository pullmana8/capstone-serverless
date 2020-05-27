import 'reflect-metadata'

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Injectable } from 'injection-js'
import {
  Attr,
  AWSLambdaApp,
  BinaryTyper,
  Compressor,
  COMPRESSOR_OPTS,
  CORS,
  Handler,
  Message,
  OpenAPI,
  REQUEST_LOGGER_OPTS,
  RequestLogger,
  Route,
} from 'serverx-ts/dist'

@Injectable()
class Explode extends Handler {
  handle(message$: Observable<Message>): Observable<Message> {
    return message$.pipe(
      tap(({ response }) => {
        response!.x.y = 'z'
      }),
    )
  }
}

@Injectable()
class Hello extends Handler {
  handle(message$: Observable<Message>): Observable<Message> {
    return message$.pipe(
      tap(({ response }) => {
        response!.body = 'Hello, http!'
      }),
    )
  }
}

@Injectable()
class Goodbye extends Handler {
  handle(message$: Observable<Message>): Observable<Message> {
    return message$.pipe(
      tap(({ response }) => {
        response!.body = 'Goodbye, http!'
      }),
    )
  }
}

class FooBodyInner {
  @Attr() a: number
  @Attr() b: string
  @Attr() c: boolean
}

class FooBody {
  @Attr() p: string
  @Attr() q: boolean
  @Attr() r: number
  @Attr({ _class: FooBodyInner }) t: FooBodyInner[]
}

class FooBarParams {
  @Attr() id: string
}

const routes: Route[] = [
  {
    path: '',
    methods: ['GET'],
    middlewares: [BinaryTyper, RequestLogger, Compressor, CORS],
    services: [
      { provide: REQUEST_LOGGER_OPTS, useValue: { colorize: true } },
      { provide: COMPRESSOR_OPTS, useValue: { threshold: 0 } },
    ],
    summary: 'A family of test endpoints',
    children: [
      {
        description: 'Develop OpenAPI representation of this server',
        path: 'openapi.yml',
        handler: OpenAPI,
      },

      {
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        path: '/foo',
        children: [
          {
            path: '/bar/{id}',
            request: {
              body: {
                'application/x-www-form-urlencoded': FooBody,
                'application/json': FooBody,
              },
              path: FooBarParams,
            },
          },

          {
            path: '/baz',
          },
        ],
      },

      {
        path: '/hello',
        handler: Hello,
      },

      {
        path: '/goodbye',
        handler: Goodbye,
      },

      {
        path: '/isalive',
      },

      {
        description: 'This one will blow your mind!',
        methods: ['GET'],
        path: '/explode',
        handler: Explode,
      },

      {
        methods: ['GET'],
        path: '/not-here',
        redirectTo: 'http://over-there.com',
      },
    ],
  },
]

const awsApp = new AWSLambdaApp(routes, {
  title: 'serverx-serverless',
  version: '1.0',
})

export function aws(event, context) {
  return awsApp.handle(event, context)
}
