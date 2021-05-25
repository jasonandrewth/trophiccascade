import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
// import Card from "components/Card/Card";
import Vis from "../../components/WebGL/WebGL";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";

// import Image from 'next/image'

import { motion } from "framer-motion";

import styles from "./single.module.scss";

//const easing = [.1, .1, .01, 0.99]

const Article = ({ article, randomOne }) => {
  //console.log(randomOne)
  //randomOne = null

  const imageUrl = getStrapiMedia(article.image);

  //const nextImageUrl = getStrapiMedia(randomOne.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  let cards = () => {
    if (randomOne) {
      return (
        // <>
        /* <Card 
        article={randomOne}
        key={randomOne.slug}
        /> */
        <Vis article={randomOne} key={randomOne.slug} />
        // </>
      );
    } else {
      return;
    }
  };

  return (
    <>
      <Seo seo={seo} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin dark:text-white"
          data-src={imageUrl}
          data-srcset={imageUrl}
          data-uk-img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        ></motion.div>
        <div className="uk-section singlecontent">
          <div className="uk-container uk-container-small text-black dark:text-white">
            <section className={styles["title-section"]}>
              <h1 className={styles.title}>{article.title}</h1>
              <p className="uk-margin-remove-top text-center">
                <Moment format="MMM Do YYYY">{article.publishedAt}</Moment>
              </p>
            </section>
            <section className={styles.content}>
              <ReactMarkdown source={article.content} escapeHtml={false} />
            </section>
          </div>
        </div>
      </motion.div>

      {cards()}
    </>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");
  // const articles = [...articless].reverse()

  return {
    fallback: "blocking",
    paths: articles.map((article) => ({
      params: { slug: article.slug },
    })),
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}&status=published`
  );

  const articless = await fetchAPI("/articles");
  const articlesall = [...articless].reverse();

  let newarticles = articlesall;

  newarticles = newarticles.filter((currentChar) => {
    return currentChar.slug !== params.slug;
  });

  const randomOne = newarticles[Math.floor(Math.random() * newarticles.length)];

  return {
    props: {
      article: articles[0],
      articles: newarticles,
      randomOne: randomOne,
    },
    revalidate: 1,
  };
}

export default Article;
