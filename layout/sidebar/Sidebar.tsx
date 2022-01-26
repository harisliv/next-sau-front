import Image from "next/image";
import { FC } from "react";
import classes from "./Sidebar.module.scss"
import placeholder from "../../assets/placeholder/300x600.png"

const Sidebar: FC = () => {
  return (
    <aside className={classes.sidebar}>
      <Image
        src={placeholder}
        alt="sidebar banner"
      />
    </aside>
  );
};

export default Sidebar
