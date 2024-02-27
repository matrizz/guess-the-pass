import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Game } from './pages/Game'
import { NotFound } from './pages/NotFound'
import { Admin } from './pages/Admin'
import './index.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/private" element={<Admin />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
