import React, {
  Component
} from 'react';
import './App.css';
import base64 from 'base-64';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.loadPreviousData = this.loadPreviousData.bind(this);
    this.loadNextData = this.loadNextData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      dataAll: [],
      url:'http://192.168.1.12:8080/ticketList?per_page=10&page=1',
      username:'',
      password:'',
      value:''
    }
  }

  loadData() {
    let request = new Request(this.state.url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + base64.encode(this.state.username + ':' + this.state.password),
      },
      mode: 'cors'
    });
    fetch(request)
      .then((resp) => resp.json())
      .then(data => {
        this.setState({
          dataAll: data.tickets
        });
      })
      .catch(function (error) {
        console.log("Error" + error);
      })
  }
  loadPreviousData(){
    let s = this.state.url;
    let curr_page = parseInt(s.substr(s.indexOf('&page=') + 6, s.length-1));
    let prev = curr_page - 1;
    if(curr_page > 1){
      s = s.substr(0, s.indexOf('&page=')+6) + prev;
      this.setState({url:s},()=>{
        this.loadData();
      });
    }
  }
  loadNextData(){
    let s = this.state.url;
    let curr_page = parseInt(s.substr(s.indexOf('&page=') + 6, s.length-1));
    let next = curr_page + 1;
    s = s.substr(0, s.indexOf('&page=')+6) + next;
    this.setState({url:s},()=>{
      this.loadData();
    });
  }
  handleChange(event) {
    let property = event.target.name;
    this.setState({[property]: event.target.value});
  }
  handleSubmit(event){
    this.loadData();
    event.preventDefault();
  }
  render() {
    const ticks = this.state.dataAll;
    const listItems = ticks.map((t) =>
      <li key={t.id}>{t.description}</li>
    );
    return (
      
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.dataAll.length != 0
          ? <div><button onClick={this.loadPreviousData}>Previous</button><ul>{listItems}</ul><button onClick={this.loadNextData}>Next</button></div>
          : <div>Please Log In!</div>}
        
      </div>
    );
  }
}