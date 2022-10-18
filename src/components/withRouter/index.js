import { useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    
    return (
      <Component
        navigate={navigate}
        params={params}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

export default withRouter;