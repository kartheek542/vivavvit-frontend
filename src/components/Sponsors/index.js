import Header from "../Header";

const Sponsors = () => (
  <div className="home-page">
    <Header />
    <div className="home-body-container">
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
    </div>
  </div>
);

export default Sponsors;
