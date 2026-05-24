import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="page fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
