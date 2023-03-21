import { Box, Text } from "@chakra-ui/react";
import React from "react";
import "./invoice.scss";
function Invoice({ data }) {
  return (
    <Box className="invoiceBody">
      <Text textAlign={"center"} fontSize={"25px"}>
        Invoice
      </Text>
      <div className="head_area">
        <h5>Invoice Number : {data.number}</h5>
        <h5>Company Name : {data.company}</h5>
        <h5>Costomer Name : {data.client}</h5>
        <h5>Date : {data.date}</h5>
      </div>
      <Text mt={5} ml={5}>
        Items
      </Text>
      <Box mt={3}>
        <table className="invoice_table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.price} <span>&#8377;</span></td>
                  <td>{item.total} <span>&#8377;</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
      <Box
        mt={5}
        display={"flex"}
        justifyContent={"flex-end"}
        fontSize={"20px"}
        fontWeight={"bold"}
        pr={5}
      >
        <Text mt={5}>Total : </Text>
        <Text mt={5} ml={3}> {data.total} <span>&#8377;</span></Text>
      </Box>
    </Box>
  );
}

export default Invoice;
