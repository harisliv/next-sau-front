import { FC, Fragment, lazy, useContext } from "react";
import classes from "./ArticleList.module.scss";
import SingleArticle from "./SingleArticle";
import { useState, useEffect, useCallback } from "react";
import Article from "../../models/Article";
import ContentNav from "../../layout/util/ContentNav";
import { categoriesContext } from "../../context/categoriesContext";
import Placeholder from "../../layout/util/Placeholder";
import Category from "../../models/Category";
import { CategoryProps } from "../../types/types";

interface articleObjectInterface {
  [key: string]: Article[];
}

const ArticleList: FC<CategoryProps> = (props) => {
  let URL: string = "";
  let categoryArr: Category[] = [];

  const [articles, setArticles] = useState<Article[]>([]);

  const context = useContext(categoriesContext);

  const findCategory = context.find((cat) => cat.name === props.categories);
  if (!findCategory) {
    categoryArr = context;
    URL = "http://localhost/api/articles";
  }
  if (findCategory) {
    categoryArr.push(findCategory);
    URL = `http://localhost/api/articles/categories/${categoryArr[0].id}`;
  }

  const fetchArticlesHandler = useCallback(async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const fetchedArticles = data.map((article: Article) => {
        return {
          id: article.id,
          name: article.name,
          description: article.description,
          published: article.published,
          image: article.image,
          category: article.category,
        };
      });
      setArticles(fetchedArticles);
    } catch (error) {
      console.log(error);
    }
  }, [URL]);

  useEffect(() => {
    fetchArticlesHandler();
  }, [fetchArticlesHandler]);

  let articlesObjects: articleObjectInterface = {};

  categoryArr.forEach((category) => {
    const articleArr = articles.filter(
      (article: Article) => article.category.name === category.name
    );
    articlesObjects = { ...articlesObjects, [category.name]: articleArr };
    //category.name => category.id
  });

  let parsedContent;
  parsedContent = Object.keys(articlesObjects).map((category) => {
    return (
      <div key={`${category}`}>
        {categoryArr.length > 1 && <ContentNav title={category} url="/" />}
        <section className={classes.article_grid}>
          {articlesObjects[category].map((article) => (
            <SingleArticle
              key={article.id}
              id={article.id}
              image={article.image}
              categoryName={article.category.name.toUpperCase()}
              category={article.category}
              name={article.name}
              published={article.published}
              description={article.description}
            />
          ))}
        </section>
        <Placeholder />
      </div>
    );
  });

  return <Fragment>{parsedContent}</Fragment>;
};

export default ArticleList;
