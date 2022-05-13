import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = () => {
  return (
    <div className="2grid grid-cols-3 gap-y-2 gap-x-4 my-2 border border-gray-200 py-2">
      <ProductCard title="pants" price={9.99} id="sku-01" />
      <ProductCard title="sheet" price={9.99} id="sku-02" />
    </div>
  );
};

export default ProductGrid;
