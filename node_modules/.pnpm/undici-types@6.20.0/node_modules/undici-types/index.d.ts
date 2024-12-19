import Dispatcher from'.pnpm/undici-types@6.20.0/node_modules/undici-types/dispatcher'
import { setGlobalDispatcher, getGlobalDispatcher } from '.pnpm/undici-types@6.20.0/node_modules/undici-types/global-dispatcher'
import { setGlobalOrigin, getGlobalOrigin } from '.pnpm/undici-types@6.20.0/node_modules/undici-types/global-origin'
import Pool from'.pnpm/undici-types@6.20.0/node_modules/undici-types/pool'
import { RedirectHandler, DecoratorHandler } from '.pnpm/undici-types@6.20.0/node_modules/undici-types/handlers'

import BalancedPool from '.pnpm/undici-types@6.20.0/node_modules/undici-types/balanced-pool'
import Client from'.pnpm/undici-types@6.20.0/node_modules/undici-types/client'
import buildConnector from'.pnpm/undici-types@6.20.0/node_modules/undici-types/connector'
import errors from'.pnpm/undici-types@6.20.0/node_modules/undici-types/errors'
import Agent from'.pnpm/undici-types@6.20.0/node_modules/undici-types/agent'
import MockClient from'.pnpm/undici-types@6.20.0/node_modules/undici-types/mock-client'
import MockPool from'.pnpm/undici-types@6.20.0/node_modules/undici-types/mock-pool'
import MockAgent from'.pnpm/undici-types@6.20.0/node_modules/undici-types/mock-agent'
import mockErrors from'.pnpm/undici-types@6.20.0/node_modules/undici-types/mock-errors'
import ProxyAgent from'.pnpm/undici-types@6.20.0/node_modules/undici-types/proxy-agent'
import EnvHttpProxyAgent from '.pnpm/undici-types@6.20.0/node_modules/undici-types/env-http-proxy-agent'
import RetryHandler from'.pnpm/undici-types@6.20.0/node_modules/undici-types/retry-handler'
import RetryAgent from'.pnpm/undici-types@6.20.0/node_modules/undici-types/retry-agent'
import { request, pipeline, stream, connect, upgrade } from '.pnpm/undici-types@6.20.0/node_modules/undici-types/api'
import interceptors from '.pnpm/undici-types@6.20.0/node_modules/undici-types/interceptors'

export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/util'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/cookies'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/eventsource'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/fetch'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/file'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/filereader'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/formdata'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/diagnostics-channel'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/websocket'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/content-type'
export * from '.pnpm/undici-types@6.20.0/node_modules/undici-types/cache'
export { Interceptable } from '.pnpm/undici-types@6.20.0/node_modules/undici-types/mock-interceptor'

export { Dispatcher, BalancedPool, Pool, Client, buildConnector, errors, Agent, request, stream, pipeline, connect, upgrade, setGlobalDispatcher, getGlobalDispatcher, setGlobalOrigin, getGlobalOrigin, interceptors, MockClient, MockPool, MockAgent, mockErrors, ProxyAgent, EnvHttpProxyAgent, RedirectHandler, DecoratorHandler, RetryHandler, RetryAgent }
export default Undici

declare namespace Undici {
  var Dispatcher: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/dispatcher').default
  var Pool: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/pool').default;
  var RedirectHandler: typeof import ('.pnpm/undici-types@6.20.0/node_modules/undici-types/handlers').RedirectHandler
  var DecoratorHandler: typeof import ('.pnpm/undici-types@6.20.0/node_modules/undici-types/handlers').DecoratorHandler
  var RetryHandler: typeof import ('.pnpm/undici-types@6.20.0/node_modules/undici-types/retry-handler').default
  var createRedirectInterceptor: typeof import ('.pnpm/undici-types@6.20.0/node_modules/undici-types/interceptors').default.createRedirectInterceptor
  var BalancedPool: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/balanced-pool').default;
  var Client: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/client').default;
  var buildConnector: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/connector').default;
  var errors: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/errors').default;
  var Agent: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/agent').default;
  var setGlobalDispatcher: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/global-dispatcher').setGlobalDispatcher;
  var getGlobalDispatcher: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/global-dispatcher').getGlobalDispatcher;
  var request: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/api').request;
  var stream: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/api').stream;
  var pipeline: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/api').pipeline;
  var connect: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/api').connect;
  var upgrade: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/api').upgrade;
  var MockClient: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/mock-client').default;
  var MockPool: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/mock-pool').default;
  var MockAgent: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/mock-agent').default;
  var mockErrors: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/mock-errors').default;
  var fetch: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/fetch').fetch;
  var Headers: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/fetch').Headers;
  var Response: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/fetch').Response;
  var Request: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/fetch').Request;
  var FormData: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/formdata').FormData;
  var File: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/file').File;
  var FileReader: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/filereader').FileReader;
  var caches: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/cache').caches;
  var interceptors: typeof import('.pnpm/undici-types@6.20.0/node_modules/undici-types/interceptors').default;
}
