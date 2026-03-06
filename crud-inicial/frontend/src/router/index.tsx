import { createBrowserRouter, Navigate } from "react-router-dom";

import Novo from "../pages/Novo";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Editar from "../pages/Editar";
import Login, { actionLogin } from "../pages/Login";
import { editarLoader } from "../pages/Editar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout titulo="Lista de Produtos" />,
        children: [
            // {path:"", element: <Navigate to="/login"/>},
            // { path: "/login", element: <Login />, action: actionLogin },
            {
                path: "inicio",
                element: <Home />,
            },
            {
                path: "novo",
                element: <Novo />,
            },
            {
                path: "editar/:codigo",
                element: <Editar />,
                loader: editarLoader,
            },
        ],
    },
]);

export default router;
