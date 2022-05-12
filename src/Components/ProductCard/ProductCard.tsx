interface Props {
  name: string;
  price: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ProductCard = ({ name, price, handleClick }: Props) => (
  <button
    className="flex justify-center flex-col items-center w-36 h-36 rounded-md border border-gray-200 cursor-pointer"
    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      handleClick(e)
    }
  >
    <p className="font-normal text-gray-700">{name}</p>
    <p className="font-normal text-gray-700">£{price}</p>
  </button>
);

export default ProductCard;
