import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Misc/Header/Header";
import axios from "../../Api/Axios";
import { Store } from "../../Context/Store";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import "./viewinvoice.scss";
import Invoice from "../../Components/Invoice/Invoice/Invoice";

function ViewInvoice() {
  const { id } = useParams();
  const [invoice, setinvoice] = useState();
  const [loader, setLoader] = useState(false);
  const [progress,setProgress]=useState(false)
  const { config } = Store();
  const toast=useToast()
  useEffect(() => {
    axios.get(`invoice/get-invoice/${id}`, config).then((res) => {
      setinvoice(res.data);
    });
  }, [config, id]);
  const makePayment = () => {
    setLoader(true);
    axios
      .post("/pay", { id: id }, config)
      .then((res) => {
        setLoader(false);
        setProgress(true)
        toast({
          title: 'Payment Request Email Send ',
          description: "Please Check Your Email ",
          status: 'loading',
          duration: 9000,
          isClosable: true,
          position:'top-right'
        })
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  return (
    <div>
      <Header />
      {/* <Text textAlign={'center'} mt={5}  fontSize={'30px'}>View Invoice </Text> */}
      {invoice&&<Box width={"60%"} ml={"20%"} mt={5}>
        <Invoice  width={"100%"} data={invoice} />
      {
        !progress&&(invoice.status==='pending')&&<Button
        width={"100%"}
        mt={5}
        colorScheme={"blue"}
        isLoading={loader}
        onClick={makePayment}
      >
        Pay {invoice.total} <span>&#8377;</span>
      </Button>
      }


        
      </Box>}
      
    </div>
  );
}

export default ViewInvoice;
