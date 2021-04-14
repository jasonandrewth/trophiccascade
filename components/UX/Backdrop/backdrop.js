import styles from './Backdrop.module.scss'

const Backdrop = ({ setMenuState, menuState }) => {
  return (
    <div className={styles.Backdrop} onClick={() => setMenuState(!menuState)}>
      
    </div>
  )
}

export default Backdrop
