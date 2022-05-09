import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = () => {
  return (
    <div className="p-2 grid grid-cols-3 gap-y-2 gap-x-4">
      <ProductCard name="T-shirt" price="9.99" />
      <ProductCard name="T-shirt" price="9.99" />
      <ProductCard name="T-shirt" price="9.99" />
      <ProductCard name="T-shirt" price="9.99" />
      <ProductCard name="T-shirt" price="9.99" />
      <ProductCard name="T-shirt" price="9.99" />
      <ProductCard name="T-shirt" price="9.99" />
      <ProductCard name="T-shirt" price="9.99" />
      <ProductCard name="T-shirt" price="9.99" />
    </div>
  );
};

export default ProductGrid;
