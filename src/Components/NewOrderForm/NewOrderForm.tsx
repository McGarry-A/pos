import { AiOutlinePlus } from "react-icons/ai";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import React, { useState } from "react";
import Portal from "../Portal/Portal";

const NewOrderForm = () => {
  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const target = document.getElementById("root");
  return (
    <div className="space-y-2 max-w-xl">
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
      <Portal target={target!} isHidden={portalIsHidden}>
        <CreateCustomerForm />
      </Portal>
    </div>
  );
};

export default NewOrderForm;
