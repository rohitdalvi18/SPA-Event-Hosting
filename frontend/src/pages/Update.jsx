import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEvent = () => {
    const [event, setEvent] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.pathname.split("/")[3];

    const handleChange = (e) => {
        setEvent(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/events/${eventId}`, event);
            navigate("/san-francisco-events/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form-container'>
            <h1>Update Event</h1>
            <input type="text" placeholder="Event Title" onChange={handleChange} name="title" />
            <input type='text' placeholder="Event Description" onChange={handleChange} name="description" />
            <input type="number" placeholder="Ticket Price" onChange={handleChange} name="price" />
            <input type="text" placeholder="Event Cover Image URL" onChange={handleChange} name="cover" />
            <button onClick={handleClick} className='primary-button'>Update Event</button>
        </div>
    );
};

export default UpdateEvent;