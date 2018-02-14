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
    this.state = {
      dataAll: [],
      url:'http://192.168.1.12:8080/ticketList?per_page=10&page=1',
      per_page:10,
      page:1
    }
  }

  loadData() {

    let username = 'singh782@umn.edu/token';
    let password = 'jlPkPv2oLBBAEJjmppliDc2vAnqJaoNfwNxvFuPu';
    console.log(this.state.url);
    let request = new Request(this.state.url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + base64.encode(username + ':' + password),
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
      this.setState({url:s});
      this.loadData();
    }
  }
  loadNextData(){
    let s = this.state.url;
    let curr_page = parseInt(s.substr(s.indexOf('&page=') + 6, s.length-1));
    let next = curr_page + 1;
    s = s.substr(0, s.indexOf('&page=')+6) + next;
    this.setState({url:s});
    this.loadData();
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    const ticks = this.state.dataAll;
    const listItems = ticks.map((t) =>
    <li key={t.id}>{t.description}</li>
    );
    return (
      
      <div>
        <button onClick={this.loadPreviousData}>Previous</button>
          <ul>{listItems}</ul>
        <button onClick={this.loadNextData}>Next</button>
      </div>
    );
  }
}