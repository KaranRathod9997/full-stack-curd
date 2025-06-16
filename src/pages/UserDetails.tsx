
import { useParams, Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { User, Mail, Phone, Building, Calendar, Edit, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById, loading } = useUsers();
  
  const user = id ? getUserById(id) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-600 mb-2">User not found</h3>
        <p className="text-slate-500 mb-4">The user you're looking for doesn't exist.</p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Users
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Users
          </Button>
        </Link>
        
        <Link to={`/edit-user/${user.id}`}>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit User
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-white ${
                user.status === 'active' ? 'bg-green-500' : 'bg-slate-400'
              }`} />
            </div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl text-slate-800 mb-2">
                {user.name}
              </CardTitle>
              <p className="text-lg text-blue-600 font-medium mb-3">
                {user.role}
              </p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-slate-100 text-slate-800'
              }`}>
                {user.status}
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Contact Information</h3>
              
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-medium text-slate-800">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="font-medium text-slate-800">{user.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Work Information</h3>
              
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Building className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-slate-600">Department</p>
                  <p className="font-medium text-slate-800">{user.department}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-slate-600">Join Date</p>
                  <p className="font-medium text-slate-800">
                    {new Date(user.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
