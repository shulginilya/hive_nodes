import { NodeComponent } from '@/components';
import { ClusterType } from "@/types";
import styles from './cluster.module.scss';

interface ClusterDataComponentType {
	cluster: ClusterType
};

const ClusterDataComponent: React.FC<ClusterDataComponentType> = ({
	cluster
}) => {
	const clusterInline = {
		'--total': cluster.nodes.length
	};
	if (cluster.nodes.length > 0) {
		return (
			<div
				data-test="cluster"
				className={styles.cluster}
				// @ts-ignore */
				style={clusterInline}
			>
				{
					cluster.nodes.map((node, i) => <NodeComponent key={node.name} node={node} clusterId={cluster.id} i={i} />)
				}
			</div>
		)
	}
	return (
		<div data-test="empty_cluster_msg">cluster is empty</div>
	);
};

export default ClusterDataComponent;
