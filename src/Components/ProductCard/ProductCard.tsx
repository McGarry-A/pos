interface Props {
  name: string;
  price: string;
}

const ProductCard = ({ name, price }: Props) => (
  <div className="flex justify-center flex-col items-center w-36 h-36 rounded-md border border-gray-200 cursor-pointer">
    <p className="font-normal text-gray-700">{name}</p>
    <p className="font-normal text-gray-700">£{price}</p>
  </div>
);

export default ProductCard;
