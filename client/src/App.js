import React, { Component } from 'react';
import './App.css';
import Companies from './pages/Companies';
class App extends Component {
  state = {
    Ename: [
      {
        
        id: 1,
        title: "wtf",
        status: false 
      }
    ]
  }

 
   render() {
    return (
      <div className="App">
        {<Companies CompanyName = {this.state.CompanyName}/> }
      </div>
    );
  }
}

export default App;
