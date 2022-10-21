import { Component } from "react";
import Header from "../Header";
import { BsFacebook, BsFillPhoneFill } from "react-icons/bs";
import { FaInstagramSquare, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import "./index.css";

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <Header events />
        <div className="home-body-container">
          <div className="home-sub-section section-1">
            <div className="page-1-container">
              <h1 className="main-page-heading">VIVAVVIT</h1>
            </div>
          </div>
          <div className="home-sub-section">
            <div className="review-container">
              <div className="quote-image-container">
                <img
                  src="https://raw.githubusercontent.com/kamal-tej/proj_images/main/WhatsApp%20Image%202022-10-20%20at%2010.25.55%20PM.jpeg"
                  alt="review"
                  className="user-image"
                />
              </div>
              <div className="quote-content-container">
                <p className="quote-text">
                  <FaQuoteLeft /> This is one of the best and fun experience I
                  ever had in my life. It is the best place to enjoy along with
                  friends <FaQuoteRight />
                </p>
                <p className="quote-author">
                  - Harish Enuganti
                  <br />
                  VVIT
                </p>
              </div>
            </div>
          </div>
          <div className="home-sub-section" id="sponsors">
            <div className="wrapper-container">
              <h1 className="sponsors-heading">SPONSORS</h1>
              <div className="sponsors-container">
                <div className="sponsor">
                  <div>
                    <img
                      src="https://raw.githubusercontent.com/kamal-tej/proj_images/main/sponser1.png"
                      alt="sponsor"
                      className="sponsor-image"
                    />
                  </div>
                  <p>JLE Cinemas</p>
                </div>
                <div className="sponsor">
                  <div>
                    <img
                      src="https://raw.githubusercontent.com/kamal-tej/proj_images/main/sponser2.jpeg"
                      alt="sponsor"
                      className="sponsor-image"
                    />
                  </div>
                  <p>mane's The Saloon</p>
                </div>
                <div className="sponsor">
                  <div>
                    <img
                      src="https://raw.githubusercontent.com/kamal-tej/proj_images/main/sponser3.jpeg"
                      alt="sponsor"
                      className="sponsor-image"
                    />
                  </div>
                  <p>VR Overseas</p>
                </div>
                <div className="sponsor">
                  <div>
                    <img
                      src="https://img4.nbstatic.in/tr:w-500/5e5df6154cedfd000c93430b.jpg"
                      alt="sponsor"
                      className="sponsor-image"
                    />
                  </div>
                  <p>Happy Jump Trampoline Park</p>
                </div>
              </div>
            </div>
          </div>
          <div className="home-sub-section">
            <div className="gallery-wrapper">
              <div className="gallery-text-container">
                <h1 className="gallery-heading">Gallery</h1>
              </div>
            </div>
          </div>
          <div className="home-sub-section">
            <div>
              <div className="contact-section-container">
                <div className="contact-heading-container">
                  <h1 className="contact-heading">Contact Us</h1>
                </div>
                <div className="contact-details-container">
                  <div className="phone-container">
                    <BsFillPhoneFill />
                    <p> 9951 023 336 </p>
                  </div>
                  <div className="phone-container">
                    <TiLocation />
                    <p>Nambur 522008</p>
                  </div>
                  <div>
                    <a
                      href="https://www.facebook.com/vivavvit/"
                      className="social-icons-link"
                    >
                      <BsFacebook className="social-icon" />
                    </a>
                    <a
                      href="https://www.instagram.com/vivavvit/?hl=en"
                      className="social-icons-link"
                    >
                      <FaInstagramSquare className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
