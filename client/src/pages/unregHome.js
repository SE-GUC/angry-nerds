import React from "react";
import { Parallax } from "react-parallax";
import Button from 'react-bootstrap/Button'; 

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const insideStyles = {
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};
const image1 =require('../Images/Egypt.jpg')
const image2 = require('../Images/Stock.jpeg')
const image3 =require('../Images/chair.jpg')
const image4 = require('../Images/About.jpeg')

  class UnregisteredHome extends React.Component {
    render() {
      return (
        
  <div style={styles}>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <span className="label label-primary">Welcome to GAFI </span>
    <Parallax bgImage={image1} strength={500}>
      <div style={{ height: 500 }}>
        <div style={insideStyles}>
        <Button variant="danger" className = 'btn btn-danger btn-lg' type="submit" href='/signUp'>
    INVEST NOW
  </Button>
        </div>
      </div>
    </Parallax>
    <h1> </h1>
    <br></br>
    <Parallax bgImage={image3} blur={{ min: -2, max: 6 }}>
      <div style={{ height: 500 }}>
      <div style={insideStyles}>
        <Button variant="primary" className = 'btn btn-primary btn-lg' type="submit" href='/electronicjournal'>
    View all companies
  </Button>
      </div>
      </div>
    </Parallax>
    <h1> </h1>
    <br></br>
    <br></br>
    <br></br>
    <Parallax bgImage={image2} strength={-100}>
      <div style={{ height: 500 }}>
        <div style={insideStyles}>
        <h1 Style="color:#BDB76B;"> Know the Egypt's growing Economy</h1>
        <br></br>
        <Button style={{borderRadius:1000}}variant="light" className = 'btn btn-light btn-lg' type="submit" href='/Stocks'> View Stock</Button>
         </div>
      </div>
    </Parallax>
    <h1> </h1>
    <br></br>
    <Parallax
      bgImage={image4}
      strength={200}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: "absolute",
              background: `rgba(40, 96, 144 , ${percentage * 1})`,
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <div style={insideStyles}><Button style={{borderRadius:"50%"}}variant="light" className = 'btn btn-light btn-lg' type="submit" href='/About'>
    About
  </Button></div>
      </div>
    </Parallax>
    <div style={{ height: 500 }} />
    <h2>{"\u2728"}</h2>
  </div>
);
        }
    }

export default UnregisteredHome;
