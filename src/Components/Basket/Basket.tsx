import useBasket from "../../Context/BasketProvider";
import { MdClear } from "react-icons/md";

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
    actions: { clearBasket },
  } = basketContext;

  const itemsArray = Object.values(items);
  const { totalQuantity } = basketContext;

  const renderOrderSummary = () => (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-900">Order Summary</h3>
        <button
          className="text-xs text-red-600 p-2 hover:border border border-gray-100 hover:border-red-500 transition duration-150"
          onClick={() => clearBasket()}
        >
          Clear Basket
        </button>
      </div>
      <span className="block text-xs text-gray-400 tracking-tighter mt-1">
        You have {totalQuantity} item(s) in your basket
      </span>
    </div>
  );

  const renderTotalForOrder = () => {
    const { totalPrice } = basketContext;

    return (
      <div className="grid grid-cols-2">
        <p className="text-gray-900 text-sm tracking-tight mb-1">Subtotal</p>
        <p className="text-gray-900 text-sm justify-self-end tracking-tight mb-1">
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

  const renderItem = (props: itemInterface) => {
    const { id, title, quantity, price } = props;
    const {
      actions: { clearItem },
    } = basketContext;

    if (!itemsArray.length) return;

    return (
      <div className="flex flex-col space-y-2 w-full p-2" key={id}>
        <div className="flex justify-between items-center">
          <p className="font-semibold">{title}</p>
          <MdClear
            onClick={() => clearItem({ id })}
            className="cursor-pointer opacity-50"
          />
        </div>
        <div className="flex justify-between">
          <p className="text-blue-700 font-bold text-xs">£{price}</p>
          <p className="opacity-40 text-xs">x{quantity}</p>
        </div>
      </div>
    );
  };

  const renderItems = () => {
    return <div>{itemsArray.map(renderItem)}</div>;
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-100 md:p-6 p-4 m-4 md:m-0 md:w-80">
      {renderOrderSummary()}
      <div className="my-4 sm:flex-2 sm:border bg-white flex-grow">
        {renderItems()}
      </div>
      {renderTotalForOrder()}
    </div>
  );
};

export default Basket;
