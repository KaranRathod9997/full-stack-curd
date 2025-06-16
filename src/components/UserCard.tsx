
import { Link } from "react-router-dom";
import { User } from "../data/mockUsers";
import { Edit, Eye, Trash2, Mail, Phone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
}

const UserCard = ({ user, onDelete }: UserCardProps) => {
  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              user.status === 'active' ? 'bg-green-500' : 'bg-slate-400'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-800 truncate">
              {user.name}
            </h3>
            <p className="text-sm text-blue-600 font-medium mb-2">
              {user.role}
            </p>
            
            <div className="space-y-1">
              <div className="flex items-center text-sm text-slate-600">
                <Mail className="w-4 h-4 mr-2 text-slate-400" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="w-4 h-4 mr-2 text-slate-400" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Building className="w-4 h-4 mr-2 text-slate-400" />
                <span>{user.department}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-slate-100 text-slate-800'
          }`}>
            {user.status}
          </span>
          
          <div className="flex items-center space-x-2">
            <Link to={`/users/${user.id}`}>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
            
            <Link to={`/edit-user/${user.id}`}>
              <Button variant="outline" size="sm" className="hover:bg-amber-50 hover:border-amber-200">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete User</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {user.name}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
