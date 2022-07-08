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
  
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
