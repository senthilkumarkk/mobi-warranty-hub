import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Building2 } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "customer" | "distributor") => {
    localStorage.setItem("userRole", role);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Warranty Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Select your role to continue
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className="p-8 cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary"
            onClick={() => handleRoleSelect("customer")}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-2">Customer</h2>
                <p className="text-muted-foreground">
                  Register warranty, track products, and raise service requests
                </p>
              </div>
              <Button size="lg" className="w-full">
                Continue as Customer
              </Button>
            </div>
          </Card>

          <Card 
            className="p-8 cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary"
            onClick={() => handleRoleSelect("distributor")}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-2">Distributor</h2>
                <p className="text-muted-foreground">
                  Manage customer products, update details, and assist with services
                </p>
              </div>
              <Button size="lg" variant="secondary" className="w-full">
                Continue as Distributor
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
