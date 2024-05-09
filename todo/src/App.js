import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import Context from './components/Context';
import Home from './components/Home';
import Register from './components/Register';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        
          <Routes>
            <Route path='/users/signin' element={<Context><SignIn /></Context>} />
            <Route path='/todo-home/:username' element={<Context><Home /></Context>} />
            <Route path='/users/register' element={<Context><Register /></Context>} />
          </Routes>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
