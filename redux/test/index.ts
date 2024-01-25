/**
 * 测试 redux 示例
 *
 * @author tangjiahui
 * @date 2024/1/16
 */
import { createStore, applyMiddleware } from "../src";
import { thunk } from "../src/redux-thunk";

// 定义 store（注册中间件）
const store = createStore(reducer, applyMiddleware(thunk));

// 定义reducer
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        value: state.value + 1,
      };
  }
  return {
    value: 0,
  };
}

// 订阅变化
store.subscribe(() => console.log(store.getState()));

// 异步Add
const asyncAdd = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: "add",
    });
  }, 1000);
};

let unA, unB;
// 初次运行会接触B的监听
unA = store.subscribe(() => {
  console.log("A");
  unB();
});

unB = store.subscribe(() => {
  console.log("B");
});

store.dispatch({
  type: "add",
});

store.dispatch(asyncAdd);