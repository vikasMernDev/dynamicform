import './App.css';
import Add from './components/Add';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import List from './components/List';
import Update from './components/Update';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<List/>}></Route>
          <Route path='/create-user' element={<Add/>}></Route>
          <Route path='/update-user/:id' element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
