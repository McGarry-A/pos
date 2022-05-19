import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import React, { useState } from "react";
import Portal from "../Portal/Portal";
import useBasket from "../../Context/BasketProvider";

const NewOrderForm: React.FC = () => {
  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const target = document.getElementById("root");

  const basket = useBasket();

  const handleClearCustomer = () => {
    const { setCurrentCustomer } = basket;
    setCurrentCustomer(null);
  };

  const renderCustomerDetails = () => {
    const { currentCustomer } = basket;

    if (currentCustomer) {
      const { firstName, lastName, phone, email, address } = currentCustomer;

      return (
        <div className="divide-y-2 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">
              {firstName} {lastName}
            </h3>
            <MdOutlineCancel
              className="cursor-pointer"
              size={"1.2rem"}
              onClick={handleClearCustomer}
            />
          </div>
          <div>
            <p className="text-md">Contact Information</p>
            <p className="text-sm opacity-50 italic">{phone}</p>
            <p className="text-sm opacity-50 italic">{email}</p>
          </div>
          <div>
            <p className="text-md">Street Address</p>
            <p className="text-sm opacity-50 italic">{address}</p>
          </div>
        </div>
      );
    }
  };

  const renderCustomerField = () => {
    const { currentCustomer } = basket;

    if (currentCustomer) return;

    return (
      <div className="">
        <label htmlFor="first-name" className="text-lg">
          Customer
        </label>
        <div className="flex space-x-1 items-center">
          <input
            type="text"
            name=""
            id=""
            autoComplete=""
            className="border-2 block w-full rounded-md h-8"
          />
          <button
            className="p-1 border rounded bg-green-600"
            onClick={() => setPortalIsHidden(!portalIsHidden)}
          >
            <AiOutlinePlus color="white" size={"1.2rem"} />
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
