import { FormEvent, useEffect, useRef, useState } from "react";
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

  const nameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const renderAddCustomerPopup = () => {
    return (
      <Portal isHidden={portalIsHidden}>
        <CreateCustomerForm setPortalIsHidden={setPortalIsHidden} />
      </Portal>
    );
  };

  const handleClearCustomers = () => {
    nameRef.current!.value = "";
    numberRef.current!.value = "";
    emailRef.current!.value = "";

    setFilteredCustomers(customers);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!filteredCustomers) return;
    console.log("SEARCH");

    const name = nameField.value;
    const email = emailField.value;
    const phone = numberField.value;

    const queries = [
      { query: name, action: "FILTER_NAME" },
      { query: email, action: "FILTER_EMAIL" },
      { query: phone, action: "FILTER_PHONE" },
    ]
      .filter((el) => el.query !== null)
      .filter((el) => el.query.length !== 0);

    const filterCustomers = () => {
      if (!filteredCustomers) return;
      let allCustomers: CustomerInterface[] = [];

      queries.forEach((el) => {
        const { query, action } = el;

        switch (action) {
          case "FILTER_NAME":
            const matchingNames = (
              allCustomers.length === 0 ? filteredCustomers : allCustomers
            ).filter((el) => {
              return el.name.includes(query) ? el : null;
            });
            allCustomers = [...matchingNames];
            break;
          case "FILTER_EMAIL":
            const matchingEmails = (
              allCustomers.length === 0 ? filteredCustomers : allCustomers
            ).filter((el) => {
              return el.email.includes(query) ? el : null;
            });
            allCustomers = [...matchingEmails];
            break;
          case "FILTER_PHONE":
            const matchingPhone = (
              allCustomers.length === 0 ? filteredCustomers : allCustomers
            ).filter((el) => {
              return el.phone.includes(query) ? el : null;
            });
            allCustomers = [...matchingPhone];
            break;
          default:
            break;
        }
      });

      setFilteredCustomers(allCustomers);
    };

    handleClearCustomers();
    filterCustomers();
  };

  const renderCustomerTable = () => {
    if (!isMobile && filteredCustomers.length >= 1) {
      return <CustomerTable data={filteredCustomers} />;
    }
  };

  const renderCustomerCards = () => {
    if (isMobile && filteredCustomers.length >= 1) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
      <div className="space-y-2 p-2 mt-8">
        <h2 className="text-2xl text-gray-800 mt-4 px-2">Customer Search</h2>
      </div>
      <form onSubmit={(e) => handleFormSubmit(e)} className="my-6 px-4">
        <div className="grid grid-cols-2 gap-5 max-w-lg">
          <div className="col-span-2">
            <label className="text-xs text-gray-700 font-light">
              Full Name
            </label>
            <input type="text" className="h-8" {...nameField} ref={nameRef} />
          </div>
          <div className="">
            <label className="text-xs text-gray-700 font-light">
              E-mail Address
            </label>
            <input type="text" className="h-8" {...emailField} ref={emailRef} />
          </div>
          <div className="">
            <label className="text-xs text-gray-700 font-light">
              Phone Number
            </label>
            <input
              type="text"
              className="h-8"
              {...numberField}
              ref={numberRef}
            />
          </div>
          <div className="flex col-span-2 justify-end space-x-4">
            <button
              className="border-gray-300 border p-3 text-gray-500 text-xs font-semibold uppercase rounded"
              type="button"
              onClick={handleClearCustomers}
            >
              CLEAR
            </button>
            <button className="border-gray-300 bg-gray-600 border p-4 text-gray-50 text-xs font-semibold uppercase rounded">
              Find Results
            </button>
          </div>
        </div>
      </form>
      <div className="flex max-w-lg justify-end mx-4 md:mx-0">
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
