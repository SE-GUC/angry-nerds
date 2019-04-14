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
const image2 ="https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5297440765001_5280261645001-vs.jpg?pubId=5104226627001&videoId=5280261645001";
const image3 =require('../Images/chair.jpg')
const image4 =
  "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/empire-state-building-black-and-white-square-format-john-farnan.jpg";

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
    <Parallax bgImage={image3} blur={{ min: -2, max: 6 }}>
      <div style={{ height: 500 }}>
      <div style={insideStyles}>
        <Button variant="primary" className = 'btn btn-primary btn-lg' type="submit" href='/ViewMyCompanies'>
    View all companies
  </Button>
      </div>
      </div>
    </Parallax>
    <h1> </h1>
    <Parallax bgImage={image2} strength={-100}>
      <div style={{ height: 500 }}>
        <div style={insideStyles}>RANDOM TEXT</div>
      </div>
    </Parallax>
    <h1> </h1>
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
        <div style={insideStyles}><Button variant="light" className = 'btn btn-light btn-lg' type="submit" href='/About'>
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
