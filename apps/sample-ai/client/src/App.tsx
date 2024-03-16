import SandBox from './components/Sandbox';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  
  return (
  <>
    {localStorage.setItem('chakra-ui-color-mode', 'dark')}
    <ChakraProvider>
      <SandBox />
    </ChakraProvider>
  </>
  );
}

export default App;
