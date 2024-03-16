import TTS_1 from './Container/GPT-models/TTS-1';
import { Center, Stack } from '@chakra-ui/react';
import DALL_E_3 from './Container/GPT-models/DALL-E-3';
import Gpt35TurboContainer from './Container/GPT-models/GPT-3.5-turbo';
import Gpt35TurboLayout from './Layout/GptLayout';
import GPT_3_5_TURBO_ACTION from './Container/GPT-models/GPT-3.5-turbo-action';




const SandBox = () => 
{





  /***********************************|
  |            COMPONENTS             |
  |__________________________________*/
  return (
    <Center>
      <Stack direction={'column'} w='75%'>
          <Gpt35TurboContainer>
            <Gpt35TurboLayout />
          </Gpt35TurboContainer>
          <TTS_1 />
          <GPT_3_5_TURBO_ACTION />
          <DALL_E_3 />
      </Stack>
    </Center>
  )
}

export default SandBox;