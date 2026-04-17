import { Route, Routes } from 'react-router-dom';
import { Sidebar } from 'ui';
import { testRoutes } from 'test';
import styles from './app.module.css';

export function App() {
  return (
    <div className={styles.appContainer}>
      <Sidebar routes={testRoutes} />
      <main className={styles.mainContent}>
        <Routes>
          <Route
            path="/"
            element={
              <div className={styles.welcomeInfo}>
                <h1>Welcome to framework-demo!</h1>
                <p>Select an item from the sidebar to view.</p>
              </div>
            }
          />
          {testRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export default App;
