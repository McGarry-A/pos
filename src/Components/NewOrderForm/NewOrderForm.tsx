import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

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
    // probably need a better way to find the results

    const filteredArray = customers.filter(
      (el) => `${el.firstName} ${el.lastName}` === newValue
    );
    const customer = filteredArray[0];
    setCurrentCustomer(customer);
  };

  const renderCustomerDetails = () => {
    const { currentCustomer } = basket;

    if (currentCustomer) {
      const { firstName, lastName, phone, address } = currentCustomer;

      return (
        <div className="">
          <h3 className="mb-1 text-gray-700">
            {firstName} {lastName}
          </h3>
          <p className="text-sm opacity-60 italic">{phone}</p>
          <p className="text-sm opacity-60 italic">{address}</p>
        </div>
      );
    }
  };

  const renderCustomerField = () => {
    const { currentCustomer } = basket;

    if (currentCustomer) return;
    const options = customers.map((el) => `${el.firstName} ${el.lastName}`);

    return (
      <div className="">
        <div className="flex space-x-2 my-1">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: "100%" }}
            onChange={(e: any, newValue: string | null) =>
              handleSelectCustomer(newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Find a Customer" />
            )}
          />
          <button
            className="border rounded bg-green-600 p-2 hover:bg-green-800"
            onClick={() => setPortalIsHidden(!portalIsHidden)}
          >
            <AiOutlinePlus color="white" />
          </button>
        </div>
      </div>
    );
  };

  const renderAddCustomerPopUp = () => (
    <Portal target={target!} isHidden={portalIsHidden}>
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
