import { FC } from "react";
import classes from "./Hero.module.scss";
import heroBig from "../../assets/hero/big_hero.png";
import heroTop from "../../assets/hero/small_top_hero.png";
import heroBottom from "../../assets/hero/small_bottom_hero.png";
import Image from "next/image";
import HeroFigure, { HeroFigureInterface } from "./HeroFigure";

const DUMMY: HeroFigureInterface[] = [
  {
    position: classes.big,
    image: heroBig,
    category: "LIFESTYLE",
    time: "Mon, 13 Feb 2017 12:37:06 EST",
    title:
      "Iceland Tourism mocks metaverse in funny ad, Mark Zuckerberg responds",
  },
  {
    position: classes.top,
    image: heroTop,
    category: "LIFESTYLE",
    time: "Mon, 13 Feb 2017 12:37:06 EST",
    title: "Covid: Huge protests across Europe over new restrictions",
  },
  {
    position: classes.bottom,
    image: heroBottom,
    category: "LIFESTYLE",
    time: "Mon, 13 Feb 2017 12:37:06 EST",
    title: "Peng Shuai: China says tennis star case maliciously hyped up",
  },
];

const Hero: FC = () => {
  return (
    <section className={classes.hero}>
      {DUMMY.map((figure: HeroFigureInterface) => {
        return (
          <HeroFigure
            key={figure.position}
            position={figure.position}
            image={figure.image}
            category={figure.category}
            time={figure.time}
            title={figure.title}
          />
        );
      })}
    </section>
  );
};

export default Hero;
