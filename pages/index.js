// import { useEffect } from "react"

import Articles from "../components/Articles/articles";
// import Layout from "../components/layout";
import Seo from "../components/seo";

import { fetchAPI } from "../lib/api";

const Home = ({ articles, homepage }) => {
  return (
    <>
      <Seo seo={homepage.seo} />
      <Articles articles={articles} />
    </>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articless, homepage] = await Promise.all([
    fetchAPI("/articles?status=published"),
    fetchAPI("/homepage"),
  ]).catch((err) => {
    console.log(err);
  });

  // const articless = await fetch('https://trophic-cascade-backend.herokuapp.com/articles')
  // const homepager = await fetch('https://trophic-cascade-backend.herokuapp.com/articles')
  //const articless = response.json()
  const articles = [...articless].reverse();

  return {
    props: { articles, homepage },
    revalidate: 10,
  };
}

export default Home;
