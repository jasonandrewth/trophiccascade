import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../pages/_app";

import Modal from "../UX/Modal/Modal";

import styles from './nav.module.scss'
//import search from '../../public/icon-search.svg'


const Nav = ({ setMenuState, menuState, setToggleState, toggleState, theme, setTheme }) => {

  const { siteName, article, Search } = useContext(GlobalContext);
  const toggleMenu = {}

  let menuClasses = [styles.burgerContainer]

  //const [toggleState, setToggleState] = useState(true)

  const menuHandler = () => {
    setMenuState(!menuState)
    //setToggleState(!toggleState)
  }

  menuState ? toggleState = false : toggleState = true

  return (
    <>
      <nav className={styles.navContainer}>

              <Link href="/search">
                
                <a><img src='/icon-search.svg' alt="Search"/></a>
              </Link>

              <Link href="/">
                <a>
                  <h1 className={styles.Logo} onClick={()=>setMenuState(false)}>{siteName}
                  </h1>
                </a>
              </Link>

              

              <div 
                className={toggleState ? menuClasses : [styles.burgerContainer, styles.change].join(' ')} 
                onClick={menuHandler}
              >
                  <div className={styles.bar1}></div>
                  <div className={styles.bar2}></div>
              </div>
        
      </nav>

      <Modal 
      menuState={menuState} 
      setMenuState={setMenuState} 
      theme={theme} 
      setTheme={setTheme}>
    </Modal>

    </>
  );
};

export default Nav;