import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;


const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/events`);
                setEvents(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEvents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/events/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='events-container' style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
            <h1>Local Event Listings <br/> <span style={{color:"beige"}}>San Francisco</span></h1>
            <Link to="/add" className="btn primary-button">Create a New Event</Link>
            <br/>
            <div className="events">
                {events?.map(event => (
                    <div className="event" key={event.id}>
                        {event.cover && <img src={event.cover} alt="Event Cover" />}
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <span>${event.price}</span>
                        <div className="buttons">
                            <button className="delete-button" onClick={() => handleDelete(event.id)}>Delete</button>
                            <Link to={`/update/${event.id}`}><button className='update-button'>Update</button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;