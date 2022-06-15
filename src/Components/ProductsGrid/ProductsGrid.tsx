import { useState } from "react";
import { categories } from "../../data";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = () => {
  const categoryTitles = Object.values(categories).map((el) => el.name);

  const [activeCat, setActiveCat] = useState<string>(categoryTitles[0]);

  const renderCategories = () => {
    return (
      <div className="md:mt-10 space-x-6 pl-4 mb-4">
        {categoryTitles.map((el, index) => (
          <button key={index} className="">
            <h3
              onClick={() => setActiveCat(el)}
              className={`text-xs tracking-tighter transition duration-150 px-6 py-2 border rounded-2xl ${
                activeCat === el
                  ? `bg-blue-600 text-gray-50`
                  : `text-blue-600 bg-white border-blue-600`
              }`}
            >
              {el}
            </h3>
          </button>
        ))}
      </div>
    );
  };

  const renderGrid = () => {
    const products = Object.values(categories)
      .filter((el) => el.name === activeCat)
      .map((el) => el.products)[0];

    return (
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:p-4 lg:grid-cols-5 m-4 md:mb-0 md:ml-0 sm:w-full">
        {products.map((el, index) => (
          <ProductCard
            title={el.name}
            price={el.price}
            id={el.id}
            icon={el.icon}
            key={index}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="md:mt-4 w-full">
      {renderCategories()}
      {renderGrid()}
    </div>
  );
};

export default ProductGrid;
