import { FormEvent, useEffect, useState } from "react";
import useFormField from "../../Hooks/useFormField";
import { AiOutlinePlus } from "react-icons/ai";
import Portal from "../../Components/Portal/Portal";
import CreateCustomerForm from "../../Components/CreateCustomerForm/CreateCustomerForm";
import CustomerTable from "../../Components/CustomerTable/CustomerTable";
import { CustomerInterface } from "../../Components/CustomerInterface";
import { useAppSelector } from "../../Store";
import useIsMobile from "../../Hooks/useIsMobile";
import CustomerCard from "../../Components/CustomerCard/CustomerCard";

const Customers = () => {
  const customers = useAppSelector((state) => state.customers);
  const [filteredCustomers, setFilteredCustomers] =
    useState<CustomerInterface[]>(customers);

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  const nameField = useFormField();
  const numberField = useFormField();
  const emailField = useFormField();

  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const renderAddCustomerPopup = () => {
    const target = document.getElementById("root");
    return (
      <Portal target={target!} isHidden={portalIsHidden}>
        <CreateCustomerForm setPortalIsHidden={setPortalIsHidden} />
      </Portal>
    );
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!filteredCustomers) return;
    console.log("SEARCH");

    const nameQuery = nameField.value;
    const emailQuery = emailField.value;
    const phoneQuery = numberField.value;

    const newFilteredCustomers = filteredCustomers.filter(
      ({ name, phone, email }) =>
        name === nameQuery && phone === phoneQuery && email === emailQuery
    );

    console.log(newFilteredCustomers);
    setFilteredCustomers(newFilteredCustomers);
  };

  const renderCustomerTable = () => {
    if (!isMobile && filteredCustomers.length >= 1) {
      return <CustomerTable data={filteredCustomers} />;
    }
  };

  const renderCustomerCards = () => {
    if (isMobile && filteredCustomers.length >= 1) {
      return (
        <div>
          {filteredCustomers.map((customer, index) => {
            return (
              <div key={index}>
                <CustomerCard customer={customer} />
              </div>
            );
          })}
        </div>
      );
    }
  };
  return (
    <div>
      <div className="space-y-2 p-2">
        <h2 className="text-2xl text-gray-800 mt-4">Customer Search</h2>
      </div>
      <form onSubmit={(e) => handleFormSubmit(e)} className="my-6 px-2">
        <div className="grid grid-cols-2 gap-5 max-w-lg">
          <div className="col-span-2">
            <label className="text-xs text-gray-700 font-light">
              Full Name
            </label>
            <input type="text" className="h-8" {...nameField} />
          </div>
          <div className="">
            <label className="text-xs text-gray-700 font-light">
              E-mail Address
            </label>
            <input type="text" className="h-8" {...emailField} />
          </div>
          <div className="">
            <label className="text-xs text-gray-700 font-light">
              Phone Number
            </label>
            <input type="text" className="h-8" {...numberField} />
          </div>
          <div className="flex col-span-2 justify-end">
            <button className="border-gray-300 border p-4 text-gray-500 text-xs font-semibold uppercase rounded">
              Find Results
            </button>
          </div>
        </div>
      </form>
      <div className="col-span-2 flex justify-end">
        <p className="flex items-center text-sm text-gray-600 opacity-70">
          Add a new customer{" "}
          <span className="ml-2 border p-1 border-gray-500">
            <AiOutlinePlus
              className="cursor-pointer"
              onClick={() => setPortalIsHidden(!portalIsHidden)}
            />
          </span>
        </p>
      </div>
      <div className="mt-4">
        {renderCustomerCards()}
        {renderCustomerTable()}
      </div>
      {renderAddCustomerPopup()}
    </div>
  );
};

export default Customers;
