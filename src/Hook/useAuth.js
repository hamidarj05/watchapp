import { useState , useEffect } from "react";

export default function useAuth() {
    const [isAUth, setAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [data, setData] = useState([]);

    const apiUrl = "http://localhost:3001/users" 

    const fetchUsers = async () => {
        await fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => (console.log(data), setData(data)))
    };

    useEffect(() => {
        fetchUsers();
        console.log(data);
    }, []);

    console.log(data);

    const login = (email, password) => {
        const user = data.find(u => u.email === email && u.password === password);
        if (user) {
            setAuth(true);
            if (user.role === "admin") {
                setIsAdmin(true);
            }
        }  
    }

    const logout = () => {
        setAuth(false);
        setIsAdmin(false);
    }
    return { isAUth, login, logout, isAdmin };
}