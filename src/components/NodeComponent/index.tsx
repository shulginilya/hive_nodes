import { NodeType } from "@/types";
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
};

const NodeComponent: React.FC<NodeComponentType> = ({
	node,
    clusterId,
}) => {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(selectData);
    const loadClients = () => {
        dispatch(fetchClients({
            clusterId,
            nodeName: node.name
        }));
    };
    console.log('node: ', node);
    return (
        <div
            className={styles.node}
            onClick={loadClients}
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
