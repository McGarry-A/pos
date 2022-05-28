import { FormEvent, useState } from "react";
import { OrderInterface } from "../../Components/OrderInterface";
import WorkflowOrders from "../../Components/WorkflowOrders/WorkflowOrders";
import useFormField from "../../Hooks/useFormField";
import { AiOutlinePlus } from "react-icons/ai";
import Portal from "../../Components/Portal/Portal";
import CreateCustomerForm from "../../Components/CreateCustomerForm/CreateCustomerForm";

const Customers = () => {
  const [filteredCustomers, setFilteredCustomers] =
    useState<OrderInterface | null>(null);

  const nameField = useFormField();
  const numberField = useFormField();
  const emailField = useFormField();

  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);

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
        {filteredCustomers && <WorkflowOrders data={filteredCustomers} />}
      </div>
      {renderAddCustomerPopup()}
    </div>
  );
};

export default Customers;
