import { fetchAPI } from "lib/api";
import lunr from 'lunr'
import Card from "components/card/card";
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import styles from '../styles/search.module.scss'


const ReactSearchLunr = ({articles}) => {

  
  const index = lunr(function() {
      this.field('title', {boost: 10});
      this.field('abstract', {boost: 5});
      this.field('content');
      this.ref('slug');
      articles.forEach(article => this.add({
        slug: article.slug,
        title: article.title,
        abstract: article.description,
        content: article.content
      }))
  })
 

  const [filter, setFilter] = useState('')

  const [results, setResults] = useState([])

  const [searching, setSearching] = useState(true)


  
  const getSearchResults = (query) => {
    if (!query) return []
    const results = index.search(query)
    return results.map(({ ref, ...rest }) => ({
      ref,
      item: articles.find(m => m.slug === ref),
      ...rest
    }))
  }

  let classes = [styles.searchTop]
  
  const handleChange = event => {
    setSearching(false)
    const filter = event.target.value || ''
    const results = getSearchResults(filter + '*') // attach each item
    setFilter(filter)
    setResults(results)
    //console.log(results)
  }

  let searchFormClasses = [styles.searchForm, "bg-white dark:bg-black dark:text-black"]

    return (
      <>
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        exit={{opacity: 0}}
      >
       <motion.section 
        initial={{ left: -50 + '%' }}
        animate={{ left: 50 + '%' }}
        transition={{ delay: 0.2 }}
        className={searching ? styles.searchTop : [styles.searchTop, styles.searching].join(' ')}
       >
         <h1>Search</h1>
         <div className={searchFormClasses.join(' ')}>
           <input className={styles.searchInput} onChange={handleChange} value={filter} />
         </div>
        </motion.section>
       <div style={!searching ? {borderTop: '2px solid #e70000'} : {borderTop: 'none'}} >
       {results.map(result => (
          <div key={result.ref}>
            <Card 
              article={result.item}
            ></Card>
          </div>
        ))}
        </div>
      </motion.div>
    </>
      
    )
}

export async function getStaticProps() {
  // Run API call
  const articles = await fetchAPI("/articles?status=published");
 
  return {
    props: { articles },
    revalidate: 1,
  };
}

export default ReactSearchLunr