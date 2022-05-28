import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import useBasket from "../../Context/BasketProvider";
import useFormField from "../../Hooks/useFormField";
import { useAppDispatch } from "../../Store";
import customerSlice from "../../Store/customerSlice";
import { CustomerInterface } from "../CustomerInterface";

interface Props {
  setPortalIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateCustomerForm: React.FC<Props> = ({ setPortalIsHidden }) => {
  const nameField = useFormField();
  const emailField = useFormField();
  const phoneNumberField = useFormField();
  const addressField = useFormField();

  const basket = useBasket();
  const dispatchContext = useDispatch();
  const dispatchRedux = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { setCurrentCustomer } = basket;
    
    const {
      actions: { addCustomer },
    } = customerSlice;

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

  const handleExit = () => setPortalIsHidden(false);

  return (
    <div className="bg-white max-w-md shadow-md rounded flex relative">
      <form
        className="p-4 space-y-4"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <div>
          <h3 className="text-xl font-semibold uppercase">
            Create a New Customer
          </h3>
          <p className="opacity-40 text-xs mb-2 italic">
            Please enter some personal information about this customer.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div className="col-span-2">
            <label>Full Name</label>
            <input placeholder="Ahmed" type="text" {...nameField} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div className="">
            <label>E-mail Address</label>
            <input
              placeholder="atomcgarry@hotmail.com"
              type="email"
              {...emailField}
            />
          </div>
          <div className="">
            <label>Phone Number</label>
            <input
              placeholder="07907733824"
              type="text"
              {...phoneNumberField}
            />
          </div>
        </div>
        <div>
          <label>Street Address</label>
          <input placeholder="357 Leyland Road" type="text" {...addressField} />
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
            Save
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
