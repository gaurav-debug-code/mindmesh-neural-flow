
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { NodeEditor } from "@/components/NodeEditor";
import { FocusMode } from "@/components/FocusMode";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're at the root dashboard route
  const isRootDashboard = location.pathname === "/dashboard";

  // Placeholder for user logout
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-neural-background overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-neural-muted/30 p-4 bg-neural-muted/10 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold neural-text">Dashboard</h1>
            
            <div className="flex items-center space-x-4">
              {isRootDashboard && (
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    onClick={() => navigate("/dashboard/node-editor")}
                    className="bg-neural-primary hover:bg-neural-primary/90"
                  >
                    Node Editor
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/dashboard/focus")}
                  >
                    Focus Mode
                  </Button>
                </div>
              )}
              
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          {isRootDashboard ? (
            <div className="p-4">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <NodeEditor />
                  </div>
                  <div className="neural-card p-6">
                    <h2 className="text-xl font-medium mb-4 neural-text">Your Neural Network</h2>
                    <div className="flex items-center justify-center h-64 border border-dashed border-neural-muted/50 rounded-lg">
                      <p className="text-muted-foreground text-center">
                        3D visualization of your neural network will appear here.<br />
                        Create some nodes to get started.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
