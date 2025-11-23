import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  Shield, 
  History, 
  User, 
  LogOut, 
  Plus,
  Search,
  Phone
} from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Smart Refrigerator XR-500",
    model: "XR-500-2023",
    purchaseDate: "2024-01-15",
    warrantyStatus: "active",
    warrantyExpiry: "2026-01-15",
    serialNumber: "REF2024001",
    customerPhone: "9876543210"
  },
  {
    id: "2",
    name: "Washing Machine ProClean",
    model: "PC-800-DLX",
    purchaseDate: "2023-08-20",
    warrantyStatus: "expiring",
    warrantyExpiry: "2024-12-20",
    serialNumber: "WM2023045",
    customerPhone: "9876543210"
  },
  {
    id: "3",
    name: "Air Conditioner CoolBreeze",
    model: "CB-1.5T-INV",
    purchaseDate: "2022-05-10",
    warrantyStatus: "expired",
    warrantyExpiry: "2023-05-10",
    serialNumber: "AC2022089",
    customerPhone: "9876543211"
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const userRole = localStorage.getItem("userRole") || "customer";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "expiring":
        return "bg-warning text-warning-foreground";
      case "expired":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-card-foreground">
              {userRole === "customer" ? "My Products" : "Distributor Portal"}
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => navigate("/register-warranty")} className="gap-2">
            <Plus className="w-4 h-4" />
            Register Warranty
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/register-warranty")}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium">Register Warranty</span>
            </div>
          </Card>
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/service-request")}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <Package className="w-8 h-8 text-accent" />
              <span className="text-sm font-medium">Service Request</span>
            </div>
          </Card>
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/service-history")}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <History className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium">Service History</span>
            </div>
          </Card>
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/profile")}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <User className="w-8 h-8 text-accent" />
              <span className="text-sm font-medium">Profile</span>
            </div>
          </Card>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            {userRole === "customer" ? "Your Products" : "Products Sold"}
          </h2>
          
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.model}</p>
                    </div>
                    <Badge className={getStatusColor(product.warrantyStatus)}>
                      {product.warrantyStatus.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Serial: </span>
                      <span className="text-card-foreground font-medium">{product.serialNumber}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Purchase: </span>
                      <span className="text-card-foreground">{new Date(product.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    {userRole === "distributor" && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-card-foreground">{product.customerPhone}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Warranty Expires: </span>
                      <span className="text-card-foreground">{new Date(product.warrantyExpiry).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${product.id}`);
                }}>
                  View Details
                </Button>
              </div>
            </Card>
          ))}

          {filteredProducts.length === 0 && (
            <Card className="p-12 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No Products Found</h3>
              <p className="text-muted-foreground">Try adjusting your search or register a new warranty</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
