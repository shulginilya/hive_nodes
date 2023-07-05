import {
	ClustersMenuComponent,
	ClusterDataComponent,
} from '@/components';
import styles from './app_container.module.scss';

const AppContainer: React.FC = () => {
	return (
		<main className={styles.app_container}>
			<div className={styles.app_container__sidebar}>
				<ClustersMenuComponent />
			</div>
			<div className={styles.app_container__content}>
				<ClusterDataComponent />
			</div>
		</main>
	)
};

export default AppContainer;
