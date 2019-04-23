import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import jwt from 'jsonwebtoken'
import axios from 'axios';



const PrivateRoute =  ({
  component: Component,
  isAuthenticated=false,
  allowedUserFlag=false,
  allowedUsers : allowed ,
  redirect : pathname,
  userHome = '',
  ...rest
}) => {
  
  const storedToken = localStorage.getItem('jwtToken')
  if (!storedToken){
    isAuthenticated = false
    console.log("HEREEEEEEEEEEEEEEEEEE1",localStorage.getItem('jwtToken'))
  }else{
    const str = storedToken.replace('Bearer ','')
    const tok = jwt.decode(str)
    console.log(tok.exp,' + ',Date.now())
    if ( ((tok.exp*1000)-Date.now()) <= 0){
      console.log("HEREEEEEEEEEEEEEEEEEE2")
    isAuthenticated = false
    localStorage.removeItem('jwtToken')
    delete axios.defaults.headers.common['Authorization'] 
  }else{
    isAuthenticated = true  
    console.log(allowed,tok.type)
    console.log(allowed.indexOf(tok.type)) 
    if (allowed.indexOf(tok.type)<0){
      allowedUserFlag=false
      console.log("HEREEEEEEEEEEEEEEEEEE3")
      switch(tok.type){
        case 'investor' : userHome = '/InvestorPage'; break ;
        case 'lawyer' : userHome = '/LawyerHome' ; break ;
        case 'reviewer' : userHome = '/ReviewerHome';break ;
        case 'admin' : userHome = '/AdminPage' ;break ;
        default : userHome = '/signin'
      }
    }else{
      console.log("HEREEEEEEEEEEEEEEEEEE4")
      allowedUserFlag=true
    }
  }
}

  



  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true  ? //start
        (  allowedUserFlag === true  ?  (<Component {...rest} {...props} />) : (<Redirect to={{pathname:userHome,state: { from: props.location },}} />) ) 
        : (<Redirect to={{pathname,state: { from: props.location },}} />) //end
      }
    />
  )
}



export default PrivateRoute