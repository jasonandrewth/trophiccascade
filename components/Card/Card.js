import Link from "next/link";
import { motion } from 'framer-motion'

import styles from './Card.module.scss'
//import Image from 'next/image'


const easing = [.6, -.05, .01, 0.99]

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },

  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .6,
      ease: easing
    }
  },

  exit: {
    opacity: 0
  }
}


const Card = ({ article }) => {

  //console.log('card')

  return (
    <Link as={`/post/${article.slug}`} href="/post/[id]">
      <a className="uk-link-reset">
        <motion.div 
          variants={fadeInUp} 
          className={styles.Card}>

          <div className={styles.CardBody}>
            
            <h1 className={styles.title}>
              {article.title}
            </h1>
            <p className="uk-text-large">
              {article.description}
            </p>

            
          </div>

          <motion.div className={styles.Arrow} >
            <p>{'>'}</p>
          </motion.div>
        </motion.div>
      </a>
    </Link>
  );
};

export default Card;
