import { ClusterType } from "@/types";
import styles from './cluster.module.scss';

interface ClusterDataComponentType {
	cluster: ClusterType
};

const ClusterDataComponent: React.FC<ClusterDataComponentType> = ({
	cluster
}) => {
	console.log('cluster: ', cluster);
	return (
		<div className={styles.cluster}>
			cluster data placeholder
		</div>
	)
};

export default ClusterDataComponent;
