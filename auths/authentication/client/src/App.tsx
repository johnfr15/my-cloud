import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider, 
    Route 
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./routes/Login";
import Root from "./routes/Root";
import Register from "./routes/Regsiter";

const { VITE_BASENAME, VITE_APP_NAME } = import.meta.env

const router = createBrowserRouter(
    createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
    ), 
    { basename: `/${VITE_BASENAME}/${VITE_APP_NAME}` }
);

const App = () => {
    return ( 
        <ChakraProvider>
            <RouterProvider router={router} /> 
        </ChakraProvider>
    )
}

export default App;
