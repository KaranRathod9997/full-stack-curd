
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AddUser = () => {
  const navigate = useNavigate();
  const { addUser } = useUsers();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    joinDate: "",
    avatar: "",
    status: "active" as "active" | "inactive"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.joinDate) newErrors.joinDate = "Join date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const newUser = {
      ...formData,
      avatar: formData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=3b82f6&color=ffffff&size=150`
    };

    addUser(newUser);
    navigate("/");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Users
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-slate-800">Add New User</CardTitle>
              <p className="text-slate-600">Create a new team member profile</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className={errors.name ? "border-red-300 focus:border-red-300 focus:ring-red-100" : ""}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className={errors.email ? "border-red-300 focus:border-red-300 focus:ring-red-100" : ""}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className={errors.phone ? "border-red-300 focus:border-red-300 focus:ring-red-100" : ""}
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="Enter job role"
                  className={errors.role ? "border-red-300 focus:border-red-300 focus:ring-red-100" : ""}
                />
                {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger className={errors.department ? "border-red-300 focus:border-red-300 focus:ring-red-100" : ""}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-sm text-red-600">{errors.department}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date *</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => handleInputChange("joinDate", e.target.value)}
                  className={errors.joinDate ? "border-red-300 focus:border-red-300 focus:ring-red-100" : ""}
                />
                {errors.joinDate && <p className="text-sm text-red-600">{errors.joinDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL (Optional)</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => handleInputChange("avatar", e.target.value)}
                  placeholder="Enter avatar image URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: "active" | "inactive") => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Link to="/">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;
