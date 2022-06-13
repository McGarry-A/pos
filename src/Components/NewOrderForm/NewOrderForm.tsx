import { MdClear } from "react-icons/md";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import React, { useState } from "react";
import Portal from "../Portal/Portal";
import useBasket from "../../Context/BasketProvider";
import { useAppSelector } from "../../Store";
import Autocomplete from "react-autocomplete";
import { HiPlusSm } from "react-icons/hi";

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
    // const options = customers.map((el) => `${el.name}`);

    // change input to auto suggest box from mui or something
    // our list of customers is declared at the top of the component and inside "customers"

    return (
      <div className="flex p-4 md:p-0">
        <Autocomplete
          wrapperStyle={{ width: "100%", height: "", fontSize: "12px" }}
          getItemValue={(customer) => customer.name}
          items={customers}
          renderItem={(item, isHighlighted) => (
            <div
              className={`py-2 px-1 z-10 ${
                isHighlighted ? "bg-blue-400 text-white" : "bg-white"
              }`}
            >
              <p>{item.name}</p>
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
    <div className="space-y-2 max-w-xl">
      {renderCustomerDetails()}
      {renderCustomerField()}
      {renderAddCustomerPopUp()}
    </div>
  );
};

export default NewOrderForm;
