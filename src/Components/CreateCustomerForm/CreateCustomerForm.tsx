import { useEffect, useRef } from "react";
import { MdClear } from "react-icons/md";
import { useDispatch } from "react-redux";
import useBasket from "../../Context/BasketProvider";
import { useAppDispatch } from "../../Store";
import customerSlice from "../../Store/customerSlice";
import { CustomerInterface } from "../CustomerInterface";

interface Props {
  setPortalIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  allowEdit?: boolean;
  customer?: CustomerInterface;
}
const CreateCustomerForm: React.FC<Props> = ({
  setPortalIsHidden,
  allowEdit,
  customer,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const basket = useBasket();
  const dispatchContext = useDispatch();
  const dispatchRedux = useAppDispatch();

  const {
    actions: { addCustomer, editCustomer },
  } = customerSlice;

  useEffect(() => {
    const populateFields = () => {
      if (!customer) return;

      const { name, phone, email, address } = customer;

      nameRef.current!.value = name;
      phoneRef.current!.value = phone;
      emailRef.current!.value = email;
      addressRef.current!.value = address;
    };

    populateFields();
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { setCurrentCustomer } = basket;

    const customer: CustomerInterface = {
      name: nameRef.current!.value,
      phone: phoneRef.current!.value,
      email: emailRef.current!.value,
      address: addressRef.current!.value,
      orders: [],
    };

    if (setCurrentCustomer) {
      dispatchContext(addCustomer(customer));
      setCurrentCustomer(customer);
    } else {
      dispatchRedux(addCustomer(customer));
    }

    setPortalIsHidden(false);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customer) return;

    const newCustomer: CustomerInterface = {
      name: nameRef.current!.value,
      phone: phoneRef.current!.value,
      email: emailRef.current!.value,
      address: addressRef.current!.value,
      orders: [],
    };

    dispatchRedux(editCustomer({ newCustomer, customer }));
    setPortalIsHidden(false);
  };

  const handleExit = () => setPortalIsHidden(false);

  const renderHeader = () => {
    if (customer) {
      return (
        <div>
          <h3 className="text-xl font-semibold uppercase border-b-2 border-blue-600">
            Update customer information
          </h3>
          <p className="opacity-40 text-xs mb-2 italic">
            Change any of this customers information, and click edit to save.
          </p>
        </div>
      );
    }

    return (
      <div>
        <h3 className="text-xl font-semibold uppercase border-b-4 border-blue-600 w-max mb-2">
          Create a New Customer
        </h3>
        <p className="opacity-40 text-xs mb-2 italic">
          Please enter some personal information about this customer.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white max-w-md md:max-w-xl shadow-md rounded flex relative">
      <form
        className="p-12 space-y-4"
        onSubmit={
          allowEdit
            ? (e: React.FormEvent<HTMLFormElement>) => handleEditSubmit(e)
            : (e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)
        }
      >
        {renderHeader()}
        <div className="grid grid-cols-2 gap-x-2">
          <div className="col-span-2">
            <label>Full Name</label>
            <input placeholder="Ahmed" type="text" ref={nameRef} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div className="">
            <label>E-mail Address</label>
            <input
              placeholder="atomcgarry@hotmail.com"
              type="email"
              ref={emailRef}
            />
          </div>
          <div className="">
            <label>Phone Number</label>
            <input placeholder="07907733824" type="text" ref={phoneRef} />
          </div>
        </div>
        <div>
          <label>Street Address</label>
          <input placeholder="357 Leyland Road" type="text" ref={addressRef} />
        </div>
        <div className="flex w-full justify-end space-x-4">
          <button
            className="border px-6 py-2 rounded font-semibold text-gray-800"
            onClick={handleExit}
          >
            Exit
          </button>
          <button
            className="border px-6 py-2 rounded font-semibold bg-blue-600 text-white hover:bg-blue-500"
            type="submit"
          >
            {allowEdit ? "Edit" : "Save"}
          </button>
        </div>
      </form>
      <div className="absolute top-4 right-4 cursor-pointer opacity-30 hover:opacity-100 transition duration-150">
        <MdClear size={"2rem"} onClick={handleExit} />
      </div>
    </div>
  );
};

export default CreateCustomerForm;
