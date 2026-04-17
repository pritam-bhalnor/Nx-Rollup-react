import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

export interface RouteConfig {
  path: string;
  name: string;
  element: any;
}

export interface SidebarProps {
  routes: RouteConfig[];
}

export function Sidebar({ routes }: SidebarProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Menu</h2>
      <ul className={styles.nav}>
        {routes.map((route) => (
          <li key={route.path} className={styles.navItem}>
            <Link to={route.path} className={styles.link}>
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
