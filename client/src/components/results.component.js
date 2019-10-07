import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from 'axios';
import React, { Component, useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class Results extends Component {

  constructor(props) {

    super(props);
    console.log(this.props.location.state)
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.ontoggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      start:this.props.location.state.start || '',
      end: this.props.location.state.end || '',
      query: this.props.location.state,
      articles: [],
      description: this.props.location.state.description || '',
      results: [],
      toggle: true,
      showSearch: false
    }

  }

  componentWillMount() {
    let authorName = '';
    let fromDate = '';
    let toDate = '';
    if(this.state.query){
      if(this.state.query.description) {
        authorName = this.state.query.description.toLowerCase() || null;
      }
      else if (this.state.query.start && this.state.query.end ) {
        fromDate = this.state.query.start
        toDate = this.state.query.end
      }
    }
    // let authorName = this.state.query.description || null;
    axios.get(`http://localhost:5000/articles/search?&author=${authorName}&fromDate=${fromDate}&toDate=${toDate}`)
      .then(response => {
        console.log(response.data)
        if (response.data && response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++ ){
            let dateConversion = response.data[i].date
            console.log(dateConversion)
           response.data[i].date = new Date(dateConversion).toISOString().split('T')[0];
          }
          this.setState({ articles: response.data })
        } else {
          this.setState({articels: ''})
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }


toggle = () => {
  console.log('print me' + this.state.showSearch)
  const { showSearch } = this.state;
  this.setState({
    showSearch: !showSearch
  })
}


onChangeDescription(e) {
  this.setState({
    description: e.target.value
  })
}

onChangeEnd(date) {
  this.setState({
    end: date
  })
}


onSubmit(e) {
  e.preventDefault();
}

    // componentDidMount() {
    //     axios.get('http://localhost:5000/articles/')
    //       .then(response => {
    //         this.setState({ articles: response.data })
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       })
    //   }

      
  render() {
    const { articles } = this.state;
    return (
      <div>
         <h1>Search Results</h1>
         
        <div>
        <form onSubmit={this.onSubmit}>
          
          <input type="text" required className="form-control"
            value={this.state.description}
            onChange={this.onChangeDescription} padding-bottom="20px" />            

          <div class="d-flex justify-content-end">
          <a href="/savesearch">Save Search</a>
          </div>
        </form>
        <div>
                <form onSubmit={this.onSubmit}>
                    <div className="i-am-centered" >
                        <div className="column-container" >
                            <label className="help" > Start Date: </label>
                            <DatePicker
                                selected={this.state.start}
                                onChange={this.onChangeStart}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                maxDate={new Date()}
                                dropdownMode="select"
                                placeholderText="MM/DD/YYYY"
                                required
                            />
                            <label className="help" > End Date: </label>
                            <DatePicker
                                selected={this.state.end}
                                onChange={this.onChangeEnd}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                maxDate={new Date()}
                                dropdownMode="select"
                                placeholderText="MM/DD/YYYY"
                                required
                            />
                        </div >


                    </div>
                    <br></br>

                    <div className="btn-group btn-block">
                        <label className="drop">If:</label>

                        <select className="form-control" id="exampleSelect1" value={this.state.method}
                            onChange={this.onChangeMethod} required>
                            <option value="">Select Method</option>
                            <option>TDD</option>
                            <option>Scrum</option>
                            <option>BDD</option>
                            <option>Kanban</option>
                            <option>Agile</option>
                            <option>Walerfall</option>
                            <option>lean</option>

                        </select>

                        <label className="drop">Operator: </label>
                        <select className="form-control" id="exampleSelect2" value={this.state.operator}
                            onChange={this.onChangeOperator} required>
                            <option value="">Select Operator</option>
                            <option>Contains</option>
                            <option>Doesn't Contain</option>
                            <option>Begins with</option>
                            <option>Ends With</option>
                            <option>Is Equal to</option>
                            <option>Is less than</option>
                            <option>Is more than</option>

                        </select>

                        <label className="drop">Value: </label>
                        <input type="text" required className="form-control"
                            value={this.props.value}
                            onChange={this.onChangeValue} padding-bottom="20px" />
                    </div>
                    {this.state.show}
                    <div class="i-am-centered-button" padding-top="20px">
                        <input type="submit" value="Search" className="btn btn-dark" padding-top="20px" />
                    </div>
                </form>
            </div>
      </div>
          <br></br>
        <ReactTable
          data={articles}
          columns={[
            {
              columns: [

                {
                  Header: "Author",
                  accessor: "author"
                },

                {
                  Header: "Title",
                  accessor: "title"
                },

                {
                    Header: "Source",
                    accessor: "journal"
                  },

                  {
                    Header: "Date of Publish",
                    accessor: "date"
                  },

                  {
                    Header: "Volume",
                    accessor: "volume"
                  },

                  {
                    Header: "Pages",
                    accessor: "pages"
                  },

              ]
            },
            
          ]}
          defaultSorted={[
            {
              id: "title",
              asc: true
            }
          ]}
          pageSize={articles.length}
          className="-striped -highlight"
        />
        <br />
        
      </div>
    );
  }
}

