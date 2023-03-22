import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function InvoiceTable({data}) {
    const navigte = useNavigate();
    const handleView = (id) => {
        navigte(`/view-invoice/${id}`);
      };
  return (
    <div>
        <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Company</Th>
                  <Th>Invoice Number</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Total</Th>
                  <Th>View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((inv) => {
                  return (
                    <Tr key={inv._id}>
                      <Td>{inv.company}</Td>
                      <Td>{inv.number}</Td>
                      <Td>{inv.date}</Td>
                      <Td isNumeric>
                        {inv.total} <span>&#8377;</span>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            handleView(inv._id);
                          }}
                          colorScheme={"blue"}
                        >
                          View
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
    </div>
  )
}

export default InvoiceTable