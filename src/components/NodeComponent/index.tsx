import {
    NodeType,
    NodeState,
} from "@/types";
import {
	useAppDispatch,
} from "@/reduxStore/hooks";
import {
    fetchClients
} from '@/reduxStore/reducers/clustersReducer';
import styles from './node.module.scss';

interface NodeComponentType {
	node: NodeType,
    clusterId: string;
    i: number;
};

const NodeComponent: React.FC<NodeComponentType> = ({
	node,
    clusterId,
    i,
}) => {
    const dispatch = useAppDispatch();
    const loadClients = () => {
        dispatch(fetchClients({
            clusterId,
            nodeName: node.name
        }));
    };
    const inlineStyleNode: any = {
        '--i': i++
    };
    if (node.state === NodeState.running) {
        inlineStyleNode['backgroundColor'] = '#5BC88D';
    } else if (node.state === NodeState.error) {
        inlineStyleNode['backgroundColor'] = '#C63040';
    }
    return (
        <div
            className={styles.node}
            onClick={loadClients}
            // @ts-ignore */
            style={inlineStyleNode}
        >
            {node.name}
            <button
                className={styles.node__cta}
            >clients</button>
            <div className={styles.node__popover}>
                {
                    Object.keys(node.metrics).map((metricKey) => (
                        // @ts-ignore
                        <p key={metricKey} className={styles.node__popover__msg}>{`${metricKey}: ${node.metrics[metricKey]}`}</p>
                    ))
                }
            </div>
        </div>
    )
};

export default NodeComponent;
