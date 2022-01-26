import Image from "next/image";
import { FC } from "react";
import classes from "./Hero.module.scss";

export interface HeroFigureInterface {
  position: string;
  image: StaticImageData;
  category: string;
  time: string;
  title: string;
}

const HeroFigure: FC<HeroFigureInterface> = (props) => {
  return (
    <figure className={props.position}>
      <div className={classes.image_wrapper}>
        <Image layout="responsive" src={props.image} alt={props.title} />
      </div>
      <span className={classes.category_tag}>{props.category}</span>
      <figcaption className={classes.caption}>
        <time>{props.time}</time>
        <h2 className={classes.title}>{props.title}</h2>
      </figcaption>
    </figure>
  );
};

export default HeroFigure;
