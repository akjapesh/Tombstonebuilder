/* eslint-disable react/no-direct-mutation-state */

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { QueryClientProvider, QueryClient} from "react-query";
const engine = new Styletron();
const queryClient=new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode></QueryClientProvider>,
  document.getElementById("root")
);
