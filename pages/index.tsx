import { Fragment } from "react";
import ContentNav from "../layout/util/ContentNav";
import ArticleList from "../components/articles/ArticleList";
import Hero from "../components/hero/Hero";
import { NextPage } from "next";
import Image from "next/image";


const Home: NextPage = () => {
    return (
      <Fragment>
        <ContentNav title="Spotlight" time="Updated 2 min ago" />
        <Hero />
        <ArticleList/>
      </Fragment>
    );
}

export default Home;
