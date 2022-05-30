import { FiEdit2 } from "react-icons/fi";
import { useAppDispatch } from "../../Store";
import customerSlice from "../../Store/customerSlice";
import { CustomerInterface } from "../CustomerInterface";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useState } from "react";
import Portal from "../Portal/Portal";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";

interface Props {
  data: CustomerInterface[];
}

const CustomerTable: React.FC<Props> = ({ data }) => {
  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    actions: { deleteCustomer },
  } = customerSlice;

  const handleDeleteCustomer = (customer: CustomerInterface) => {
    dispatch(deleteCustomer(customer));
  };

  const renderEditCustomer = (customer: CustomerInterface) => {
    return (
      <Portal isHidden={portalIsHidden}>
        <CreateCustomerForm
          setPortalIsHidden={setPortalIsHidden}
          allowEdit
          customer={customer}
        />
      </Portal>
    );
  };

  const renderTableHead = () => {
    return (
      <thead className="bg-gray-100 border-b-2 border-gray-200">
        <tr className="">
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Name
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Phone
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            E-mail
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Address
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody className="p-4 font-light text-gray-600">
        {data.map((customer, index) => {
          const { name, address, email, phone } = customer;

          return (
            <tr
              key={index}
              className={`h-fit min-h-12 hover:bg-gray-100 ${
                index % 2 !== 0 && `bg-gray-100 hover:bg-gray-200`
              }`}
            >
              <td className="p-3 text-sm text-gray-700">{name}</td>
              <td className="p-3 text-sm text-gray-700">{phone}</td>
              <td className="p-3 text-sm text-gray-700">{email}</td>
              <td className="p-3 text-sm text-gray-700">{address}</td>
              <td className="p-3 text-sm text-gray-700">
                <button className="px-4 py-1">
                  <FiEdit2
                    size={"1.3rem"}
                    onClick={() => setPortalIsHidden(!portalIsHidden)}
                  />
                  {renderEditCustomer(customer)}
                </button>
              </td>
              <td className="p-3 text-sm text-gray-700">
                <button className="px-4 py-1">
                  <RiDeleteBack2Line
                    size={"1.3rem"}
                    onClick={() => handleDeleteCustomer(customer)}
                  />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };
  return (
    <table className="hidden md:block">
      {renderTableHead()}
      {renderTableBody()}
    </table>
  );
};

export default CustomerTable;
