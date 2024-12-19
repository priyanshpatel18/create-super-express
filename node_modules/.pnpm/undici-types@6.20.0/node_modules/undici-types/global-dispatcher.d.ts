import Dispatcher from ".pnpm/undici-types@6.20.0/node_modules/undici-types/dispatcher";

export {
  getGlobalDispatcher,
  setGlobalDispatcher
}

declare function setGlobalDispatcher<DispatcherImplementation extends Dispatcher>(dispatcher: DispatcherImplementation): void;
declare function getGlobalDispatcher(): Dispatcher;
