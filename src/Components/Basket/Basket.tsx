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

  const renderTableHeader = () => (
    <thead>
      <tr className="text-left">
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
  );

  const renderOrderRow = (props: itemInterface) => {
    const { id, title, quantity, price } = props;
    const {
      actions: { clearItem },
    } = basketContext;

    return (
      <tr key={id}>
        <td>{title}</td>
        <td>{quantity}</td>
        <td>£{price * quantity}</td>
        <td className="">
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
        <td className="">Total Price</td>
        <td className=""></td>
        <td className="">£{totalPrice}</td>
      </tr>
    );
  };

  const renderTable = () => {
    if (!itemsArray.length) {
      return (
        <div className="text-center p-2 font-sm opacity-40">
          0 Items in your basket!
        </div>
      );
    }

    return (
      <table className="table-auto w-full">
        {renderTableHeader()}
        <tbody>
          {itemsArray.map(renderOrderRow)}
          {renderTotalForOrder()}
        </tbody>
      </table>
    );
  };

  const renderNote = () => {
    return (
      <input
        type="text"
        placeholder="Order Notes..."
        className="my-1 border-2 block w-full rounded-md h-8"
      />
    );
  };

  return (
    <div className="max-w-xl">
      <h3>
        Order Summary{" "}
        {totalQuantity > 1 && (
          <span className="block text-xs opacity-60 my-1 transition-all">
            You have {totalQuantity} item(s) in your basket
          </span>
        )}
      </h3>
      <div className="my-1">
        {renderTable()}
        {renderNote()}
      </div>
    
    </div>
  );
};

export default Basket;
