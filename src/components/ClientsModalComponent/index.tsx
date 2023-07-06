import { NodeType } from '@/types';
import {
	useAppDispatch,
} from "@/reduxStore/hooks";
import {
    resetClientsModal
} from '@/reduxStore/reducers/clustersReducer';
import styles from './clients_modal.module.scss';

interface ClientsModalComponentType {
    node: NodeType | null
};

const ClientsModalComponent: React.FC<ClientsModalComponentType> = ({
    node
}) => {
    const dispatch = useAppDispatch();
    const closeModal = () => {
        dispatch(resetClientsModal());
    };
    if (node) {
        return (
            <div className={styles.clients_modal}>
                <div className={styles.clients_modal__bg} />
                <div className={styles.clients_modal__inner}>
                    <label
                        className={styles.clients_modal__close}
                        onClick={closeModal}
                    ></label>
                    <p className={styles.clients_modal__title}>Clients of node: {node.name}</p>
                    <div className={styles.clients}>
                        {
                            node.clients.map(client => {
                                return (
                                    <div
                                        key={client.clientId}
                                        className={styles.clients__client}
                                    >
                                        {client.clientId}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    return null;
};

export default ClientsModalComponent;
