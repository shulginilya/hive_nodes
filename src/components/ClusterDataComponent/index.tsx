import { ClustersArrayType } from "@/types";
import styles from './cluster.module.scss';

interface ClusterDataComponentType {
	clustersData: ClustersArrayType
};

const ClusterDataComponent: React.FC<ClusterDataComponentType> = ({
	clustersData
}) => {
	console.log('clustersData data: ', clustersData);
	return (
		<div className={styles.cluster}>
			cluster data placeholder
		</div>
	)
};

export default ClusterDataComponent;
