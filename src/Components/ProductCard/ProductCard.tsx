import { AddItemParams } from "../../Context";
import { useBasket } from "../../Context/BasketProvider";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";

interface Props {
  id: string;
  title: string;
  price: number;
  icon: string;
}
const ProductCard = ({ id, title, price, icon }: Props) => {
  const [showDecrement, setShowDecrement] = useState<boolean>(false);
  const [addIsDisabled, setAddIsDisabled] = useState<boolean>(false);
  const basket = useBasket();

  const {
    actions: { removeItem },
  } = basket;

  const handleClick = () => {
    const {
      actions: { addItem },
    } = basket;

    const myObj: AddItemParams = {
      item: {
        [id]: { id, title, price },
      },
    };

    addItem(myObj);
  };

  return (
    <button
      className="flex justify-center flex-col items-center max-w-xl rounded-md border cursor-pointer relative shadow-sm hover:shadow-md bg-white p-3"
      key={id}
      onClick={() => handleClick()}
      onMouseEnter={() => setShowDecrement(true)}
      onMouseLeave={() => setShowDecrement(false)}
      disabled={addIsDisabled}
    >
      <img src={icon} alt={title} className="my-2" />
      <p className="font-semibold text-gray-900 text-sm">{title}</p>
      <p className="text-xs font-bold text-blue-800">£{price}</p>
      {showDecrement && (
        <div
          className="absolute right-2 top-1 z-10 p-1"
          onClick={() => removeItem({ id })}
          onMouseEnter={() => setAddIsDisabled(true)}
          onMouseLeave={() => setAddIsDisabled(false)}
        >
          <AiOutlineMinus size="0.8rem" />
        </div>
      )}
    </button>
  );
};

export default ProductCard;
