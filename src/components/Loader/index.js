import {TailSpin} from 'react-loader-spinner';
import "./index.css"

const Loader = (props) => (
    <div className='loader-container'>
        <TailSpin {...props} />
    </div>
)

export default Loader;