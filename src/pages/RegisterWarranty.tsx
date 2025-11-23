import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterWarranty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    productId: "",
    installationDate: "",
  });

  const mockProducts = [
    { id: "1", name: "Smart Refrigerator XR-500" },
    { id: "2", name: "Washing Machine ProClean" },
    { id: "3", name: "Air Conditioner CoolBreeze" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productId || !formData.installationDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Warranty Activated!",
      description: "Your warranty has been successfully registered",
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-card-foreground">
                Register Warranty
              </h1>
              <p className="text-muted-foreground">Activate warranty for your product</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Select Product *
              </label>
              <Select
                value={formData.productId}
                onValueChange={(value) =>
                  setFormData({ ...formData, productId: value })
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
                Installation Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="date"
                  value={formData.installationDate}
                  onChange={(e) =>
                    setFormData({ ...formData, installationDate: e.target.value })
                  }
                  max={new Date().toISOString().split('T')[0]}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Warranty will be calculated from this date
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-card-foreground mb-2">Important Information</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Warranty period starts from installation date</li>
                <li>• Keep your invoice and serial number safe</li>
                <li>• Register within 30 days of purchase for best coverage</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Activate Warranty
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterWarranty;
