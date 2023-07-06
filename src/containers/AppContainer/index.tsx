import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	ClustersMenuComponent,
	ClusterDataComponent,
	PreloaderComponent,
	ClientsModalComponent,
} from '@/components';
import {
	useAppSelector,
	useAppDispatch,
} from "@/reduxStore/hooks";
import {
	selectData,
	fetchNodes
} from '@/reduxStore/reducers/clustersReducer';
import { HttpRequestStatus } from '@/types';
import styles from './app_container.module.scss';

const AppContainer: React.FC = () => {
	const dispatch = useAppDispatch();
	/*
		Retrieve state data from the redux
	*/
	const {
		clustersData,
		status,
		activatedNodeModalClients,
	} = useAppSelector(selectData);
	/*
		Retrieve current cluster id from the router
	*/
	const { cluster_id } = useParams();
	const current_cluster_id = (cluster_id && clustersData[cluster_id]) ? cluster_id : Object.keys(clustersData)[0];
	/*
		Initial load of plugins data
	*/
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchNodes(current_cluster_id));
		}
	}, [status, dispatch]);
	const getNodeClients = (nodeName: string) => {
		const nodeKey = clustersData[current_cluster_id].nodes.findIndex(n => n.name === nodeName);
		if (nodeKey > -1) {
			return clustersData[current_cluster_id].nodes[nodeKey].clients;
		}
		return [];
	}
	return (
		<main className={styles.app_container}>
			{
				status === HttpRequestStatus.loading && (
					<PreloaderComponent />
				)
			}
			<div className={styles.app_container__sidebar}>
				<ClustersMenuComponent
					clustersData={clustersData}
					current_cluster_id={current_cluster_id}
				/>
			</div>
			<div className={styles.app_container__content}>
				{
					activatedNodeModalClients && (
						<ClientsModalComponent
							clients={getNodeClients(activatedNodeModalClients)}
						/>
					)
				}
				<ClusterDataComponent
					cluster={clustersData[current_cluster_id]}
				/>
			</div>
		</main>
	)
};

export default AppContainer;
