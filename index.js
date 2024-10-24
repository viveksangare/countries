import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CountryCard from "./components/CountryCard";
import CountryDetails from "./components/CountryDetails";
import Error from "./components/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement:<Error/>,
        children: [
            {
                path: "/",
                element: <CountryCard />
            },
            {
                path: "/:country",
                element: <CountryDetails />
            }
        ]
    }
])


createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
)