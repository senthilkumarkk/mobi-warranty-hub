import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Shield, 
  Calendar, 
  Package, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Phone,
  Edit
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "customer";

  // Mock product detail
  const product = {
    id: id,
    name: "Smart Refrigerator XR-500",
    model: "XR-500-2023",
    purchaseDate: "2024-01-15",
    installationDate: "2024-01-20",
    warrantyStatus: "active",
    warrantyExpiry: "2026-01-15",
    warrantyPeriod: "2 Years",
    serialNumber: "REF2024001",
    customerPhone: "9876543210",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    invoiceNumber: "INV2024-001",
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-6 h-6 text-success" />;
      case "expiring":
        return <Clock className="w-6 h-6 text-warning" />;
      case "expired":
        return <AlertCircle className="w-6 h-6 text-destructive" />;
      default:
        return <Shield className="w-6 h-6 text-muted-foreground" />;
    }
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

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Product Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.model}</p>
            </div>
            <Badge className={`${getStatusColor(product.warrantyStatus)} text-lg px-4 py-2`}>
              {product.warrantyStatus.toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Serial Number</p>
                <p className="font-medium text-card-foreground">{product.serialNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Invoice Number</p>
                <p className="font-medium text-card-foreground">{product.invoiceNumber}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Warranty Status */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            {getStatusIcon(product.warrantyStatus)}
            <h2 className="text-2xl font-semibold text-card-foreground">Warranty Status</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Purchase Date</p>
                <p className="font-semibold text-card-foreground">
                  {new Date(product.purchaseDate).toLocaleDateString()}
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Installation Date</p>
                <p className="font-semibold text-card-foreground">
                  {new Date(product.installationDate).toLocaleDateString()}
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Warranty Period</p>
                <p className="font-semibold text-card-foreground">{product.warrantyPeriod}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Warranty Expires</p>
                <p className="font-semibold text-card-foreground">
                  {new Date(product.warrantyExpiry).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Details (for distributors) */}
        {userRole === "distributor" && (
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-card-foreground">Customer Details</h2>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Update Phone
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium text-card-foreground">{product.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium text-card-foreground">{product.customerPhone}</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/service-request")}
            className="w-full"
          >
            Raise Service Request
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/service-history")}
            className="w-full"
          >
            View Service History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
