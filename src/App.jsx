import { RouterProvider, createBrowserRouter } from "react-router-dom";

// layout
import AppLayout from "./components/layout/AppLayout";
// pages
import Cart from "./pages/Cart";
import CreateOrder, { orderAction } from "./pages/CreateOrder";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Menu, { menuLoader } from "./pages/Menu";
import Order, { orderLoader, priorityAction } from "./pages/Order";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: orderAction,
      },
      {
        action: priorityAction,
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
