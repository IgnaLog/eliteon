import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./config/i18n";

if (import.meta.env.PROD) {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback="...loading translations">
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
