import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './UserDetail.css'
import Spinner from "./Spinner";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) {
        return <Spinner />
    }

    return (
        <div className="container user-detail">
            <h1 style={{ textAlign: "center", color: "var(--warning-color)" }}>{user.name}</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <h3>Address</h3>
            <p><strong>Street:</strong> {user.address.street}</p>
            <p><strong>City:</strong> {user.address.city}</p>
            <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
            <h3>Company</h3>
            <p><strong>Name:</strong> {user.company.name}</p>
            <p><strong>Catchphrase:</strong> {user.company.catchPhrase}</p>
            <button onClick={() => navigate("/")}>Back to Users List</button>
        </div>
    );
};

export default UserDetail;