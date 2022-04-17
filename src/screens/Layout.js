import '../App.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <main>
        <h1>The Short List</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;