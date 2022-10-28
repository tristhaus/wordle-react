import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom'
import Game from './components/Game'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/:id" element={<Game />} />
                <Route path="/" element={<Game />} />
            </Routes>
        </Router>
    )
}

export default App
