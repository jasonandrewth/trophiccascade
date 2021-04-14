import React, { useState, useRef, useEffect } from "react"
import { motion } from 'framer-motion'

//components
import Card from "../Card/card";

//styles
import styles from './articles.module.scss'

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const Articles = ({ articles}) => {

  //const { x, y } = useMousePosition()

  //console.log('hi')

  useEffect(() => {
    console.log('rendered')
  }, [])
  

  return (
    <motion.div 
    initial='initial'
    animate='animate'
    exit={{opacity: 0}}
    style={{borderTop: '2px solid #e70000'}} 
    >
        <motion.div variants={stagger} className={styles.List}>
          {articles.map((article, id) => {
            return (
              <Card 
                article={article}
                key={article.slug}
              />
            );
          })}
        </motion.div>
    </motion.div>
  );
};

export default Articles;