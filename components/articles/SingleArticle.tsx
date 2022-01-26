import Image from "next/image";
import { FC } from "react";
import Article from "../../models/Article";


const SingleArticle: FC<Article> = (props) => {
  return (
    <article id={props.id} >
      <figure>
        <img
          src={props.image}
          alt="Oil prices have doubled in a year. Here's why"
        />
        <span>{props.categoryName}</span>
      </figure>
      <h2>{props.name}</h2>
      <time>{props.published}</time>
      <p>{props.description}</p>
    </article>
  );
};

export default SingleArticle;
