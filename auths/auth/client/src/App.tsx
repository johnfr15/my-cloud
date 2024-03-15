import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider, 
    Route 
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./routes/Login";
import Register from "./routes/Regsiter";


const router = createBrowserRouter(
    createRoutesFromElements(
            <Route path={`/`}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
    ),
    { basename: import.meta.env.BASE_URL } 
);

const App = () => {
    return ( 
    <>
        {localStorage.setItem('chakra-ui-color-mode', 'dark')}
        <ChakraProvider>
            <RouterProvider router={router} /> 
        </ChakraProvider>
    </>
    )
}

export default App;
