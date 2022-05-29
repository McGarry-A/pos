import { FiEdit2 } from "react-icons/fi";
import { CustomerInterface } from "../CustomerInterface";

interface Props {
  customer: CustomerInterface;
}

const CustomerCard: React.FC<Props> = ({ customer }) => {
  const { name, phone, email, address } = customer;

  return (
    <div className="grid grid-cols-2 border p-3 m-3 rounded max-w-lg shadow-sm">
      <div className="grid grid-cols-2 col-span-2 justify-between gap-y-3">
        <div className="text-gray-700 text-lg col-span-2">{name}</div>
        <span className="text-xs opacity-50">{email}</span>
        <div className="text-gray-500 col-span-2">
          <p className="text-sm">{phone}</p>
        </div>
        <div className="flex space-x-2">
          <div className="text-gray-600 text-xs font-light">{address}</div>
        </div>
        <div className="cursor-pointer justify-self-end">
          <FiEdit2 />
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
