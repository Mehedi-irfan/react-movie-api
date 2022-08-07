import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import SingleMovie from './Component/SingleMovie';
import Error from './Error.jsx';
import './Component/Style.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='movie/:id' element={<SingleMovie />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
