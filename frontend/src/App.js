import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ViewMore from './components/ViewMore';
import AddBooks from './pages/AddBooks';
import Books from './pages/Books';
import Home from './pages/Home';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom"
import UpdateBooks from './pages/UpdateBooks';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route  path='/books' element={<Books/>}/>
        <Route  path='/addBooks' element={<AddBooks/>}/>
        <Route  path='/viewMore/:id' element={<ViewMore/>}/>
        <Route  path='/updateBook/:id' element={<UpdateBooks/>}/>

      </Routes>
      <Footer/>
    </Router>

  );
}

export default App;
