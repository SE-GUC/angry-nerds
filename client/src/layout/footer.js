import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const about = () => {
  return (
    <MDBFooter color="blue" className="font-large pt-0">
      <MDBContainer>
        <MDBRow className="pt-5 mb-3 text-center d-flex justify-content-center">
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
              <a href="about">About us</a>
            </h6>
          </MDBCol>
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
              <a href="stocks">Stocks</a>
            </h6>
            
          </MDBCol>

           
         
        </MDBRow>
        <hr className="rgba-white-light" style={{ margin: "0 15%" }} />
        <MDBRow className="d-flex text-center justify-content-center mb-md-0 mb-4">
          <MDBCol md="8" sm="12" className="mt-5">
            <p style={{ lineHeight: "1.7rem" }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae
              vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
              voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur.
            </p>
          </MDBCol>
        </MDBRow>
        <hr className="clearfix d-md-none rgba-white-light" style={{ margin: "10% 15% 5%" }} />
        <MDBRow className="pb-3">
          <MDBCol md="12">
            <div className="mb-5 flex-center">
              <a className="fb-ic" href="https://www.facebook.com/gafiofficial">
                <i className="fab fa-facebook-f fa-lg white-text mr-md-4"> </i>
              </a>
              <a className="tw-ic" href ="https://twitter.com/gafiegypt?lang=en">
                <i className="fab fa-twitter fa-lg white-text mr-md-4"> </i>
              </a>
            
              <p>
              <i className="fa fa-phone mr-3" /> + 02 234 567 88
            </p>
          
            </div>
            
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:
          <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default about;