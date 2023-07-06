import { memo } from 'react'
import styles from './preloader.module.scss';

const PreloaderComponent: React.FC = () => (
    <div className={styles.preloader} />
);

export default memo(PreloaderComponent);
