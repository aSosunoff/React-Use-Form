import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import EmptyLayout from "./components/layout/emptyLayout";
import "materialize-css/dist/js/materialize.min";
import "./assets/index.scss";

ReactDOM.render(
  <EmptyLayout>
    <App />
  </EmptyLayout>,
  document.getElementById("root")
);
