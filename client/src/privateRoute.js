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
  userHome = '/signin',
  ...rest
}) => {
  

  const storedToken = localStorage.getItem('jwtToken')
  const str = storedToken.replace('Bearer ','')
  const tok = jwt.decode(str)

  if (!storedToken){
    isAuthenticated = false
  }else if ( (tok.exp-Date.now()) <= 0){
    isAuthenticated = false
    localStorage.removeItem('jwtToken')
    delete axios.defaults.headers.common['Authorization'] 
  }else{
    isAuthenticated = true   
    if (allowed.indexOf(tok.type)<=0){
      allowedUserFlag=false
      switch(tok.type){
        case 'investor' : userHome = '/LawyerHome'; break ;
        case 'lawyer' : userHome = '/LawyerHome' ; break ;
        case 'reviewer' : userHome = '/LawyerHome';break ;
        case 'admin' : userHome = '/AdminViewLaws' ;break ;
        default : userHome = '/signin'
      }    
    }else{
      allowedUserFlag=true
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

PrivateRoute.defaultProps = { redirect: '/signin' }

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirect: PropTypes.string,
}

export default PrivateRoute