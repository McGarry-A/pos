import { useState } from "react";

interface ItemInterface {
  item: string,
  quanity: number,
  price: string
}

const Basket = () => {
  const [basket, setBasket] = useState(null);

  const renderOrderRow = ({item, quanity, price}: ItemInterface) => {
    return (
      <tr>
        <td>{item}</td>
        <td>{quanity}</td>
        <td>{price}</td>
      </tr>
    )
  }

  const renderTotalForOrder = () => {
    return (
      <tr className="">
        <td>total</td>
        <td>$99.99</td>
      </tr>
    )
  }

  return (
    <div className="m-2 border p-2 rounded">
      <h3>Order Summary</h3>
      <div className="my-1">
        {basket ? (
          <div>0 Items in your basket!</div>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left">
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>T-shirt</td>
                <td>2</td>
                <td>£9.99</td>
              </tr>
              {renderTotalForOrder()}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Basket;
