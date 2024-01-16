/**
 * redux-thunk
 * 
 * @author tangjiahui
 * @date 2024/1/16
 * @description 实现react-thunk包
 */
export function thunk({ dispatch, getState }) {
  return (next) => {
    return (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }
      return next(action);
    };
  };
}
