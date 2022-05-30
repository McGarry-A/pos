import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useAppDispatch } from "../../Store";
import customerSlice from "../../Store/customerSlice";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import { CustomerInterface } from "../CustomerInterface";
import Portal from "../Portal/Portal";

interface Props {
  customer: CustomerInterface;
}

const CustomerCard: React.FC<Props> = ({ customer }) => {
  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const { name, phone, email, address } = customer;
  const dispatch = useAppDispatch();
  const {
    actions: { deleteCustomer },
  } = customerSlice;

  const handleDeleteCustomer = (customer: CustomerInterface) => {
    dispatch(deleteCustomer(customer));
  };

  const renderEditCustomer = () => {
    return (
      <Portal isHidden={portalIsHidden}>
        <CreateCustomerForm
          allowEdit
          customer={customer}
          setPortalIsHidden={setPortalIsHidden}
        />
      </Portal>
    );
  };

  return (
    <div className="grid grid-cols-2 border p-3 m-3 rounded max-w-lg shadow-sm">
      <div className="grid grid-cols-2 col-span-2 justify-between gap-y-3">
        <div className="text-gray-700 text-lg">{name}</div>
        <button className="py-1 col-span-1 justify-self-end">
          <RiDeleteBack2Line
            size={"1.3rem"}
            className="cursor-pointer"
            onClick={() => handleDeleteCustomer(customer)}
          />
        </button>

        <span className="text-xs opacity-50">{email}</span>
        <div className="text-gray-500 col-span-2">
          <p className="text-sm">{phone}</p>
        </div>
        <div className="flex space-x-2">
          <div className="text-gray-600 text-xs font-light">{address}</div>
        </div>
        <div className="cursor-pointer justify-self-end">
          <FiEdit2
            size={"1.1rem"}
            onClick={() => setPortalIsHidden(!portalIsHidden)}
          />
          {renderEditCustomer()}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
