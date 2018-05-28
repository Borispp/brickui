import createStore from './createStore';

let appStore;

const setStore = store => {
  appStore = store;
};

const dispatch = action => {
  if (appStore) {
    return appStore.dispatch(action);
  }

  return null;
};

export { createStore, setStore, dispatch };
