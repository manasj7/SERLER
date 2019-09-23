import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import List from './itemLister.component';
export default class searchFiles extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: '',
      date: new Date(),
      results: []
    }
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const Search = {
      description: this.state.description,
      date: this.state.date
    }

    console.log(Search);
  }

  componentDidMount() {
    // For initial data
    this.fetchData();
  }

  fetchData = (query) => {
    fetch("http://localhost:5000/articles", {
      method: "GET",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        console.log(data)
        this.setState({ results: data })
      })
      .catch((error) => {
        console.log(error, "catch the hoop")
      })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.fetchData}>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription} />
          </div>
          <div className="form-group">
            <label>Start Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <label>End Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
        </form>
        <div>
          <List items={this.state.results} />
        </div >
      </div>

    )
  }
}