import { Component } from "react";
import withRouter from '../withRouter'

class SubmitSuccess extends Component {
    componentDidMount() {
        this.onMount();
    }
    onMount = () => {
        setTimeout(() => {
            const {navigate} = this.props;
            navigate('/');
        }, 1000)
    }
  render() {
    return (
      <div>
        <div>
          <img src="https://images.template.net/98321/Free-Green-Tick-Mark-clipart-01-1.jpg" alt="success" />
          <p>Successfully submitted</p>
        </div>
      </div>
    );
  }
}

export default withRouter(SubmitSuccess);
