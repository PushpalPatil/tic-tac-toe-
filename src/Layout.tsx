import { Outlet } from 'react-router'
import './App.css'

function Layout() {
  return(
    <div className='min-h-screen bg-cream flex flex-col items-center justify-center p-8'>
      <h1 className='text-5xl font-extrabold mb-8 text-center tracking-tight'>
        <span className='text-matcha-dark'>Tic</span>
        <span className='text-strawberry'>Tac</span>
        <span className='text-matcha-dark'>Toe</span>
      </h1>

      <Outlet />
    </div>
  )
}

export default Layout
