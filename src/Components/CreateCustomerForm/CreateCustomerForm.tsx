import { useEffect, useRef } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import useBasket from "../../Context/BasketProvider";
import useFormField from "../../Hooks/useFormField";
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
  const nameField = useFormField();
  const emailField = useFormField();
  const phoneNumberField = useFormField();
  const addressField = useFormField();

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

      nameRef.current!.value = customer.name;
      phoneRef.current!.value = customer.phone;
      emailRef.current!.value = customer.email;
      addressRef.current!.value = customer.address;
    };
    populateFields();
  }, [customer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { setCurrentCustomer } = basket;

    const customer: CustomerInterface = {
      name: nameField.value,
      phone: phoneNumberField.value,
      email: emailField.value,
      address: addressField.value,
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
      phone: nameRef.current!.value,
      email: emailRef.current!.value,
      address: addressRef.current!.value,
    };

    dispatchRedux(editCustomer({ newCustomer, customer }));
    setPortalIsHidden(false);
  };

  const handleExit = () => setPortalIsHidden(false);

  const renderHeader = () => {
    if (customer) {
      return (
        <div>
          <h3 className="text-xl font-semibold uppercase">
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
        <h3 className="text-xl font-semibold uppercase">
          Create a New Customer
        </h3>
        <p className="opacity-40 text-xs mb-2 italic">
          Please enter some personal information about this customer.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white max-w-md shadow-md rounded flex relative">
      <form
        className="p-4 space-y-4"
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
            <input
              placeholder="Ahmed"
              type="text"
              {...nameField}
              ref={nameRef}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div className="">
            <label>E-mail Address</label>
            <input
              placeholder="atomcgarry@hotmail.com"
              type="email"
              {...emailField}
              ref={emailRef}
            />
          </div>
          <div className="">
            <label>Phone Number</label>
            <input
              placeholder="07907733824"
              type="text"
              {...phoneNumberField}
              ref={phoneRef}
            />
          </div>
        </div>
        <div>
          <label>Street Address</label>
          <input
            placeholder="357 Leyland Road"
            type="text"
            {...addressField}
            ref={addressRef}
          />
        </div>
        <div className="flex w-full justify-end space-x-4">
          <button
            className="border px-6 py-2 rounded font-semibold"
            onClick={handleExit}
          >
            Exit
          </button>
          <button
            className="border px-6 py-2 rounded font-semibold bg-green-600 text-white"
            type="submit"
          >
            {allowEdit ? "Edit" : "Save"}
          </button>
        </div>
      </form>
      <div className="bg-white absolute -top-3 -left-4 rounded-full cursor-pointer">
        <MdOutlineCancel size={"2rem"} onClick={handleExit} />
      </div>
    </div>
  );
};

export default CreateCustomerForm;
