import { AddItemParams } from "../../Context";
import { useBasket } from "../../Context/BasketProvider";
import { AiOutlineMinusCircle } from "react-icons/ai";
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
      className="flex justify-center flex-col items-center w-36 h-36 rounded-md border cursor-pointer relative shadow-sm hover:shadow-md"
      key={id}
      onClick={() => handleClick()}
      onMouseEnter={() => setShowDecrement(true)}
      onMouseLeave={() => setShowDecrement(false)}
      disabled={addIsDisabled}
    >
      <p className="font-semibold text-gray-700 text-sm uppercase">{title}</p>
      <img src={icon} alt={title} className="my-2" />
      <p className="text-xs opacity-60">£{price}</p>
      {showDecrement && (
        <div
          className="absolute right-2 bottom-1 z-10 p-1 border-l-2"
          onClick={() => removeItem({ id })}
          onMouseEnter={() => setAddIsDisabled(true)}
          onMouseLeave={() => setAddIsDisabled(false)}
        >
          <AiOutlineMinusCircle />
        </div>
      )}
    </button>
  );
};

export default ProductCard;
