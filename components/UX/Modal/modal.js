import Link from "next/link";

import { motion } from 'framer-motion'

//components
import Backdrop from '../Backdrop/backdrop'

//style
import styles from './Modal.module.scss'


const Modal = ({ setMenuState, menuState, theme, setTheme }) => {

  let modalClasses = [styles.Modal, "bg-white dark:bg-black dark:text-white"]

  const switchTheme = () => {
    // console.log('hi')
    setTheme(theme === "light" ? "dark" : "light");
  };

  let switchStyles = ''

  if (theme === "dark") {
    switchStyles = styles.checked
  }

  return (
    <>
    {menuState && (
      <>
      <motion.div 
        initial={{visibility: 'hidden'}}
        animate={{visibility: 'visible', transition: { delay: 0.2}}}
        exit={{visibility: 'hidden', transition: { delay: 1}}}
        className={styles.ModalWrapper} 
        //onClick={() => setMenuState(!menuState)}
      >
        <motion.div 
          className={modalClasses.join(' ')}
          initial={{ scale: 0 }}
          animate={{scale: 1}}
          exit={{scale: 0}}
          transition={{ delay: 0.2 }}
        >
        
        <Link href="/about">
            <a onClick={() => setMenuState(!menuState)}><h1>About</h1></a>
        </Link>

        <label className={styles.switch}>
         <input 
           type="checkbox" 
           className={switchStyles} 
           onClick={() => {switchTheme()}}
          />
         <span className={styles.slider}></span>
        </label>

        <div className={styles.Legal}>
          <Link href="/about">
            <a onClick={() => setMenuState(!menuState)}><span>Legal</span> </a>
          </Link>
          <Link href="/cocoon">
            <a onClick={() => setMenuState(!menuState)}><span>Cocoon</span> </a>
          </Link>
          <Link href="/syllabus">
            <a onClick={() => setMenuState(!menuState)}><span>Syllabus</span> </a>
          </Link>
        </div>

        </motion.div>
      </motion.div>
      <Backdrop setMenuState={setMenuState} menuState={menuState}></Backdrop>
      </>
    )}
    </>
  )
}

export default Modal
