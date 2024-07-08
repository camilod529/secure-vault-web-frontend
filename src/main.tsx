import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./routes/Router.tsx";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
