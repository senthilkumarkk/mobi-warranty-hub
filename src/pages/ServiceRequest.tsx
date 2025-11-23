import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Package, Upload, Image as ImageIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServiceRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    productId: "",
    issueDescription: "",
  });

  const mockProducts = [
    { id: "1", name: "Smart Refrigerator XR-500" },
    { id: "2", name: "Washing Machine ProClean" },
    { id: "3", name: "Air Conditioner CoolBreeze" },
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productId || !formData.issueDescription) {
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
    
    setTimeout(() => {
      navigate("/service-history");
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
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-card-foreground">
                Service Request
              </h1>
              <p className="text-muted-foreground">Describe the issue you're facing</p>
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
                Describe the Issue *
              </label>
              <Textarea
                placeholder="Please describe the problem in detail..."
                value={formData.issueDescription}
                onChange={(e) =>
                  setFormData({ ...formData, issueDescription: e.target.value })
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
                <li>• Track your request status in Service History</li>
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
                Submit Request
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ServiceRequest;
