import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

export const store = createStore(reducer);
export const getStore = () => store;
export const StoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => <Provider store={store}>{children}</Provider>;

export type StoreState = ReturnType<typeof reducer>;
export type StoreDispatch = typeof store.dispatch;
