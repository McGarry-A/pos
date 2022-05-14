import useBasket from "../../Context/BasketProvider";

interface itemInterface {
  id: string;
  title: string;
  quantity: number;
  price: number
}

const Basket = () => {
  const basketContext = useBasket();
  const {
    basket: { items },
  } = basketContext;

  const itemsArray = Object.values(items);
  console.log(itemsArray)

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
    const {id, title, quantity, price} = props;
    
    return (
      <tr key={id}>
        <td>{title}</td>
        <td>{quantity}</td>
        <td>£{price * quantity}</td>
      </tr>
    );
  };

  const renderTotalForOrder = () => {
    const { totalPrice, totalQuantity } = basketContext;

    return (
      <tr className="">
        <td>You have {totalQuantity}(s) items</td>
        <td>£{totalPrice}</td>
      </tr>
    );
  };

  const renderTable = () => {
    if (!itemsArray.length) {
      return <div>0 Items in your basket!</div>;
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
    <div className="border rounded">
      <h3>Order Summary</h3>
      <div className="my-1">
        {renderTable()}
        {renderNote()}
      </div>
    </div>
  );
};

export default Basket;
