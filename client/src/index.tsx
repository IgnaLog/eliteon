import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./utils/i18n";
import GlobalStyles from "./styles/globalStyles";
import ReactModal from "react-modal";

if (import.meta.env.PROD) {
  disableReactDevTools();
}

ReactModal.setAppElement("#root");
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
