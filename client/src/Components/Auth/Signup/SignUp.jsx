import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "../../../Api/Axios";
function SignUp() {
  // ===========Page Conrtroles==========
  const toast = useToast();
  const [loading, setLoadign] = useState();
  // ===========Form Data================
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [mobile, setMobile] = useState(null);
  // =========Functions==================
  const handleSubmit = async (e) => {
    try {
      let body = { name, email, mobile, password };
      setLoadign(true);
      let data = await axios.post("auth/signup", body);
      toast({
        title: "Success",
        position: "top-right",
        description: data.data,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      setLoadign(false);
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
      <FormControl mt={2}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          isRequired
          type={"text"}
        />
      </FormControl>
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
        <FormLabel>Mobile Number</FormLabel>
        <Input
          placeholder="Mobile Number"
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          type={"number"}
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

      {name && email && mobile && password && (
        <Button
          width={"100%"}
          colorScheme="blue"
          isLoading={loading}
          onClick={handleSubmit}
          mt={5}
        >
          Signup
        </Button>
      )}
    </div>
  );
}

export default SignUp;
