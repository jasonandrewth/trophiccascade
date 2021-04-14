import { useEffect } from "react"

import Articles from "../components/articles/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";

import { fetchAPI } from "../lib/api";

const Home = ({ articles, homepage, articless}) => {

  return (
    <>
      <Seo seo={homepage.seo} />
        <Articles articles={articles}/>
    </>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, homepage] = await Promise.all([
    fetchAPI("/articles?status=published"),
    fetchAPI("/homepage"),
  ])
  .catch(err => {console.log(err)});

  // const articless = await fetch('https://trophic-cascade-backend.herokuapp.com/articles')
  // const homepager = await fetch('https://trophic-cascade-backend.herokuapp.com/articles')
  //const articless = response.json()

  return {
    props: { articles, homepage },
    revalidate: 1,
  };
}

export default Home;
