import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,

} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Misc/Header/Header";
import "./Home.scss";
import axios from "../../Api/Axios";
import { Store } from "../../Context/Store";
import CreateInvoice from "../../Components/Invoice/CreateInvoice/CreateInvoice";
import InvoiceTable from "../../Components/Invoice/InvoiceTable/InvoiceTable";
function Home() {
  const { config } = Store();
  const [invoices, setInvoices] = useState([]);
  const [reload, setReload] = useState("");
  const [status,setStatus]=useState('pending')
  useEffect(() => {
    axios.get(`invoice/?status=${status}`, config).then((res) => {
      setInvoices(res.data);
    });

  }, [status,reload,config]);
  
  return (
    <div> 
      <Header />
      <div className="home_body"> 
        <div className="menu_area">
          <CreateInvoice setReload={setReload} />
        </div>
        <div className="home_body_table_area">
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab onClick={()=>{setStatus('pending')}}>Pending Invoices</Tab>
              <Tab onClick={()=>{setStatus('payed')}}>Payment Compleated Invoices</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              <h2 className="thead">Pending Invoices</h2>
              <InvoiceTable data={invoices}/>
              </TabPanel>
              <TabPanel>
              <h2 className="thead">Payed Invoices</h2>
              <InvoiceTable data={invoices}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
          
          
        </div>
      </div>
    </div>
  );
}

export default Home;
