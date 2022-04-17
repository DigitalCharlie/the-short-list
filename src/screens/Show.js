import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Show() {
    const { id } = useParams();
    const [showData, setShowData] = useState({});
    const navigate = useNavigate();

    
    useEffect(() => {
        (async () => {
          try {
            // Assign our axios response to a variable. Use the id from params to get our speciifc task
            const { data } = await axios.get(`http://localhost:3000/tasks/${id}`);
            // Set the showData state to the data we recieved from our server.
            setShowData(data);
          } catch (err) {
            console.log(err);
          }
        })();
      }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`)
        } catch (err) {
            console.log(err)
        } finally {
            navigate(-1)
        }
    }

    return (
        <div className="showPage">
            <div className="taskContainer">
            <h3>{showData.entry}</h3>
            <p>This page is currently unbuilt and exists in case I want to add edit and description functionality.</p>
            <p>{showData.description}</p>
            <Link to="/"><button>Home</button></Link>
            <button onClick={handleDelete}>Delete 🔴 </button>
            </div>
        </div>
    );
}