import React from "react";
import styled from "styled-components";
import { Switch, Route, NavLink } from "react-router-dom";
import { useAppDataContext } from "../hooks";
import Message from "./Message";
import Messages from "./Messages";
import Post from "./Post";
import Posts from "./Posts";
import User from "./User";
import Users from "./Users";
import Channel from "./Channel";
import Channels from "./Channels";

const Title = styled.h1`
  font-family: sans-serif;
  color: #444;
`;

function isServerSide() {
  return (
    typeof window === "undefined" ||
    !window.document ||
    window.document.createElement
  );
}

export default function App() {
  const [webSocket, setWebSocket] = React.useState<WebSocket | null>(null);

  const appData = useAppDataContext();

  React.useEffect(() => {
    if (!webSocket) {
      setWebSocket(new WebSocket("ws://localhost:3000"));
    }

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [webSocket]);

  const handleSocketClose = React.useCallback((e: CloseEvent) => {
    console.log(e);
  }, []);

  const handleSocketError = React.useCallback((e: Event) => {
    console.log(e);
  }, []);

  const handleSocketMessage = React.useCallback((e: MessageEvent<any>) => {
    console.log(e);
  }, []);

  const handleSocketOpen = React.useCallback((e: Event) => {
    console.log(e);
  }, []);

  React.useEffect(() => {
    if (webSocket === null) return;

    webSocket.addEventListener("close", handleSocketClose);
    webSocket.addEventListener("error", handleSocketError);
    webSocket.addEventListener("message", handleSocketMessage);
    webSocket.addEventListener("open", handleSocketOpen);

    return () => {
      webSocket.removeEventListener("close", handleSocketClose);
      webSocket.removeEventListener("error", handleSocketError);
      webSocket.removeEventListener("message", handleSocketMessage);
      webSocket.removeEventListener("open", handleSocketOpen);
    };
  }, [webSocket]);

  return (
    <div>
      <header>
        <Title>App</Title>
        <button
          onClick={() => {
            if (webSocket) {
              webSocket.send(JSON.stringify({ fart: "please" }));
            }
          }}
        >
          Click
        </button>
        <NavLink to="/" exact>
          Home
        </NavLink>
        <NavLink to="/about" exact>
          About
        </NavLink>
        <NavLink to="/messages" exact>
          Messages
        </NavLink>
        <NavLink to="/posts" exact>
          Posts
        </NavLink>
        <NavLink to="/channels" exact>
          Channels
        </NavLink>
        <NavLink to="/users" exact>
          Users
        </NavLink>
      </header>
      <section>
        <Switch>
          <Route exact path="/">
            Home
          </Route>

          <Route path="/messages/:userId" component={Message} />
          <Route path="/messages" component={Messages} />
          <Route path="/channels" component={Channels} />
          <Route path="/channels/:channelId" component={Channel} />
          <Route path="/channels/:channelId/:postId" component={Post} />
          <Route path="/users/:userId" component={User} />
          <Route path="/users" component={Users} />
        </Switch>
      </section>
      <footer>
        <pre>
          <code>{JSON.stringify(appData, null, 2)}</code>
        </pre>
      </footer>
    </div>
  );
}
