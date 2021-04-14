import React, { useEffect, useState } from "react"
import useHotKey  from '../hooks/hotKey'
// import { AnimateSharedLayout } from "framer-motion";
import { useTheme } from "next-themes"

//Components
import Nav from "./nav/nav";
import Modal from './UX/Modal/modal'

const Layout = ({ children, categories, seo }) => {

  // State of the menu
  const [menuState, setMenuState] = useState(false)

  const [toggleState, setToggleState] = useState(true)


  const konamiPattern = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]

  const [spookyState, setSpookyState] = useState(false)

  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useHotKey(konamiPattern, () => setSpookyState(true));


  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Locking the body from scrolling when menu is opened
  useEffect(() => {
    
    menuState
      ? document.body.classList.add("body-lock")
      : document.body.classList.remove("body-lock")

  }, [menuState])

  useEffect(() => {
    
    spookyState
      ? document.body.classList.add("body-spook")
      : document.body.classList.remove("body-spook")
      
  }, [spookyState])

  return (
  <>
    <Nav 
      menuState={menuState}  
      setMenuState={setMenuState} 
      toggleState={toggleState}  
      setToggleState={setToggleState}
      theme={theme} 
      setTheme={setTheme}
    />
      <div className="main-always bg-white dark:bg-black dark:text-white">
        {children}
      </div>
  </>
  )
};

export default Layout;