import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import Loading from "./components/Loading";
import {Provider} from "mobx-react";
import store from "./store";
import css from "./index.module.css";
import './main.css'
import './tailwind.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={
      <div className={css.loading}>
        <Loading text={'🤯🤯好像出问题了🤯🤯'}/>
      </div>
    }>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
