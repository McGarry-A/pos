import useBasket from "../../Context/BasketProvider";
import { BsTrash } from "react-icons/bs";

interface itemInterface {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

const Basket = () => {
  const basketContext = useBasket();
  const {
    basket: { items },
  } = basketContext;

  const itemsArray = Object.values(items);
  const { totalQuantity } = basketContext;

  const renderOrderSummary = () => (
    <>
      <h3 className="flex items-center justify-between text-gray-900">
        Order Summary{" "}
      </h3>
      <span className="block text-xs opacity-30 tracking-tighter">
        You have {totalQuantity} item(s) in your basket
      </span>
    </>
  );

  const renderTableHeader = () => (
    <thead>
      <tr className="text-left">
        <th className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Item
        </th>
        <th className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Quantity
        </th>
        <th className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Price
        </th>
      </tr>
    </thead>
  );

  const renderOrderRow = (props: itemInterface) => {
    const { id, title, quantity, price } = props;
    const {
      actions: { clearItem },
    } = basketContext;

    return (
      <tr key={id} className="">
        <td className="text-sm text-gray-900">{title}</td>
        <td className="text-sm text-gray-900">x{quantity}</td>
        <td className="text-sm text-gray-900">£{price * quantity}</td>
        <td className="text-sm text-gray-900">
          <button onClick={() => clearItem({ id })}>
            <BsTrash />
          </button>
        </td>
      </tr>
    );
  };

  const renderTotalForOrder = () => {
    const { totalPrice } = basketContext;

    return (
      <div className="grid grid-cols-2">
        <p className="text-gray-900 text-sm tracking-tight">Subtotal</p>
        <p className="text-gray-900 text-sm justify-self-end tracking-tight">
          ${totalPrice}
        </p>
        <p className="text-gray-900 text-sm opacity-60 tracking-tight">
          Delivery
        </p>
        <p className="text-gray-900 text-sm opacity-60 justify-self-end tracking-tight">
          ${totalPrice}
        </p>
        <div className="col-span-2 grid grid-cols-2 mt-4 pt-4 border-dashed border-t-4 border-gray-300">
          <p className="text-gray-900">Total Price</p>
          <p className="text-gray-900 justify-self-end">£{totalPrice}</p>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (!itemsArray.length) {
      return;
    }

    return (
      <table className="table-auto w-full">
        {renderTableHeader()}
        <tbody className="">{itemsArray.map(renderOrderRow)}</tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-100 p-6 rounded-lg w-96">
      {renderOrderSummary()}
      <div className="my-4 sm:flex-2 sm:border -border-3 flex-grow bg-white">
        {renderTable()}
      </div>
      {renderTotalForOrder()}
    </div>
  );
};

export default Basket;
