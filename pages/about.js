// import ReactMarkdown from "react-markdown/with-html";
// import { fetchAPI } from "../lib/api";
import Seo from "../components/seo";

import { motion } from 'framer-motion'

//import { motion } from "framer-motion";

import styles from '../styles/about.module.scss'

const about = () => {

  const seo = {
    metaTitle: "About",
    metaDescription: "About Trophic Cascade",
  };

  const wrapperClasses = [styles.aboutContainer, "bg-white dark:bg-black dark:text-white"]

  return (
    <>
    <Seo seo={seo} />
    <div className={wrapperClasses.join(' ')}>
      <motion.div 
        initial={{scale: 0}} 
        animate={{scale: 1}} 
        transition={{ delay: 0.2 }}
        className={styles.aboutContent}>
        <p>information pit</p>
        <p>maintained by <a href="http://www.jason-andrew.com" target="_blank">me </a> but authorship sucks</p>
      </motion.div>
    </div>
    </>
  )
}

// export async function getStaticProps() {
//   // Run API calls in parallel
//   const about = await fetchAPI("/about-page");
 
//   return {
//     props: { about },
//     revalidate: 1,
//   };
// }


export default about
