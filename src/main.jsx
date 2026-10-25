import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./styles/global.css";
import App from "./App.jsx";
import "./styles/cinematic.css";
import { store } from "./app/store";
import { LibraryProvider } from "./contexts/LibraryContext";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <LibraryProvider>
            <App />
          </LibraryProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
