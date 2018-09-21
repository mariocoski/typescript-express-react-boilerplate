import { Request, Response } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import { Provider } from "react-redux";
import { AnyAction } from "redux";
import { matchPath, StaticRouter } from "react-router";
import serialize from "serialize-javascript";

import { setApiUrls } from "../../universal/actions";
import App from "../../universal/app";
import { routes } from "../../universal/routes";
import createStore from "../../universal/store";
import { buildApi } from "../builders";

const stats = require("../stats/reactLoadable.json");

export default function mainController(req: Request, res: Response) {
  const promises: Promise<any>[] = [];
  const store = createStore();

  store.dispatch(setApiUrls(buildApi(req.protocol, req.get("host") as string)));

  routes.some(route => {
    const match = matchPath(req.path, route);
    if (match && route.fetchData) {
      const action = route.fetchData() as any;
      promises.push(store.dispatch(action));
    }
    return !!match;
  });

  Promise.all(promises).then(() => {
    let modules: string[] = [];
    let context = {};
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    );
    const bundles = getBundles(stats, modules);
    const styles = bundles
      .filter(bundle => bundle.file.endsWith(".css"))
      .map(style => `<link href="/static/${style.file}" rel="stylesheet"/>`)
      .join("\n");
    const scripts = bundles
      .filter(bundle => bundle.file.endsWith(".js"))
      .map(script => `<script src="/static/js/${script.file}"></script>`)
      .join("\n");
    const state = store.getState();
    const initialState = serialize(state, { isJSON: true });

    res.send(`<!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico">
                <title>My App</title>
                ${styles}
            </head>
            <body>
                <div id="app">${html}</div>
                <script>
                    window.__INITIAL_STATE__ = ${initialState}
                </script>
                <script src="/static/js/main.js"></script>
                ${scripts}
                <script>window.main();</script>
            </body>
        </html>`);
  });
}
