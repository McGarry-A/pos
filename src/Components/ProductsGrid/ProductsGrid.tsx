import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = () => {
  const handleClick = () => {};

  return (
    <div className="2grid grid-cols-3 gap-y-2 gap-x-4 my-2 border border-gray-200 py-2">
      <ProductCard name="T-shirt" price="9.99" />
    </div>
  );
};

export default ProductGrid;
