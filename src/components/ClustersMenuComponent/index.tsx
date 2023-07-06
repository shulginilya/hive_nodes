import { Link } from 'react-router-dom';
import { ClusterObjectsType } from "@/types";
import styles from './cluster_menu.module.scss';

interface ClustersMenuComponentType {
	clustersData: ClusterObjectsType;
	current_cluster_id: string;
};

const ClustersMenuComponent: React.FC<ClustersMenuComponentType> = ({
	clustersData,
	current_cluster_id,
}) => (
	<ul className={styles.cluster_menu}>
		{
			Object.keys(clustersData).map(clusterId => {
				const linkClassName = (current_cluster_id === clusterId) ? `${styles.cluster_menu__item__link} ${styles.cluster_menu__item__link_active}` : styles.cluster_menu__item__link;
				return (
					<li
						key={clusterId}
						className={styles.cluster_menu__item}
					>
						<Link
                            className={linkClassName}
                            to={`/${clusterId}`}
                        >{clustersData[clusterId].name}</Link>
					</li>
				)
			})
		}
	</ul>
);

export default ClustersMenuComponent;
