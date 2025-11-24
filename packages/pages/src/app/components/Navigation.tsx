import { Link, useLocation } from 'react-router-dom';
import './navigation.scss';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: '홈', path: '/' },
  { label: '상담 신청', path: '/consultation' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🎵</span>
          <span className="logo-text">JBeat Pages</span>
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-badge">Development</div>
      </div>
    </nav>
  );
}
