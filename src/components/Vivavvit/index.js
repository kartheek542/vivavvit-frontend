import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../Home";
import Events from '../Events'
import Register from '../Register';
import Login from '../Login';
import EventDetailItem from '../EventDetailItem';
import CoordinatorEventEdit from '../CoordinatorEventEdit';
import CoordinatorEvent from '../CoordinatorEvent';

const Vivavvit = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/events' element={<Events />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/events/:id' element={<EventDetailItem />} />
            <Route path="/coordinator" element={<CoordinatorEvent />} />
            <Route path="/coordinator/edit" element={<CoordinatorEventEdit />} />
        </Routes>
    </BrowserRouter>
)

export default Vivavvit;