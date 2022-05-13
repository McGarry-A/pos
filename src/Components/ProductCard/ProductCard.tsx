import { productID } from "../../Context";
import { useBasket } from "../../Context/BasketProvider";

interface Props {
  id: productID;
  title: string;
  price: number;
}

const ProductCard = ({ id, title, price }: Props) => {
  const basket = useBasket();

  const handleClick = (props: Props) => {
    basket.actions.addItem({ item: { ...props } });
  };

  return (
    <button
      className="flex justify-center flex-col items-center w-36 h-36 rounded-md border border-gray-200 cursor-pointer"
      key={id}
      onClick={() => handleClick({ id, title, price })}
    >
      <p className="">{title}</p>
      <p className="">£{price}</p>
    </button>
  );
};

export default ProductCard;
