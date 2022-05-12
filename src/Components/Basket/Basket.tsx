import { ItemInterface } from "./BasketInterfaces";
import useBasket from "../../Context/BasketProvider";

const Basket = () => {
  const basketContext = useBasket();

  const renderTableHeader = () => (
    <thead>
      <tr className="text-left">
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
  );

  const renderOrderRow = ({ title, quantity, price }: ItemInterface) => (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>£{quantity * price}</td>
    </tr>
  );

  const renderTotalForOrder = () => {
    const { returnTotalPrice, returnTotalQuantity } = basketContext;

    return (
      <tr className="">
        <td>You have {returnTotalQuantity()}(s) items</td>
        <td>£{returnTotalPrice()}</td>
      </tr>
    );
  };

  const renderTable = () => {
    const {
      basket: { items },
    } = basketContext;

    if (!items) {
      return <div>0 Items in your basket!</div>;
    }

    return (
      <table className="table-auto w-full">
        {renderTableHeader()}
        <tbody>
          {items.map(renderOrderRow)}
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
    <div className="m-2 border p-2 rounded">
      <h3>Order Summary</h3>
      <div className="my-1">
        {renderTable()}
        {renderNote()}
      </div>
    </div>
  );
};

export default Basket;
