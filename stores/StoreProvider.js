// stores/StoreProvider.js
import React, { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react';
import AppStore, { createStore } from './AppStore';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(createStore);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
