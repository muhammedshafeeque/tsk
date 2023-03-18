import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../Api/Axios";
import { Store } from "../../../Context/Store";
function SignIn() {
  const toast = useToast();
  const [loading, setLoadign] = useState();
  const {setUser}=Store()
  const navigate =useNavigate()
  // ===========Form Data================
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    try {
      let body = {  email, password };
      setLoadign(true);
      let data = await axios.post("auth/login", body);
      toast({
        title: "Success",
        position: "top-right",
        description: 'Login Success',
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem('token',JSON.stringify(data.data.token))
      setUser(data.data)
      setLoadign(false);
      navigate('/home')
    } catch (error) {
      setLoadign(false);
      toast({
        title: "Error.",
        position: "top-right",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
      
      <FormControl mt={2} isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type={"email"}
        />
      </FormControl>
      
      <FormControl mt={2} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={"password"}
        />
      </FormControl>

      {email && password && (
        <Button
          width={"100%"}
          colorScheme="blue"
          isLoading={loading}
          onClick={handleSubmit}
          mt={5}
        >
          Login
        </Button>
      )}
    </div>
  );
}

export default SignIn;
