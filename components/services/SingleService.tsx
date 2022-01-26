import Link from "next/link";
import { FC } from "react";
import Service from "../../models/Service";
import classes from "./Services.module.scss";

const SingleService: FC<Service> = (props) => {
  return (
    <article className={classes.service_grid__item}>
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <span>{props.price}</span>
      <Link href={`/${props.id}`}>
        <a>Subscribe</a>
      </Link>
    </article>
  );
};

export default SingleService;


