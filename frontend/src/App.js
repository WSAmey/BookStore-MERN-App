import './App.css';
import ViewMore from './components/ViewMore';
import AddBooks from './pages/AddBooks';
import Books from './pages/Books';
import Home from './pages/Home';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom"
import UpdateBooks from './pages/UpdateBooks';
import Login from './pages/Login';
import Adminpanel from './pages/Adminpanel';
import BooksIndex from './pages/BooksIndex';
import ViewMoreIndex from './components/ViewMoreIndex';
import ContactUs from './pages/ContactUs';
import ContactInquiries from './pages/ContactInquiries';
import UpdateContact from './pages/UpdateContact';
import BookStock from './pages/BookStock';
import UpdateStock from './pages/UpdateStock';
import AddCategory from './pages/AddCategory';
import Category from './pages/Category';
import UpdateCategory from './pages/UpdateCategory';

function App() {

  return (
    <>
    <Router>

    {/* <Navbar/> */}
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route  path='/books' element={<Books/>}/>
        <Route  path='/addBooks' element={<AddBooks/>}/>
        <Route  path='/viewMore/:id' element={<ViewMore/>}/>
        <Route  path='/viewMoreIndex/:id' element={<ViewMoreIndex/>}/>
        <Route  path='/updateBook/:id' element={<UpdateBooks/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/adminPanel' element={<Adminpanel/>}/>
        <Route  path='/booksIndex' element={<BooksIndex/>}/>
        <Route path='/contactus' element={<ContactUs/>}/> 
        <Route path='/contactinquiry' element={<ContactInquiries/>}/>
        <Route path='/updateContact/:id' element={<UpdateContact/>}/>     
        <Route path='/bookStock/:stock' element={<BookStock/>}/>
        <Route path='/updateStock/:id/:stock' element={<UpdateStock/>}/>
        <Route path='/category' element={<Category/>}/> 
        <Route path='/addCategory' element={<AddCategory/>}/>
        <Route path='/updateCategory/:id' element={<UpdateCategory/>}/> 
        



        
      </Routes>
      {/* <Footer/> */}

    </Router>
    </>
  );
}

export default App;
