import { Button, Alert, Input } from "@chakra-ui/react";
import { Box, Container, Heading } from "@chakra-ui/layout";
import {useMoralis} from "react-moralis";


const SignUp = () =>{
  const {signup}=useMoralis()
  return <Box>
    <Input />
    <Input />
    <Button onClick={()=> signup}>Sign up</Button>

  </Box>
}

function App() {
  const {authenticate, isAuthenticated, logout, authError}=useMoralis()

  if(isAuthenticated){
    return(
    <Container>
      <Heading>Welcome to the Twitter Clone</Heading>
      <Button onClick={() => logout()}>Logout</Button>
    </Container>
    )}
  return (
    <div >
      Twitter Clone

    {authError && (<Alert status="success">
  <AlertIcon />
  <Box flex="1">
    <AlertTitle>Success!</AlertTitle>
    <AlertDescription display="block">
    {authError.message}
    </AlertDescription>
  </Box>
  <CloseButton position="absolute" right="8px" top="8px" />
</Alert>)}

    <Button onClick={() => authenticate()}>
      Authenticate
    </Button>
    </div>


  );
}

export default App;
