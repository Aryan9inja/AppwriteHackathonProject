import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import "@/index.css";
import App from "@/App";
import PersistingAuth from "@/components/auth/PersistingAuth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistingAuth>
          <App />
        </PersistingAuth>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
