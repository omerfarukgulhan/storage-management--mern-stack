import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import EditItem from "./pages/EditItem";
import CreateItem from "./pages/CreateItem";
import DeleteItem from "./pages/DeleteItem";

import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "items/create",
      element: <CreateItem />,
    },
    {
      path: "items/edit/:id",
      element: <EditItem />,
    },
    {
      path: "items/delete/:id",
      element: <DeleteItem />,
    },
  ]);

  return (
    <div className=" bg-gray-900 min-h-screen">
      <ToastContainer position="bottom-left" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
