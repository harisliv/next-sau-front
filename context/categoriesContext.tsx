import { createContext, FC, useCallback, useEffect, useState } from "react";
import Category from "../models/Category";

export const categoriesContext = createContext<Category[]>([]);

const CategoriesContextProvider: FC = (props) => {
  const [categories, setCategories] = useState([]);
  const fetchCategoriesHandler = useCallback(async () => {
    try {
      const response = await fetch("http://localhost/api/categories");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const fetchedCategories = data.map((category: Category) => {
        return {
          id: category.id,
          name: category.name,
        };
      });
      setCategories(fetchedCategories);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesHandler();
  }, [fetchCategoriesHandler]);

  const contextValue: Category[] = categories;

  return (
    <categoriesContext.Provider value={contextValue}>
      {props.children}
    </categoriesContext.Provider>
  );
};

export default CategoriesContextProvider;
