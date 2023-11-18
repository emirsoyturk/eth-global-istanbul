import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./output.css";

import { ChatUIProvider } from "@pushprotocol/uiweb";
import { darkChatTheme } from "@pushprotocol/uiweb";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChatUIProvider theme={darkChatTheme}>
    <App />
  </ChatUIProvider>
);
