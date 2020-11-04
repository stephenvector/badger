import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { StaticRouter } from "react-router-dom";
import ws from "ws";
import { initializeDB } from "./db";
import App from "./components/App";
import AppDataProvider from "./providers/AppDataProvider";
import apiRouter, { getChannels, getPosts, getUsers } from "./api";
import { AppData } from "./types";

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "build/static")));

app.use("/api/v1", apiRouter);

const HTML_TEMPLATE = `<!doctype html>
<html>
  <head>
    <title>Badger</title>
    {{CSS}}
  </head>
  <body>
    {{ROOT}}
    <script>window.INITIAL_STATE={{INITIAL_STATE}}</script>
    <script src="/main.js"></script>
  </body>
</html>`;

app.use(async (req, res) => {
  const context = {};
  const users = await getUsers();
  const channels = await getChannels();
  const posts = await getPosts();
  const sheet = new ServerStyleSheet();
  const appData: AppData = {
    users,
    posts,
    comments: {},
    messages: {},
    channels,
  };
  const renderedApp = ReactDOMServer.renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={req.url} context={context}>
        <AppDataProvider initialState={appData}>
          <App />
        </AppDataProvider>
      </StaticRouter>
    </StyleSheetManager>
  );
  const styleTags = sheet.getStyleTags();
  sheet.seal();

  res.send(
    HTML_TEMPLATE.replace("{{ROOT}}", `<div id="root">${renderedApp}</div>`)
      .replace("{{CSS}}", styleTags)
      .replace("{{INITIAL_STATE}}", JSON.stringify(appData, null, 0))
  );
});

initializeDB();

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Listening on port 3000");
});

const wsServer = new ws.Server({ noServer: true });

wsServer.on("connection", (socket) => {
  console.log(wsServer.clients.size);

  wsServer.emit("lol");

  socket.on("message", (message) => {
    console.log(message);
    wsServer.clients.forEach((client) => {
      client.send("server");
    });
  });

  socket.on("close", (close) => {
    console.log(close);
  });

  socket.on("error", (err) => {
    console.error(err);
  });
});

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});
