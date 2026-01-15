import logo from '../Assets/Images/logo.png'
import { Link } from 'react-router-dom'

function Navbar({logout}) {
    const deconnecter = () => {
        localStorage.removeItem("isLogin");
        window.location.reload();
        logout();
    }
    return (
        <nav className="w-full bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"> 
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-50 h-10 object-contain" />
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
                    <Link to="/home" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/about" className="hover:text-blue-600 transition">About</Link>
                    <Link to="/women" className="hover:text-blue-600 transition">Women</Link>
                    <Link to="/men" className="hover:text-blue-600 transition">Men</Link>
                    <Link to="/accessories" className="hover:text-blue-600 transition">Accessories</Link>
                    <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
                    <button onClick={deconnecter} className="hover:text-blue-600 transition">Deconnecter</button>
                </div>

                {/* Mobile button */}
                <button className="md:hidden text-gray-700 text-2xl">
                    ☰
                </button>
            </div>
        </nav>
    )
}
export default Navbar