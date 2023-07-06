import {
    NodeType,
    NodeState,
} from "@/types";
import {
	useAppSelector,
	useAppDispatch,
} from "@/reduxStore/hooks";
import {
    fetchClients,
    selectData,
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
    const { status } = useAppSelector(selectData);
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
            {
                node.clients?.map(client => {
                    return (
                        <div>{client.clientId}</div>
                    )
                })
            }
        </div>
    )
};

export default NodeComponent;
