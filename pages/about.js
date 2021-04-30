// import ReactMarkdown from "react-markdown/with-html";
// import { fetchAPI } from "../lib/api";
import Seo from "../components/seo";

import { motion } from 'framer-motion'

//import { motion } from "framer-motion";

import styles from '../styles/about.module.scss'


let easing = [0.6, -0.05, 0.01, 0.99];

// Custom variant
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.4, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing
    }
  }
};

const about = () => {

  const seo = {
    metaTitle: "About",
    metaDescription: "About Trophic Cascade",
  };

  const wrapperClasses = [styles.aboutContainer, "bg-white dark:bg-black dark:text-white"]

  return (
    <>
    <Seo seo={seo} />
    <motion.div className={wrapperClasses.join(' ')} initial='initial' animate='animate' exit={{ opacity: 0 }}>
      <motion.div
        className={styles['about-section']}
        variants={fadeInUp}
      >
        <p>unrequested occasional opinions on the feedback loops between media, tech and culture</p>
        <br></br>
        <p>for now the exteriorised brain of <a href="http://www.jason-andrew.com" target="_blank" style={{color: '#e70000'}}>jason</a> 
        <br></br>
        authorship sucks</p>
        {/* <img src='/logo.svg' alt="Logo"/> */}
      </motion.div>
    </motion.div>
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
