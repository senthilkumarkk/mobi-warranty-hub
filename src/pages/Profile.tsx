import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, User, Mail, MapPin, Phone, Save } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userMobile = localStorage.getItem("userMobile") || "";
  const userRole = localStorage.getItem("userRole") || "customer";

  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: userMobile,
    address: "123 Main Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-card-foreground">
                My Profile
              </h1>
              <p className="text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  value={formData.phone}
                  disabled
                  className="pl-10 bg-muted"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Phone number cannot be changed
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-card-foreground mb-4">Address Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Street Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      City
                    </label>
                    <Input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      State
                    </label>
                    <Input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="max-w-xs">
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    PIN Code
                  </label>
                  <Input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                    maxLength={6}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
