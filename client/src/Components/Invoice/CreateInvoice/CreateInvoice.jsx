import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./createinvoice.scss";
import axios from '../../../Api/Axios'
import { Store } from "../../../Context/Store";
function CreateInvoice({setReload}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [items, setItems] = useState([]);
  const [company, setCompany] = useState();
  const [date, setDate] = useState();
  const [item, setIterm] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [unit, setunit] = useState();
  const [loader,setLoader]=useState(false)
  const {config}=Store()
  const handleOpn = () => {
    onOpen();
  };
  const handleAddItem = () => {
    setItems((items) => [...items, { item, quantity, price, unit }]);
    setunit("");
    setIterm("");
    setQuantity("");
    setPrice("");
  };
  const handleSubmit=async()=>{
    setLoader(true)
    axios.post('invoice/create',{company,date,items},config).then((res)=>{
        setLoader(false)
        toast({
          title: "Success",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose()
        setReload(items)
    }).catch((error)=>{
      setLoader(false)
      toast({
        title: "Error.",
        position: "top-right",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    })
  }
  return (
    <div>
      <Button colorScheme={"blue"} onClick={() => handleOpn()}>
        Create
      </Button>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="invoice_area">
              <FormControl mt={2}>
                <FormLabel>Company</FormLabel>
                <Input
                  placeholder="Company"
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                  isRequired
                  type={"text"}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Date</FormLabel>
                <Input
                  placeholder="Company"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  isRequired
                  type={"date"}
                />
              </FormControl>
              <Text mt={5}>Items</Text>
              {items.length ? (
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Item </Th>
                      <Th>Unit</Th>
                      <Th>Quantity</Th>
                      <Th>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {items.map((item) => {
                      return (
                        <Tr key={item.item}>
                          <Td>{item.item}</Td>
                          <Td>{item.unit}</Td>
                          <Td>{item.quantity}</Td>
                          <Td>{item.price}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              ) : (
                ""
              )}

              <Box display={"flex"} mt={2}>
                <Input
                  placeholder="Item"
                  value={item}
                  onChange={(e) => {
                    setIterm(e.target.value);
                  }}
                  isRequired
                  type={"text"}
                  mr={2}
                />
                <Input
                  placeholder="unit"
                  value={unit}
                  onChange={(e) => {
                    setunit(e.target.value);
                  }}
                  isRequired
                  type={"string"}
                  mr={2}
                />
                <Input
                  value={quantity}
                  placeholder="Quantity"
                  isRequired
                  type={"number"}
                  mr={2}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
                <Input
                  placeholder="Price "
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  isRequired
                  type={"number"}
                  mr={2}
                />
                {item && unit && quantity && price && (
                  <Button colorScheme={"blue"} onClick={handleAddItem}>
                    Add
                  </Button>
                )}
              </Box>
            </div>
            <Box mt={5}>
              {items.length ? (
                <Button width={"100%"} colorScheme={"green"} isLoading={loader} onClick={handleSubmit}>
                  Submit
                </Button>
              ) : (
                ""
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CreateInvoice;
