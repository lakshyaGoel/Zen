import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';
import base64 from 'base-64';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0
    }
  }

  loadData() {

    let username = 'singh782@umn.edu/token';
    let password = 'jlPkPv2oLBBAEJjmppliDc2vAnqJaoNfwNxvFuPu';

    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic ' + base64.encode(username + ':' + password));
    // console.log(base64.encode(username + ':' + password));

    let request = new Request('http://192.168.1.12:8080/ticketList?per_page=2&page=5', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic c2luZ2g3ODJAdW1uLmVkdS90b2tlbjpqbFBrUHYyb0xCQkFFSmptcHBsaURjMnZBbnFKYW9OZndOeHZGdVB1',
      },
      mode: 'no-cors'

    });
    console.log("YO");
    console.log(request);
    fetch(request).then(function (data) {
      console.log("HI");
    })
      .catch(function (error) {
        console.log("Error");
      })
  }

  componentDidMount() {
    this.loadData();
  }
  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({
      offset: offset
    }, () => {
      this.loadCommentsFromServer();
    });
  };
  render() {
    return (
      <div>
        {/* <CommentList data={this.state.data}/> */}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={< a href = "" > ...</a>}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}/>
      </div>
    );
  }
}

// class CommentList extends Component {}
export default App;