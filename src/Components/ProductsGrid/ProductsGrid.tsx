import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-2 my-2 border border-gray-200 py-2 max-w-xl md:grid-cols-4 rounded">
      <ProductCard title="t-shirt" price={5} id="sku-00" />
      <ProductCard title="pants" price={9.99} id="sku-01" />
      <ProductCard title="sheet" price={9.99} id="sku-02" />
      <ProductCard title="shoes" price={9.99} id="sku-03" />
      <ProductCard title="socks" price={9.99} id="sku-04" />
      <ProductCard title="jackets" price={9.99} id="sku-05" />
      <ProductCard title="shoes" price={9.99} id="sku-03" />
      <ProductCard title="socks" price={9.99} id="sku-04" />
      <ProductCard title="jackets" price={9.99} id="sku-05" />
      <ProductCard title="shoes" price={9.99} id="sku-03" />
      <ProductCard title="socks" price={9.99} id="sku-04" />
      <ProductCard title="jackets" price={9.99} id="sku-05" />
    </div>
  );
};

export default ProductGrid;
