import { Link } from 'react-router-dom';
import { ClustersArrayType } from "@/types";
import styles from './cluster_menu.module.scss';

interface ClustersMenuComponentType {
	clustersData: ClustersArrayType;
	current_cluster_id: string;
};

const ClustersMenuComponent: React.FC<ClustersMenuComponentType> = ({
	clustersData,
	current_cluster_id,
}) => (
	<ul className={styles.cluster_menu}>
		{
			clustersData.map(cluster => {
				const linkClassName = (current_cluster_id === cluster.id) ? `${styles.cluster_menu__item__link} ${styles.cluster_menu__item__link_active}` : styles.cluster_menu__item__link;
				return (
					<li
						key={cluster.id}
						className={styles.cluster_menu__item}
					>
						<Link
                            className={linkClassName}
                            to={`/${cluster.id}`}
                        >{cluster.name}</Link>
					</li>
				)
			})
		}
	</ul>
);

export default ClustersMenuComponent;
