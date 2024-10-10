import axios from "axios"
import { useEffect, useState } from "react"
import UserForm from "./UserForm";
import { Link } from "react-router-dom";
import './UserList.css'
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";
import { ToastContainer, toast } from "react-toastify";

function UsersList() {

    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [users, setUsers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null); // Track the user being edited
    const [userToDelete, setUserToDelete] = useState(null); // Track the user being deleted
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setFetchedUsers(response.data);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        }
        getUsers();
    }, [])

    const handleSaveUser = (savedUser) => {
        if (editingUser) {
            // Update the existing user in the UI
            setUsers(users.map(user => (user.id === savedUser.id ? savedUser : user)));
        } else {
            // Add the new user to the list
            setUsers([...users, savedUser]);
        }
        setIsModalOpen(false);
        setEditingUser(null); // Reset editing state
    };

    const handleEdit = (user) => {
        setEditingUser(user); // Set the user to be edited
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${userToDelete.id}`);
            setUsers(users.filter(user => user.id !== userToDelete.id)); // Remove the user from the UI
            setUserToDelete(null); // Reset deletion state
        } catch (error) {
            toast.error(error.message);
            console.error("Error deleting user:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const searchUser = (e) => {
        const searchTerm = e.target.value;
        const filteredUsers = fetchedUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setUsers(filteredUsers);
    };

    return (
        <>
            {loading && <Spinner />}
            <div className="container">
                <h1>Users List</h1>

                <input type="text" placeholder="Search..." onChange={searchUser} />
                <button onClick={() => {
                    setEditingUser(); // Reset the form for creating a new user
                    setIsModalOpen(true);
                }} className="save">
                    Create User
                </button>
                {isModalOpen && (
                    <dialog open >
                        <UserForm user={editingUser} onSave={handleSaveUser} setLoading={setLoading} />
                        <button className="edit" onClick={() => setIsModalOpen(false)}>Close</button>
                    </dialog>
                )}

                {userToDelete && (
                    <dialog open className="confirm-delete">
                        <p>Are you sure you want to delete {userToDelete.name}?</p>
                        <button className="del" onClick={confirmDelete}>Yes, Delete</button>
                        <button onClick={() => setUserToDelete(null)
                        }>Cancel</button>
                    </dialog>
                )}

                <table style={{
                    opacity: isModalOpen ? 0.5 : 1,
                    filter: isModalOpen ? 'blur(5px)' : 'none',
                    transition: 'all 300ms ease-in-out',
                    pointerEvents: isModalOpen ? 'none' : 'auto'
                }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.website}</td>
                                <td>
                                    <button className="edit" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="del" onClick={() => setUserToDelete(user)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer />
        </>
    )
}
export default UsersList