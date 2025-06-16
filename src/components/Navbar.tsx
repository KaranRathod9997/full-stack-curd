
import { Link, useLocation } from "react-router-dom";
import { Users, Plus, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors">
            <Users className="w-8 h-8 text-blue-600" />
            <span>UserManager</span>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/") || isActive("/users")
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">All Users</span>
            </Link>
            
            <Link
              to="/add-user"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/add-user")
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add User</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
