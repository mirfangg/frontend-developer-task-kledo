import { createBrowserRouter } from "react-router";
import App from "./App";
import { regionLoader } from "./regionLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: regionLoader,
  },
]);

export default router;
