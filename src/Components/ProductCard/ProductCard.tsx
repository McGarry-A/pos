import { AddItemParams } from "../../Context";
import { useBasket } from "../../Context/BasketProvider";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useState } from "react";

interface Props {
  id: string;
  title: string;
  price: number;
}
const ProductCard = ({ id, title, price }: Props) => {
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
      className="flex justify-center flex-col items-center w-32 h-32 rounded-md border cursor-pointer relative shadow-sm hover:shadow-md"
      key={id}
      onClick={() => handleClick()}
      onMouseEnter={() => setShowDecrement(true)}
      onMouseLeave={() => setShowDecrement(false)}
      disabled={addIsDisabled}
    >
      <p className="font-semibold text-lg uppercase">{title}</p>
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
