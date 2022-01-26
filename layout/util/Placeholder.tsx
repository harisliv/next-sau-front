import Image from "next/image";
import { FC } from "react";
import placeholder from "../../assets/article/4284f3.png";
import classes from "./Placeholder.module.scss";

const Placeholder: FC = () => {
  return (
    <div className={classes.placeholder}>
      <Image
        src={placeholder}
        alt="placeholder"
      />
    </div>
  );
};

export default Placeholder;
