import { BasketInterface, ItemInterface } from ".";
import useBasket from "../../Context/BasketProvider";

const Basket = () => {

  const basket = useBasket();

  const renderOrderRow = ({ title, quantity, price }: ItemInterface) => {
    return (
      <tr>
        <td>{title}</td>
        <td>{quantity}</td>
        <td>£{price}</td>
      </tr>
    );
  };

  const renderTotalForOrder = ({
    totalPrice,
    totalQuantity,
  }: BasketInterface) => {
    return (
      <tr className="">
        <td>You have {totalQuantity}(s) items</td>
        <td>£{totalPrice}</td>
      </tr>
    );
  };

  const renderTableHeader = () => (
    <thead>
      <tr className="text-left">
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
  );

  const renderTable = () => {
    
    const { basketContext } = basket;
    const { items } = basketContext

    if (items !== null && items.length > 0) {
      return (
        <table className="table-auto w-full">
          {renderTableHeader()}
          <tbody>
            {items!.map(renderOrderRow)}
            {renderTotalForOrder(basketContext)}
          </tbody>
        </table>
      );
    }

    return <div>0 Items in your basket!</div>;
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
