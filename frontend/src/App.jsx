import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from './pages/Events';
import Add from './pages/Add';
import Home from './pages/Home';
import Update from './pages/Update';
import "./style.css"


function App() {

  return (
    <div className='App'>
      <div className="App-bg"></div>
      <div className="container">
      <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Events />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App