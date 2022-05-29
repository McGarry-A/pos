import { FiEdit2 } from "react-icons/fi";
import { useAppDispatch } from "../../Store";
import { CustomerInterface } from "../CustomerInterface";

interface Props {
  data: CustomerInterface[];
}

const CustomerTable: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const handleEditCustomer = () => {
    console.log("edit me!")
  }

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
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody className="p-4 font-light text-gray-600">
        {data.map((customer, index) => {
          const {
            name,
            address,
            email,
            phone
          } = customer;

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
                <button
                  className="px-4 py-1"
                >
                  <FiEdit2 size={"1.3rem"} onClick={handleEditCustomer}/>
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
