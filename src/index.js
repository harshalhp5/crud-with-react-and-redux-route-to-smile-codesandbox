import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import Appp from "./Appp";
import configureStore from "./store/configureStore";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const store = configureStore();
root.render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <Appp />
    </Provider>
  </StrictMode>
);
