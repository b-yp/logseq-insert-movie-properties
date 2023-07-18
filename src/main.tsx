import "@logseq/libs";

import React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App";
import { logseq as PL } from "../package.json";

import { settings } from "./settings";

const pluginId = PL.id;

function main() {
  console.info(`#${pluginId}: MAIN`);

  // 注册设置项
  logseq.useSettingsSchema(settings);

  const root = ReactDOM.createRoot(document.getElementById("app")!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

logseq.ready(main).catch(console.error);
