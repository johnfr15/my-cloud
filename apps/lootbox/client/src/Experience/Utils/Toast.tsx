import { Box, Image, Flex, Text, Spacer } from "@chakra-ui/react";
import EventEmitter                       from "./EventEmitter";
import Resources                          from "./Resources";
import Experience                         from "../Experience";
import Wallet                             from "./Wallet";
import { ICONS, EXPLORERS }               from "../../Lib/web3/constants";

type ToastArgs = {
  wallet: Wallet
  contractName: string
  funcName: string
  tx: any
  error?: any
}

export default class Toast extends EventEmitter 
{
  experience  = Experience.Instance()
  icons       = ICONS
  resources: Resources
  toast: any
  
  constructor() {
    super()
    this.resources  = this.experience.resources
    this.toast      = this.experience.root["toast"]
  }
  
  deploy(args: ToastArgs) 
  {
    const network = args.wallet.network
    this.toast({
      title: `${args.contractName.slice(0, -2)} deployed !`,
      description: <Box><Text>At {args.tx.address}</Text><Box mt="5" as="a" color="blue" target={"blank"} href={`${EXPLORERS[network]}/address/${args.tx.address}`}>See on explorer</Box></Box>,
      status: 'success',
      position: "top-right",
      duration: 10000,
      isClosable: true,
    })
  }

  import(address: string)
  {
    this.toast({
      title: 'Contract imported.',
      description: address,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }
  
  txSent(args: ToastArgs) 
  {
    const network = args.wallet.network
    this.toast({
      title: <Flex><Text>{args.contractName.slice(0, -2)}: {args.funcName}</Text><Spacer /><Image src={ICONS[args.contractName][args.funcName]} boxSize={"3rem"} /></Flex>,
      description: <a  color="blue" target={"blank"} href={`${EXPLORERS[network]}/tx/${args.tx.hash}`}>See on explorer</a>,
      status: 'info',
      position: "top-right",
      duration: 6000,
      isClosable: true,
    })
  }

  txPending(args: ToastArgs) {}


  txValided(args: ToastArgs) 
  {
    const network = args.wallet.network
    this.toast({
      title: `${args.contractName.slice(0, -2)}: ${args.funcName}`,
      description: <Box><Text>transaction valided successfully !</Text><Box mt="5" as="a" color="blue" target={"blank"} href={`${EXPLORERS[network]}/tx/${args.tx.hash}`}>See on explorer</Box></Box>,
      status: 'success',
      position: "top-right",
      duration: 6000,
      isClosable: true,
    })
  }

  txFailed(args: ToastArgs) 
  {
    this.toast({
      title: `${args.contractName}: ${args.funcName}`,
      description: args.error!,
      status: 'error',
      position: "bottom-right",
      duration: 10000,
      isClosable: true,
    })
  }
}