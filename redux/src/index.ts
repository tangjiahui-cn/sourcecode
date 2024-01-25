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
  if (middlewareEnhance) {
    return middlewareEnhance(createStore)(reducer);
  }
  let state: any = {};
  let id = 0;
  let currentListeners: any = new Map();
  let nextListeners: any = currentListeners;

  function ensureNext() {
    if (currentListeners === nextListeners) {
      nextListeners = new Map();
      currentListeners.forEach((value, key) => {
        nextListeners.set(key, value);
      });
    }
  }

  function getState() {
    return state;
  }

  // 发布（将上一次的数据快照拿来执行）
  function dispatch(action: any) {
    state = reducer(state, action);
    (currentListeners = nextListeners).forEach((listener) => {
      listener();
    });
  }

  // 订阅 （如果正在dispatch，则将订阅添加到下一次数据快照）
  function subscribe(callback) {
    const listenId = id++;
    ensureNext();
    nextListeners.set(listenId, callback);
    return () => {
      ensureNext();
      nextListeners.delete(listenId);
      currentListeners = null;
    };
  }

  dispatch({ type: Symbol() });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
