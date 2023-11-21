import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';

function Layout() {
  return (
    <div className="page">
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile/betrybe">Profile</NavLink>
      </nav>

      <main><Outlet /></main>
    </div>
  );
}

export default Layout;
