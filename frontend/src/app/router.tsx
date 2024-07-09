import { createBrowserRouter } from "react-router-dom";
import {ProductComponent} from "@/components/product/product";
import App from "./app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ 
      path: "/", 
      //element: <ProductComponent /> 
      }],
  },
]);
