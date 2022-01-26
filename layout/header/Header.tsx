import Image from "next/image";
import Link from "next/link";
import { FC, useContext } from "react";
import { categoriesContext } from "../../context/categoriesContext";
import classes from "./Header.module.scss";
import placeholder from "../../assets/placeholder/300x50.png";

// const items: string[] = ["Economy", "Sports", "Lifestyle"];

const Header: FC = () => {
  const context = useContext(categoriesContext);
  return (
    <header className={classes.header}>
      <nav className={classes.menu}>
        <div className="menu_left">
          <div className={classes.logo}>
            <h4 className={classes.news}>News</h4>
            <h4>Portal</h4>
          </div>
          <ul className={classes.menu_list}>
            <Link href="/">
              <a>FrontPage</a>
            </Link>
            {context.map((item) => (
              <Link href={`/articles/${item.name}`} key={item.id}>
                <a>{item.name}</a>
              </Link>
            ))}
          </ul>
        </div>
        <div className={classes.menu_right}>
          <Image src={placeholder} alt="header_banner" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
