import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom"; //package for routing and linking of components

//importing the needed classes from the components folder for routing
import addFiles from "./components/addfiles.component";
import Navbar from './components/navbar.component';
import "react-datepicker/dist/react-datepicker.css";
import searchFiles from "./components/search.component";
import Saved from './components/savedsearches.component';
import Save from './components/save.component';
import FileUpload from './components/fileupload.component';
import Footer from './components/footer.component';
import Author from './components/authorsearch.component';

//defines the view of the web page and its components
function App() {
  return (
    <Router>
      <Navbar />
    
      <div className="container">
      <br/>
      <Route path="/addfiles" exact component={addFiles} />
      <Route path="/" exact component={searchFiles} />
      <Route path = "/advancesearch" exact component={Author} />
      <Route path = "/savedsearches" exact component={Saved} />
      <Route path = "/savesearch" exact component={Save} />
      <Route path = "/fileupload" exact component={FileUpload} />
      </div>
      <Footer />

    </Router>
  );
}

export default App;
