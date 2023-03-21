import React, { useEffect } from "react";

import {
  Container,
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import SignIn from "../../Components/Auth/SignIn/SignIn";
import SignUp from "../../Components/Auth/Signup/SignUp";
import './Login.scss'
import { Store } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
function Login() {
  const {user}=Store()
  const navigate=useNavigate()
  useEffect(()=>{
    if(user){
      navigate('/home')
    }
  },[user,navigate])
  return (
    <div>
      <Container max='xxl' centerContent>
        <Box mt={10} className="login_header">
          <Text className="text">Shopping Mania</Text>
        </Box>

        <Box mt={5} className="login_area">
          <Tabs variant="soft-rounded" colorScheme="linkedin">
            <TabList>
              <Tab width={'50%'} >Sign In</Tab>
              <Tab width={'50%'}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignIn/>
              </TabPanel>
              <TabPanel>
                <SignUp/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
