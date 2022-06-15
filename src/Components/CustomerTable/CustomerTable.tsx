import { FiEdit2 } from "react-icons/fi";
import { useAppDispatch } from "../../Store";
import customerSlice from "../../Store/customerSlice";
import { CustomerInterface } from "../CustomerInterface";
import { useState } from "react";
import Portal from "../Portal/Portal";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import { MdClear } from "react-icons/md";

interface Props {
  data: CustomerInterface[];
}

const CustomerTable: React.FC<Props> = ({ data }) => {
  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const [activeCustomer, setActiveCustomer] = useState<CustomerInterface>();

  const dispatch = useAppDispatch();

  const {
    actions: { deleteCustomer },
  } = customerSlice;

  const handleDeleteCustomer = (customer: CustomerInterface) => {
    dispatch(deleteCustomer(customer));
  };

  const handleEditCustomer = (currentCustomer: CustomerInterface) => {
    setActiveCustomer(currentCustomer);
    setPortalIsHidden(!portalIsHidden);
  };

  const renderEditCustomer = (customer: CustomerInterface | undefined) => {
    if (customer === undefined) return;
    return (
      <Portal isHidden={portalIsHidden}>
        <CreateCustomerForm
          setPortalIsHidden={setPortalIsHidden}
          allowEdit
          customer={activeCustomer}
        />
      </Portal>
    );
  };

  const renderTableHead = () => {
    return (
      <thead className="w-full">
        <tr className="text-xs uppercase">
          <th className="p-3 text-xs font-medium text-gray-400 tracking-wide text-left">
            Name
          </th>
          <th className="p-3 text-xs font-medium text-gray-400 tracking-wide text-left">
            Phone
          </th>
          <th className="p-3 text-xs font-medium text-gray-400 tracking-wide text-left">
            E-mail
          </th>
          <th className="p-3 text-xs font-medium text-gray-400 tracking-wide text-left">
            Address
          </th>
          <th className="p-3 text-xs font-medium text-gray-400 tracking-wide text-left"></th>
          <th className="p-3 text-xs font-medium text-gray-400 tracking-wide text-left"></th>
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
              className={`h-fit min-h-12 hover:bg-gray-50 my-1 bg-white border ${
                index % 2 !== 0 && `bg-white`
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
                    onClick={() =>
                      handleEditCustomer({
                        name,
                        phone,
                        email,
                        address,
                      } as CustomerInterface)
                    }
                  />
                </button>
              </td>
              <td className="p-3 text-sm text-gray-700">
                <button className="px-4 py-1">
                  <MdClear
                    size={"1.3rem"}
                    onClick={() => {
                      handleDeleteCustomer(customer);
                    }}
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
    <>
      <table className="hidden md:table">
        {renderTableHead()}
        {renderTableBody()}
      </table>
      {renderEditCustomer(activeCustomer)}
    </>
  );
};

export default CustomerTable;
