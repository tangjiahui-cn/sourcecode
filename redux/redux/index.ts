/**
 * redux
 *
 * @author tangjiahui
 * @date 2024/1/16
 * @description 实现redux的原理
 */

// a(b(c(1))) -> compose(a,b,c)(1)
function compose(...funcs) {
  if (!funcs.length) return (a) => a;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce((a, b) => {
    return (...args) => {
      return a(b(...args));
    };
  });
}

// 生成中间件
export function applyMiddleware(...middlewares) {
  return (createStore) => {
    return (reducer) => {
      const store = createStore(reducer);

      const storeApi = {
        getState: store.getState,
        dispatch: (action, ...args) => store.dispatch(action, ...args),
      };

      const chain = middlewares.map((middleware) => middleware(storeApi));
      const dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
  };
}

// 创建一个store
export function createStore(reducer: any, middlewareEnhance?: any) {
  let state: any = {};
  const callbacks: any[] = [];

  if (middlewareEnhance) {
    return middlewareEnhance(createStore)(reducer);
  }

  function getState() {
    return state;
  }

  function dispatch(action: any) {
    state = reducer(state, action);
    callbacks.forEach((fn) => fn());
  }

  function subscribe(callback) {
    callbacks.push(callback);
  }

  dispatch({ type: Symbol() });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
