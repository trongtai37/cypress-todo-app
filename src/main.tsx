import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from './store.tsx';

import 'todomvc-app-css/index.css';
import App from './components/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
