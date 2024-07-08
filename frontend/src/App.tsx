import { Routes, Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ProdukCard from './features/produkcard'
import { useEffect } from 'react'

function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    })
}, [pathname])

  return (
    <div className="app">
        <Routes>
             <Route path="/" element={<ProdukCard/>} />
        </Routes>
    </div>
  )
}

export default App


