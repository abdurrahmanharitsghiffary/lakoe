import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import { IndexPage } from ".";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <IndexPage /> }],
  },
]);
