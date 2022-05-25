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
    <h3 className="flex items-center justify-between text-gray-700">
      Order Summary{" "}
      <span className="block text-xs opacity-60">
        You have {totalQuantity} item(s) in your basket
      </span>
    </h3>
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
        <td className="text-sm text-gray-500">{title}</td>
        <td className="text-sm text-gray-500">x{quantity}</td>
        <td className="text-sm text-gray-500">£{price * quantity}</td>
        <td className="text-sm text-gray-500">
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
      <tr className="font-semibold">
        <td className="text-gray-700">Total Price</td>
        <td className=""></td>
        <td className="text-gray-700">£{totalPrice}</td>
      </tr>
    );
  };

  const renderTable = () => {
    if (!itemsArray.length) {
      return;
    }

    return (
      <table className="table-auto w-full">
        {renderTableHeader()}
        <tbody className="">
          {itemsArray.map(renderOrderRow)}
          {renderTotalForOrder()}
        </tbody>
      </table>
    );
  };

  return (
    <div className="max-w-xl">
      {renderOrderSummary()}
      <div className="my-4 sm:h-[270px] sm:border">{renderTable()}</div>
    </div>
  );
};

export default Basket;
