
import { useUsers } from "../hooks/useUsers";
import UserCard from "../components/UserCard";
import { Users, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AllUsers = () => {
  const { users, loading, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">All Users</h1>
            <p className="text-slate-600">Manage your team members</p>
          </div>
        </div>
        
        <Link to="/add-user">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white border-slate-200 focus:border-blue-300 focus:ring-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onDelete={deleteUser} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              {searchTerm ? "No users found" : "No users yet"}
            </h3>
            <p className="text-slate-500 mb-4">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : "Get started by adding your first user"
              }
            </p>
            {!searchTerm && (
              <Link to="/add-user">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First User
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
