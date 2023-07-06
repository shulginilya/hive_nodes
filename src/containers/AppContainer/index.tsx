import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	ClustersMenuComponent,
	ClusterDataComponent,
} from '@/components';
import {
	useAppSelector,
	useAppDispatch,
} from "@/reduxStore/hooks";
import {
	selectData,
	fetchNodes
} from '@/reduxStore/reducers/clustersReducer';
import styles from './app_container.module.scss';

const AppContainer: React.FC = () => {
	const dispatch = useAppDispatch();
	/*
		Retrieve state data from the redux
	*/
	const {
		clustersData,
		status,
	} = useAppSelector(selectData);
	/*
		Retrieve current cluster id from the router
	*/
	const { cluster_id } = useParams();
	const clusterKey = clustersData.findIndex(cluster => cluster.id === cluster_id);
	const current_cluster_id = (cluster_id && clusterKey > -1) ? cluster_id : clustersData[0].id;
	/*
		Initial load of plugins data
	*/
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchNodes(current_cluster_id));
		}
	}, [status, dispatch]);
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
