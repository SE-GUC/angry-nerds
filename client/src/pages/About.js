import React, { Component } from 'react'
import gafi from '../Images/Gafi.jpg'

export class About extends Component {
  render() {
    return (
      <div>
          <center>
            <br/>
            <h1> About GAFI </h1>
          <br/>
          <img src={gafi} alt="Angry Nerds" />
          
            <div>
          
         &nbsp;&nbsp;
         
          <p>  GAFI is an affiliate of the Ministry of Investment (MOI) and the principal government body regulating and facilitating investment in Egypt.

Although the authority retains its traditional regulatory powers, GAFI today is an effective, proactive investment promotion agency with promotion, facilitation, business matchmaking, Egyptian expatriates, events, investor aftercare, and research and market intelligence functions.

As Egypt's one-stop shop for investment, GAFI eases the way for global investors looking to harness opportunities presented by Egypt's fast-growing domestic economy and the nation's robust competitive advantages as an export hub for Europe, the Arab world and Africa.

GAFI's investor care officers also ensure that client feedback is channeled into government agencies with a view towards continuously enhancing and reforming Egypt's investment climate. In addition to promoting Egypt's investment opportunities in various sectors, GAFI is launching new initiatives aimed at promoting the investment climate in Egypt including the adoption of new investment regimes (investment zones and special economic zones) and the establishment of the SME Entrepreneurial Center and Fund (Bedaya).</p>
</div>
          <br/>
          <h1>Our mission</h1>
          <p>"To enable and sustain Egypt's economic growth through investment promotion, facilitation, efficient business services and advocacy of investor friendly policies "</p>
          <h1>How to contact us?</h1>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12502.911283591824!2d31.290166619120157!3d30.071321099501382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fba8339d1f3%3A0x5d022f1b40158f94!2sGeneral+Authority+For+Investments+Main+Office!5e0!3m2!1sen!2seg!4v1555242052412!5m2!1sen!2seg" 
width="600" height="450" frameborder="0" style={{border:"0"}} allowfullscreen></iframe>
          <p>Email: angry.nerds@gmail.com</p>
          <p>Contact: 01000000000</p>
          </center>

        
        
    </div>
    )
  }
}

export default About
