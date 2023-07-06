import { NodeComponent } from '@/components';
import { ClusterType } from "@/types";
import styles from './cluster.module.scss';

interface ClusterDataComponentType {
	cluster: ClusterType
};

const ClusterDataComponent: React.FC<ClusterDataComponentType> = ({
	cluster
}) => (
	<div className={styles.cluster}>
		{
			cluster.nodes.map(node => <NodeComponent key={node.name} node={node} clusterId={cluster.id} />)
		}
	</div>
);

export default ClusterDataComponent;
