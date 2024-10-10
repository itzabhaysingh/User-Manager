/* eslint-disable react/prop-types */
import './UserForm.css';
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UserForm = ({ onSave, user = {}, setLoading }) => {
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
        street: "",
        city: "",
        companyName: "",
        username: ""
    });

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                website: user.website || "",
                street: "",
                city: "",
                companyName: "",
                username: ""
            });
        }
    }, [user]);

    const nameInputRef = useRef(null);

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                website: user.website || "",
                street: user.address?.street || "",
                city: user.address?.city || "",
                companyName: user.company?.name || "",
                username: user.username || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (user.id) {
                const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData);
                onSave(response.data);
            } else {
                const response = await axios.post("https://jsonplaceholder.typicode.com/users", formData);
                onSave(response.data);
            }

            toast.success("User saved successfully");
        } catch (error) {
            toast.error(error.message);
            console.error("Error submitting the form:", error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        ref={nameInputRef}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Website</label>
                    <input type="text" name="website" value={formData.website} onChange={handleChange} />
                </div>
                <div>
                    <label>Street</label>
                    <input type="text" name="street" value={formData.street} onChange={handleChange} required />
                </div>
                <div>
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div>
                    <label>Company Name (Optional)</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                </div>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        minLength={3}
                        readOnly={user.id ? true : false} // Username is read-only if user is being edited
                    />
                </div>
                <button type="submit">Save</button>
            </form>
            <ToastContainer />
        </>
    );
};

export default UserForm;