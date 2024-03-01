import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ProductContextProvider } from "./app/contexts/ProductContext";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </PersistGate>
  </Provider>
);
