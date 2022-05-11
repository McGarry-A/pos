import { useState } from "react";
import { BasketInterface, ItemInterface } from ".";

const Basket = () => {
  const [basket, setBasket] = useState<BasketInterface>({
    items: [
      {
        id: "01",
        title: "Pants",
        quantity: 2,
        price: 4.99,
      },
    ],
    orderNotes: "Here are a few notes for this order",
    totalPrice: 9.98,
    totalQuantity: 2,
  });

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
    const { items } = basket;

    if (items !== null && items.length > 0) {
      return (
        <table className="table-auto w-full">
          {renderTableHeader()}
          <tbody>
            {items!.map(renderOrderRow)}
            {renderTotalForOrder(basket)}
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
