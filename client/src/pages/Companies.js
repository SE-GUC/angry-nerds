import React, { Component } from 'react';
import axios from 'axios';

class Companies extends Component {
    state = {
     pubCases:[],
     pendCases:[],
    
    }

    componentDidMount() {
        try{
        axios.get('http://localhost:3000/viewMyPublishedCompanies').then(
        res => this.setState({pubCases: res.data.data}))
        axios.get('http://localhost:3000/viewMyPendingCompanies').then(
        res => this.setState({pendCases: res.data.data}))
        
        } 
        catch(error){
            console.log(error)
        }  
    }
 reMap(){  
    return ( this.state.pendCases.map((aCase) => 
    ( <div>
    <a href=' '> {aCase.english_name}</a> 
    
        </div>

    )))

}
    reMapPub(){

    return ( this.state.pubCases.map((aCase) => 
        ( <div>
        <a href=' '> {aCase.english_name}</a> 
        </div>
        )))
    }

render() {
    console.log("test")
    return(
        <div>
    <h1>Published companies</h1>
    {this.reMapPub()}
        <h2>Pending companies</h2>
        {this.reMap()}
        </div>

        )
        


      }
}

export default Companies;