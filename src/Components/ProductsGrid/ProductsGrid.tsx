import { useEffect, useState } from "react";
import { categories } from "../../data";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = () => {
  const categoryTitles = Object.values(categories).map((el) => el.name);

  const [activeCat, setActiveCat] = useState<string>(categoryTitles[0]);

  useEffect(() => {
    console.log(activeCat);
  }, [activeCat]);

  const renderCategories = () => {
    return (
      <div className="grid grid-cols-3 border-b-2 border-lime-300 sm:grid-cols-4 sm:gap-10">
        {categoryTitles.map((el, index) => (
          <button key={index} className="">
            <h3
              onClick={() => setActiveCat(el)}
              className={`uppercase text-md ${
                activeCat === el
                  ? `border-b-green-600 border-b-4 bold transition duration-150`
                  : ``
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
      <div className="grid grid-cols-3 gap-2 my-2 py-2 md:grid-cols-4">
        {products.map((el, index) => (
          <ProductCard
            title={el.name}
            price={el.price}
            id={el.id}
            key={index}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="">
      {renderCategories()}
      {renderGrid()}
    </div>
  );
};

export default ProductGrid;
