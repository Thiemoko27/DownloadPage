import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import List from "./Components/File/FIleList"
import FileUpload from "./Components/Upload/Upload"

function App() {

    return (
      <div>
        <Router>
          <Routes>

            <Route path='/list' element={<List />} />
            <Route path='/upload' element={<FileUpload />} />
            <Route path='/' element={<Navigate to='/list' />} />
          
          </Routes>
        </Router>
      </div>
    )
}

export default App
