import { AiOutlinePlus } from "react-icons/ai";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import React, { useState } from "react";
import Portal from "../Portal/Portal";
import { CustomerInterface } from "../CustomerInterface";

interface props {
  setCurrentCustomer: React.Dispatch<React.SetStateAction<CustomerInterface>>;
  currentCustomer: CustomerInterface | {};
}

const NewOrderForm: React.FC<props> = ({
  currentCustomer,
  setCurrentCustomer,
}) => {
  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const target = document.getElementById("root");

  const renderCustomerDetails = () => {
    //   const { firstName, lastName, country, postcode } = currentCustomer;
    //   return (
    //     <div className="flex justify-between items-center">
    //       <div>
    //         <p>{`${firstName} ${lastName}`}</p>
    //         <p className="text-sm opacity-60">{`${country} ${postcode}`}</p>
    //       </div>
    //       <div>
    //         <button
    //           className="cursor-pointer mx-2"
    //           onClick={() => setCurrentCustomer({})}
    //         >
    //           x
    //         </button>
    //       </div>
    //     </div>
    //   );
  };

  const renderCustomerField = () => (
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

  const renderAddCustomerPopUp = () => (
    <Portal target={target!} isHidden={portalIsHidden}>
      <CreateCustomerForm setPortalIsHidden={setPortalIsHidden} />
    </Portal>
  );

  return (
    <div className="space-y-2 max-w-xl">
      {/* customer ?  renderCustomerDetails() : renderCustomerField() */}
      {renderCustomerField()}
      {renderAddCustomerPopUp()}
    </div>
  );
};

export default NewOrderForm;
