import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import addFiles from "./components/addfiles.component";
import Navbar from './components/navbar.component';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import searchFiles from "./components/search.component";
import Advance from './components/advancesearch.component';
import Results from './components/results.component';

function App() {
  return (
    <Router>
      <Navbar />
    
      <div className="container">
      <br/>
      <Route path="/addfiles" exact component={addFiles} />
      <Route path="/" exact component={searchFiles} />
      <Route path = "/advancesearch" exact component={Advance} />
      <Route path = "/results" exact component={Results} />
      </div>

    </Router>
  );
}

export default App;
