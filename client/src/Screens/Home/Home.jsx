import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Misc/Header/Header";
import "./Home.scss";
import axios from '../../Api/Axios'
import { Store } from "../../Context/Store";
import CreateInvoice from "../../Components/Invoice/CreateInvoice/CreateInvoice";
function Home() {
  const {config}=Store()
  const [invoices,setInvoices]=useState([])
  useEffect(()=>{
    axios.get('invoice/',config).then((res)=>{
      setInvoices(res.data)
    })
  },[config])
  return (
    <div>
      <Header />
      <div className="home_body">
        <div className="menu_area">
          <CreateInvoice/>
        </div>
        <div className="home_body">
          <h2 className="thead">Invoices</h2>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Company</Th>
                  <Th>Invoice Number</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Total</Th>
                  <Th>Pay</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoices.map((inv)=>{
                  return <Tr key={inv._id}>
                  <Td>{inv.company}</Td>
                  <Td>{inv.number}</Td>
                  <Td>{inv.date}</Td>
                  <Td isNumeric>{inv.total} {inv.currency}</Td>
                </Tr>
                })}
                
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;
