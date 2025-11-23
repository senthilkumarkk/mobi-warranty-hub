import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCircle2, XCircle, Calendar } from "lucide-react";

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

const ServiceHistory = () => {
  const navigate = useNavigate();

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-warning text-warning-foreground";
      case "cancelled":
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Service History</h1>
          <p className="text-muted-foreground">Track all your service requests and their status</p>
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

          {mockServiceHistory.length === 0 && (
            <Card className="p-12 text-center">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                No Service History
              </h3>
              <p className="text-muted-foreground mb-4">
                You haven't raised any service requests yet
              </p>
              <Button onClick={() => navigate("/service-request")}>
                Raise Service Request
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;
