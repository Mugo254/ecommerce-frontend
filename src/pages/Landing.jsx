import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData } from "react-router-dom";

import axiosInstance from '../../serverUrl';

export const landingLoader = async () => {

  const response = await axiosInstance.get(
    'product/products/'
    
  );
  const data = response.data;


  return { products: data.products };
};

const Landing = () => {
  const { products } = useLoaderData();

  return (
    <main>
      <Hero />
      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductElement
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.images[0].image}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
