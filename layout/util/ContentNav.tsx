import { FC } from "react";
import classes from "./ConstentNav.module.scss";
import arrowRight from "../../assets/carousel/arrow_right.png";
import Image from "next/image";
import Link from "next/link";

const ContentNav: FC<{ title: string; time?: string; url?: string }> = (
  props
) => {
  let timeClass = "";
  if (props.time) {
    timeClass = classes.time_nav;
  }
  return (
    <nav className={`${classes.content_navigation} ${timeClass}`}>
      <h4>{props.title}</h4>
      {props.time && <time>{props.time}</time>}
      {props.url && (
        <Link href={props.url}>
          <a className={classes.arrow}>
            <Image src={arrowRight} alt="arrow_right" />
          </a>
        </Link>
      )}
    </nav>
  );
};

export default ContentNav;
