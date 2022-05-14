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
  const basket = useBasket();
  
  const {actions: { removeItem }} = basket;

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
      className="flex justify-center flex-col items-center w-32 h-32 rounded-md border border-gray-200 cursor-pointer relative"
      key={id}
      onClick={() => handleClick()}
      onMouseEnter={() => setShowDecrement(true)}
      onMouseLeave={() => setShowDecrement(false)}
    >
      <p className="font-semibold text-lg uppercase">{title}</p>
      <p className="text-xs opacity-60">£{price}</p>
      {showDecrement && (
        <div 
          className="absolute right-2 bottom-2 z-10 p-1 rounded-full border"
          onClick={() => removeItem({ id })}>
          <AiOutlineMinusCircle size={"1.2em"} />
        </div>
      )}
    </button>
  );
};

export default ProductCard;
