import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const AddEvent = () => {
    const [event, setEvent] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setEvent(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/events`, event);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form-container'>
            <h1>Create New Event</h1>
            <input type="text" placeholder="Event Title" onChange={handleChange} name="title" />
            <input type='text' placeholder="Event Description" onChange={handleChange} name="description" />
            <input type="number" placeholder="Ticket Price" onChange={handleChange} name="price" />
            <input type="text" placeholder="Event Cover Image URL" onChange={handleChange} name="cover" />
            <button onClick={handleClick} className='primary-button'>
                 &nbsp; Publish Event
            </button>
        </div>
    );
};

export default AddEvent;