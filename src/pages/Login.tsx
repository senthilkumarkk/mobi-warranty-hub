import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Smartphone } from "lucide-react";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = localStorage.getItem("userRole") || "customer";

  const handleSendOTP = () => {
    if (mobile.length !== 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: "A 6-digit OTP has been sent to your mobile number",
    });
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userMobile", mobile);
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <Card className="w-full max-w-md p-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-card-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-center">
            Login as {userRole === "customer" ? "Customer" : "Distributor"}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Mobile Number
            </label>
            <Input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              disabled={otpSent}
              maxLength={10}
            />
          </div>

          {!otpSent ? (
            <Button onClick={handleSendOTP} className="w-full" size="lg">
              Send OTP
            </Button>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Enter OTP
                </label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                />
              </div>

              <Button onClick={handleVerifyOTP} className="w-full" size="lg">
                Verify & Login
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="w-full"
              >
                Resend OTP
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Login;
