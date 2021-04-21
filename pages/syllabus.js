import React, { useEffect, useState } from "react"

import { fetchAPI } from "lib/api";
import Seo from "../components/seo";

import { motion } from 'framer-motion'

import SyllabusLinks from "../components/SyllabusLinks/syllabusLinks";

import styles from '../styles/syllabus.module.scss'

//custom easing
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

const Links = ({ syllabusLinks, categories }) => {

  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState([]);
  const [filterType, setFilterType] = useState('All');

  const types = {
      All: `All`,
      Politics: 'Politics',
      Technology: 'Technology',
      Culture: 'Culture'
    };

  const seo = {
    metaTitle: 'Syllabus',
    metaDescription: 'A Syllabus of Articles I enjoyed reading and I think are somehow relevant and/or interesting',
  };

  useEffect(() => {

    const filterArray = type => {

    if (filterType === type) {
      // console.log(type)
    }

    const sortProperty = types[type];
    const sorted = [...syllabusLinks].filter(link => {

      if (sortProperty === 'All') {
        return syllabusLinks
      }
      else {
        return link.Category === sortProperty
      }
    });
    // console.log(sorted);
    setData(sorted);

    };
    

    filterArray(filterType)

  }, [filterType])

  let tagStyles = [styles.h2]

  const clickHandler = (e) => {
    setFilterType(e.target.dataset.cat)

    //Very un-react of me
    const actives = document.querySelectorAll('.active')
    actives.forEach(active => {
      active.classList.remove('active')
    })
    e.target.classList.add('active')
    // console.log(e.target)
  }


  const wrapperClasses = [styles.container, "bg-white dark:bg-black dark:text-white"]

  return (
    <>
    <Seo seo={seo} />
    <motion.div className={wrapperClasses.join(' ')} initial='initial' animate='animate' exit={{ opacity: 0 }}>
      <motion.div variants={fadeInUp} className={'content'}>
        
        <h1 className={styles.title}>
        A Collection of Articles I enjoyed reading and I think are somehow relevant and/or interesting.
        </h1>

        <div className={styles.categories}>
          {categories.map((category, idx) => {
            return (
              <h2 
                key={idx}
                className={tagStyles.join(' ')}
                data-cat={category.category}
                onClick={e => clickHandler(e)}
              >
                {category.category}
              </h2>
            );
          })}
        </div>
        
        <SyllabusLinks
          links={data}
        >
        </SyllabusLinks>
      </motion.div>
    </motion.div>
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const syllabusLinkss = await fetchAPI("/syllabus-links");
  const categories = await fetchAPI("/categories");
 
  const syllabusLinks = syllabusLinkss.reverse()
  return {
    props: { syllabusLinks, categories },
    revalidate: 1,
  };
}


export default Links
