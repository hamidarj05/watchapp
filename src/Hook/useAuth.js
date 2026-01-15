import { useState, useEffect } from "react";

export default function useAuth() {
    const [isAuth, setAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [data, setData] = useState([]);

    const apiUrl = "http://localhost:3001/users";

    const fetchUsers = async () => {
        try {
            const res = await fetch(apiUrl);
            const users = await res.json();
            setData(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const login = (email, password) => {
        const user = data.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            setAuth(true);
            setIsAdmin(user.role === "admin");
        } else {
            alert("Invalid credentials");
        }
    };

    const logout = () => {
        setAuth(false);
        setIsAdmin(false);
    };

    return { isAuth, login, logout, isAdmin };
}
