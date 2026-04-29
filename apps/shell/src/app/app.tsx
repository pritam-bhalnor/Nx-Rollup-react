import { Route, Routes } from 'react-router-dom';
import { Sidebar } from 'ui';
import { testRoutes } from 'test';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'locale-react';
import styles from './app.module.css';

export function App() {
  const { t } = useTranslation('common');
  const { changeLanguage } = useChangeLanguage();
  return (
    <div className={styles.appContainer}>
      <Sidebar routes={testRoutes} />
      <main className={styles.mainContent}>
        <Routes>
          <Route
            path="/"
            element={
              <div className={styles.welcomeInfo}>
                <h1>{t('welcome')}</h1>
                <p>Select an item from the sidebar to view.</p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => changeLanguage('en-IN')}>English</button>
                  <button onClick={() => changeLanguage('hn-IN')}>Hindi</button>
                  <button onClick={() => changeLanguage('mr-IN')}>Marathi</button>
                </div>
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
