import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { MoralisProvider } from "react-moralis";
import reportWebVitals from './reportWebVitals';

const theme=extendTheme({
  config:{
    initialColorMode:'dark'
  }
})

const appId="o8c5625XLcPXjRENaEzzuFMS86ktO8ObpBJYuUFj";
const serverUrl="https://0xhcpoceockw.usemoralis.com:2053/server";
ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
