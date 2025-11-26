import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  LogOut, 
  Plus,
  Search,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Upload,
  HelpCircle,
  BookOpen,
  Wrench
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const mockServiceHistory = [
  {
    id: "1",
    productName: "Smart Refrigerator XR-500",
    requestDate: "2024-03-15",
    status: "completed",
    description: "Cooling issue - Temperature not maintaining",
    resolution: "Replaced thermostat and refilled refrigerant",
    completedDate: "2024-03-18",
    technicianName: "Mike Johnson"
  },
  {
    id: "2",
    productName: "Washing Machine ProClean",
    requestDate: "2024-03-10",
    status: "in-progress",
    description: "Water leakage from bottom",
    scheduledDate: "2024-03-20"
  },
  {
    id: "3",
    productName: "Air Conditioner CoolBreeze",
    requestDate: "2023-12-05",
    status: "completed",
    description: "Not cooling properly, making noise",
    resolution: "Cleaned filters and fixed compressor",
    completedDate: "2023-12-08",
    technicianName: "Sarah Williams"
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    productId: "",
    issueDescription: "",
  });
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-warning" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceFormData.productId || !serviceFormData.issueDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Service Request Created",
      description: "Your request has been submitted. We'll contact you soon.",
    });
    
    setShowServiceForm(false);
    setServiceFormData({ productId: "", issueDescription: "" });
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-card-foreground">
              {userRole === "customer" ? "My Portal" : "Distributor Portal"}
            </h1>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4 text-primary" />
              My Products
            </TabsTrigger>
            <TabsTrigger value="service" className="gap-2">
              <Wrench className="w-4 h-4 text-accent" />
              Service Request
            </TabsTrigger>
            <TabsTrigger value="support" className="gap-2">
              <HelpCircle className="w-4 h-4 text-success" />
              Support
            </TabsTrigger>
          </TabsList>

          {/* My Products Tab */}
          <TabsContent value="products" className="space-y-4">
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

            <div className="space-y-4">
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
          </TabsContent>

          {/* Service Request Tab */}
          <TabsContent value="service" className="space-y-6">
            {!showServiceForm ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Service History</h2>
                  <Button onClick={() => setShowServiceForm(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Request
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockServiceHistory.map((service) => (
                    <Card key={service.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(service.status)}
                            <h3 className="text-lg font-semibold text-card-foreground">
                              {service.productName}
                            </h3>
                          </div>
                          <Badge className={getStatusColor(service.status)}>
                            {service.status.toUpperCase().replace("-", " ")}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <span className="text-muted-foreground">Request Date: </span>
                              <span className="text-card-foreground font-medium">
                                {new Date(service.requestDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          {service.completedDate && (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-success" />
                              <div>
                                <span className="text-muted-foreground">Completed: </span>
                                <span className="text-card-foreground font-medium">
                                  {new Date(service.completedDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          )}
                          {service.scheduledDate && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-warning" />
                              <div>
                                <span className="text-muted-foreground">Scheduled: </span>
                                <span className="text-card-foreground font-medium">
                                  {new Date(service.scheduledDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm font-medium text-card-foreground mb-1">Issue Description</p>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>

                        {service.resolution && (
                          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                            <p className="text-sm font-medium text-success mb-1">Resolution</p>
                            <p className="text-sm text-card-foreground">{service.resolution}</p>
                            {service.technicianName && (
                              <p className="text-xs text-muted-foreground mt-2">
                                Technician: {service.technicianName}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-card-foreground">
                        New Service Request
                      </h2>
                      <p className="text-muted-foreground">Describe the issue you're facing</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setShowServiceForm(false)}>
                    Cancel
                  </Button>
                </div>

                <form onSubmit={handleServiceSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Select Product *
                    </label>
                    <Select
                      value={serviceFormData.productId}
                      onValueChange={(value) =>
                        setServiceFormData({ ...serviceFormData, productId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Describe the Issue *
                    </label>
                    <Textarea
                      placeholder="Please describe the problem in detail..."
                      value={serviceFormData.issueDescription}
                      onChange={(e) =>
                        setServiceFormData({ ...serviceFormData, issueDescription: e.target.value })
                      }
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Upload Photo (Optional)
                    </label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {selectedImage ? (
                          <div className="space-y-2">
                            <img
                              src={selectedImage}
                              alt="Preview"
                              className="max-h-48 mx-auto rounded-lg"
                            />
                            <p className="text-sm text-success">Image uploaded successfully</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                            <div>
                              <p className="text-sm font-medium text-card-foreground">
                                Click to upload image
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-card-foreground mb-2">What happens next?</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• We'll review your request within 24 hours</li>
                      <li>• Our service team will contact you to schedule a visit</li>
                      <li>• Track your request status in this tab</li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </Card>
            )}
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Support Center</h2>

            {/* FAQs */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-card-foreground">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-card-foreground mb-1">How do I register a warranty?</h4>
                  <p className="text-sm text-muted-foreground">
                    Go to "My Products" tab and click "Register Warranty". Select your product, enter the installation date, and submit.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-card-foreground mb-1">How long does it take to resolve a service request?</h4>
                  <p className="text-sm text-muted-foreground">
                    We review all requests within 24 hours and typically schedule service visits within 2-3 business days.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-card-foreground mb-1">What is covered under warranty?</h4>
                  <p className="text-sm text-muted-foreground">
                    Manufacturing defects and component failures are covered. Physical damage and misuse are not covered.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-card-foreground mb-1">Can I extend my warranty?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, contact our support team before your current warranty expires to discuss extension options.
                  </p>
                </div>
              </div>
            </Card>

            {/* User Guides */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-semibold text-card-foreground">User Guides</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-card-foreground mb-2">Product Registration Guide</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Step-by-step instructions to register your product and activate warranty coverage.
                  </p>
                  <Button variant="outline" size="sm">View Guide</Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-card-foreground mb-2">Service Request Process</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Learn how to raise a service request and track its progress effectively.
                  </p>
                  <Button variant="outline" size="sm">View Guide</Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-card-foreground mb-2">Warranty Terms & Conditions</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Understand your warranty coverage, exclusions, and claim procedures.
                  </p>
                  <Button variant="outline" size="sm">View Terms</Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-card-foreground mb-2">Product Maintenance Tips</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Best practices to maintain your products and extend their lifespan.
                  </p>
                  <Button variant="outline" size="sm">View Tips</Button>
                </div>
              </div>
            </Card>

            {/* Troubleshooting */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-card-foreground">Troubleshooting Steps</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-card-foreground mb-2">Refrigerator Not Cooling</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Check if the power cord is properly connected</li>
                    <li>Ensure the temperature setting is correct (2-4°C recommended)</li>
                    <li>Clean the condenser coils at the back</li>
                    <li>Check if the door is closing properly</li>
                    <li>If issue persists, raise a service request</li>
                  </ol>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-card-foreground mb-2">Washing Machine Not Draining</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Check for clogged drain hose or filter</li>
                    <li>Ensure the drain hose is not kinked</li>
                    <li>Clean the filter (usually at the bottom front)</li>
                    <li>Try running the spin cycle again</li>
                    <li>If problem continues, contact service</li>
                  </ol>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-card-foreground mb-2">Air Conditioner Not Cooling</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Check if the filter needs cleaning</li>
                    <li>Ensure outdoor unit is not blocked</li>
                    <li>Verify the temperature setting</li>
                    <li>Check if the remote control batteries are working</li>
                    <li>Schedule professional service if needed</li>
                  </ol>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
