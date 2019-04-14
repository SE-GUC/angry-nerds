import React, { Component } from 'react';
import axios from 'axios';

class Companies extends Component {
    state = {
     pubCases:[],
     pendCases:[]
    }

    componentDidMount() {
        try{
        axios.get('http://localhost:3000/ViewPublishedCompanies').then(
        res => this.setState({pubCases: res.data.data}))
        axios.get('http://localhost:3000/ViewPendingCompanies').then(res =>{
             this.setState({pendCases: res.data.data})
            console.log(res)
        })
        
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
render() {
    
    return ( 
        
        this.state.pubCases.map((aCase) => {
            return  <div>
            <h1>Published companies</h1>
        <a href=' '> {aCase.english_name}</a> 
        <h2>Pending companies</h2>
            {this.reMap()}
            </div>

        
        }))
        

            
      }
}

export default Companies;