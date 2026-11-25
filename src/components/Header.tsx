import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { useTheme } from '../context/ThemeContext';

function Header() {

  const lastSync = useAppSelector(
    (state) => state.tickets.lastSyncedAt
  );

  const [now, setNow] = useState(Date.now());
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="header-brand">
        <div className="brand-icon">🎧</div>

        <div>
          <h1>Support Ticket Desk</h1>
          <p>Help customers. Solve problems. Together.</p>
        </div>
      </div>

      <div className="header-actions">
        <button className="theme-button" type="button" onClick={toggleTheme}>
          {theme === 'light' ? '☾' : '☀'}
        </button>
        <div>
          {lastSync ? (
            <span>
              Last synced {Math.floor((now - new Date(String(lastSync)).getTime()) / 1000)} seconds ago
            </span>
          ) : (
            <span>Never synced</span>
          )}
        </div>
        <div className="user-profile">
          <div className="avatar">AA</div>

          <div className="user-info">
            <strong>Asmaa</strong>
            <span>Support Team</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;