import { Component } from "react";
import Header from "../Header";
import "./index.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Header title="VIVA VVIT" events />
        <div className="home-body-container">
          <div className="home-content-1">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut purus
              elit, vestibulum ut, placerat ac, adipiscing vitae, felis.
              Curabitur dictum gravida mauris. Nam arcu libero, nonummy eget,
              consectetuer id, vulputate a, magna. Donec vehicula augue eu
              neque. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Mauris ut leo. Cras viverra
              metus rhoncus sem. Nulla et lectus vestibulum urna fringilla
              ultrices. Phasellus eu tellus sit amet tortor gravida placerat.
              Integer sapien est, iaculis in, pretium quis, viverra ac, nunc.
              Praesent eget sem vel leo ultrices bibendum. Aenean faucibus.
              Morbi dolor nulla, malesuada eu, pulvinar at, mollis ac, nulla.
              Curabitur auctor semper nulla. Donec varius orci eget risus. Duis
              nibh mi, congue eu, accumsan eleifend, sagittis quis, diam. Duis
              eget orci sit amet orci dignissim rutrum.
            </p>
          </div>
          <div className="home-content-2">
            <img src="https://picsum.photos/400/300" alt="viva vvit" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
