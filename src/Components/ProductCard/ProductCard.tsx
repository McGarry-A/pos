interface Props {
  name: string;
  price: string;
}

const ProductCard = ({ name, price }: Props) => (
  <button
    className="flex justify-center flex-col items-center w-36 h-36 rounded-md border border-gray-200 cursor-pointer"
  >
    <p className="">{name}</p>
    <p className="">£{price}</p>
  </button>
);

export default ProductCard;
