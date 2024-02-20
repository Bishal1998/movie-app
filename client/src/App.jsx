import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Footer, Header } from "./components";
import {
  CreateMovie,
  Home,
  Login,
  Movies,
  Profile,
  Register,
  UpdateMovie,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./components";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <PrivateRoute element={<Profile />} />,
      },
      {
        path: "/create-movie",
        element: <PrivateRoute element={<CreateMovie />} />,
      },
      {
        path: "/update/:id",
        element: <PrivateRoute element={<UpdateMovie />} />,
      },
      {
        path: "/movies/:slug",
        element: <Movies />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => (
  <div className="px-4">
    <ToastContainer />
    <RouterProvider router={router} />
  </div>
);

export default App;
