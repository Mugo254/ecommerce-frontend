import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import axios from "axios";
import axiosInstance from '../../serverUrl';



const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState(["all"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('product/categories/');

        const categories = response.data.results;
        const categoryNames = categories.map(category => category.name); // Extract category names from each object 
        setSelectCategoryList(["all", ...categoryNames]); // Update selectCategoryList state with categories from the endpoint
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue=""
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={selectCategoryList}
        size="select-sm"
        defaultValue="all"
      />

      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={2000}
      />


      {/* BUTTONS */}

      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm"
      >
        SEARCH
      </button>
      <Link to="/shop" className="btn btn-primary btn-sm">
        RESET
      </Link>
    </Form>
  );
};

export default Filters;
