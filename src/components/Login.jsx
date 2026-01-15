import {  useRef} from "react"

function Login({login,error}) {
    const email = useRef("")
    const password = useRef("") 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const userEmail = email.current.value;
        const userPassword = password.current.value;
        login(userEmail, userPassword); 
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome</h1>
                    <p className="text-gray-500">Sign in to your account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            ref={email}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            ref={password}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition"
                        />
                    </div>
 
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition"
                    >
                        Sign In
                    </button>
                    <p className="text-red-500">{error}</p>
                </form> 
            </div>
        </div>
    )
}

export default Login