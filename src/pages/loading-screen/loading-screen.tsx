import styles from './loading-screen.module.css';

function LoadingScreen():JSX.Element {
  return (
    <div className={styles['pos-center']}>
      <div className={styles['loader']}></div>
    </div>
  );
}

export default LoadingScreen;
