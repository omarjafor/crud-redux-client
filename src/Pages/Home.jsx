import { Link } from "react-router-dom";
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, removeAll } from "../Redux/Slices/UserSlice";
import { useEffect } from "react";
import { deleteAdmin, getUsers } from "../Redux/Slices/adminSlice";
import toast from "react-hot-toast";


const Home = () => {

    const users = useSelector(state => state.users);
    const admin = useSelector(state => state.admin);
    
    const dispatch = useDispatch();

    useEffect( () => {
        fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => {
            dispatch(getUsers(data));
        })
    } , [dispatch])

    const handleRemoveUser = (id) => {
        dispatch(deleteUser(id));
    }

    const removeAllUsers = () => {
        dispatch(removeAll())
    }

    const handleDelete = (id) => {
        const toastId = toast.loading('Loading.....');
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            toast.success('Successfully Deleted', { id: toastId })
            dispatch(deleteAdmin(id))
        })
    }

    const renderCard = () => users.map(user => (
        <div className="bg-gray-300 p-5 flex items-center justify-between" key={user.id}>
            <div>
                <h3 className="font-bold text-lg text-gray-700">{user.name}</h3>
                <span className="font-normal text-gray-600">{user.email}</span>
            </div>
            <div className="flex gap-4">
                <Link to={`editUser/${user.id}`}>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </Link>
                <button
                    onClick={() => handleRemoveUser(user.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    )
    )

    const renderAdmin = () => admin?.map(user => (
        <div className="bg-gray-300 p-5 flex items-center justify-between" key={user._id}>
            <div className="flex gap-4">
                <img src={user?.img} alt="" className="h-24 w-24"/>
                <div>
                    <h3 className="font-bold text-lg text-gray-700">{user?.name}</h3>
                    <span className="font-normal text-gray-600">{user?.email}</span>
                </div>
            </div>
            <div className="flex gap-4">
                <Link to={`editAdmin/${user._id}`}>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </Link>
                <button
                    onClick={() => handleDelete(user._id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    )
    )
    
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-center text-indigo-600">Local Crud with Redux</h1>
                <Link to='addUser'><Button>Add User</Button></Link>
                <div className="grid gap-5 md:grid-cols-2">
                    {users.length ? renderCard() : <p className="text-center col-span-2 text-gray-700 font-semibold">No User</p>}
                </div>
                <Button onClick={removeAllUsers}>Delete All</Button>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-center text-indigo-600">Mern Crud with Redux</h1>
                <Link to='addAdmin'><Button>Add Admin</Button></Link>
                <div className="grid gap-5 md:grid-cols-2">
                    {admin.length ? renderAdmin() : <p className="text-center col-span-2 text-gray-700 font-semibold">No Admin</p>}
                </div>
            </div>
        </div>
    );
};

export default Home;