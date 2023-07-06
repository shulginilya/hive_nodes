import { ClientType } from '@/types';
import {
	useAppDispatch,
} from "@/reduxStore/hooks";
import {
    resetClientsModal
} from '@/reduxStore/reducers/clustersReducer';
import styles from './clients_modal.module.scss';

interface ClientsModalComponentType {
    clients: ClientType[]
};

const ClientsModalComponent: React.FC<ClientsModalComponentType> = ({
    clients
}) => {
    const dispatch = useAppDispatch();
    const closeModal = () => {
        dispatch(resetClientsModal());
    };
    return (
        <div className={styles.clients_modal}>
            <div className={styles.clients_modal__bg} />
            <div className={styles.clients_modal__inner}>
                <label
                    className={styles.clients_modal__close}
                    onClick={closeModal}
                ></label>
                {
                    clients.map(client => {
                        return (
                            <div
                                key={client.clientId}
                                className={styles.clients_modal__client}
                            >
                                {client.clientId}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ClientsModalComponent;
