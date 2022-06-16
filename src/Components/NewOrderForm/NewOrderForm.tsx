import React, { useState } from "react";

import { useAppSelector } from "../../Store";
import useBasket from "../../Context/BasketProvider";

import { MdClear } from "react-icons/md";
import { HiPlusSm } from "react-icons/hi";

import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import Portal from "../Portal/Portal";
import Autocomplete from "react-autocomplete";

const NewOrderForm: React.FC = () => {
  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const [customerSearchValue, setCustomerSearchValue] =
    useState<string>("Add Customer Here");

  const basket = useBasket();
  const customers = useAppSelector((state) => state.customers);

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

  const renderPanelTitle = () => (
    <h2 className="text-xl tracking-wide hidden md:block">Your Basket</h2>
  );

  const renderCustomerDetails = () => {
    const { currentCustomer } = basket;

    if (currentCustomer) {
      const { name, phone, address } = currentCustomer;

      return (
        <div className="m-5 border p-4 bg-blue-600 md:mx-0 md:my-2 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="mb-1 text-gray-50">{name}</h3>
            <MdClear
              size={"1.3rem"}
              color={"white"}
              className="cursor-pointer hover:scale-110"
              onClick={() => handleClearCustomer()}
            />
          </div>
          <p className="text-sm opacity-60 italic text-gray-50">{phone}</p>
          <p className="text-sm opacity-60 italic text-gray-50">{address}</p>
        </div>
      );
    }
  };

  const renderCustomerField = () => {
    const { currentCustomer } = basket;

    if (currentCustomer) return;

    return (
      <div className="flex p-4 md:p-0">
        <Autocomplete
          wrapperStyle={{ width: "100%", height: "", fontSize: "12px" }}
          getItemValue={(customer) => customer.name}
          items={customers}
          renderItem={(item, isHighlighted) => (
            <div
              className={`py-2 px-1 z-50 opacity-1 ${
                isHighlighted
                  ? "bg-blue-600 text-white"
                  : "bg-white opacity-100 relative z-50"
              }`}
            >
              <div className="flex justify-between px-2">
                <p>{item.name}</p>
                <p className="opacity-60">{item.phone}</p>
              </div>
            </div>
          )}
          value={customerSearchValue}
          onChange={(event, value) => setCustomerSearchValue(value)}
          onSelect={(value) => handleSelectCustomer(value)}
          shouldItemRender={(item, value) => {
            if (item.name.includes(value)) return true;
            else return false;
          }}
        />
        <div
          className="flex justify-center items-center p-2 ml-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-500"
          onClick={() => setPortalIsHidden(!portalIsHidden)}
        >
          <HiPlusSm size="1.5rem" className="text-white" />
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
    <div className="space-y-2 max-w-xl my-3">
      {renderPanelTitle()}
      {renderCustomerDetails()}
      {renderCustomerField()}
      {renderAddCustomerPopUp()}
    </div>
  );
};

export default NewOrderForm;
