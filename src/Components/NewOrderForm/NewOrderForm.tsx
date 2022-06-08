import { AiOutlinePlus } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import React, { useState } from "react";
import Portal from "../Portal/Portal";
import useBasket from "../../Context/BasketProvider";
import { useAppSelector } from "../../Store";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const NewOrderForm: React.FC = () => {
  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);

  const basket = useBasket();
  const customers = useAppSelector((state) => state.customers);

  const target = document.getElementById("root");

  const handleClearCustomer = () => {
    const { setCurrentCustomer } = basket;
    setCurrentCustomer(null);
  };

  const handleSelectCustomer = (newValue: string | null) => {
    const { setCurrentCustomer } = basket;

    const filteredArray = customers.filter((el) => `${el.name}` === newValue);
    const customer = filteredArray[0];
    setCurrentCustomer(customer);
  };

  const renderCustomerDetails = () => {
    const { currentCustomer } = basket;

    if (currentCustomer) {
      const { name, phone, address } = currentCustomer;

      return (
        <div className="">
          <div className="flex justify-between items-center">
            <h3 className="mb-1 text-gray-700">{name}</h3>
            <MdClear
              size={"1.3rem"}
              className="text-gray-700 cursor-pointer"
              onClick={() => handleClearCustomer()}
            />
          </div>
          <p className="text-sm opacity-60 italic">{phone}</p>
          <p className="text-sm opacity-60 italic">{address}</p>
        </div>
      );
    }
  };

  const renderCustomerField = () => {
    const { currentCustomer } = basket;

    if (currentCustomer) return;
    const options = customers.map((el) => `${el.name}`);

    // change input to auto suggest box from mui or something
    // our list of customers is declared at the top of the component and inside "customers"

    return (
      <div className="">
        <div className="flex space-x-2 my-1">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{
              width: "100%",
            }}
            onChange={(e: any, newValue: string | null) =>
              handleSelectCustomer(newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Start typing a customer..." />
            )}
          />
          <button
            className="border rounded p-2 border-gray-300"
            onClick={() => setPortalIsHidden(!portalIsHidden)}
          >
            <AiOutlinePlus color="gray" />
          </button>
        </div>
      </div>
    );
  };

  const renderAddCustomerPopUp = () => (
    <Portal isHidden={portalIsHidden}>
      <CreateCustomerForm setPortalIsHidden={setPortalIsHidden} />
    </Portal>
  );

  return (
    <div className="space-y-2 max-w-xl">
      {renderCustomerDetails()}
      {renderCustomerField()}
      {renderAddCustomerPopUp()}
    </div>
  );
};

export default NewOrderForm;
