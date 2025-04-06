
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { NodeEditor } from "@/components/NodeEditor";
import { FocusMode } from "@/components/FocusMode";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

enum DashboardView {
  NODE_EDITOR = "node-editor",
  FOCUS_MODE = "focus-mode",
}

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<DashboardView>(DashboardView.NODE_EDITOR);
  const { toast } = useToast();
  const navigate = useNavigate();

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
              <div className="flex gap-2">
                <Button 
                  variant={currentView === DashboardView.NODE_EDITOR ? "default" : "outline"} 
                  onClick={() => setCurrentView(DashboardView.NODE_EDITOR)}
                  className={currentView === DashboardView.NODE_EDITOR ? "bg-neural-primary hover:bg-neural-primary/90" : ""}
                >
                  Node Editor
                </Button>
                <Button 
                  variant={currentView === DashboardView.FOCUS_MODE ? "default" : "outline"} 
                  onClick={() => setCurrentView(DashboardView.FOCUS_MODE)}
                  className={currentView === DashboardView.FOCUS_MODE ? "bg-neural-primary hover:bg-neural-primary/90" : ""}
                >
                  Focus Mode
                </Button>
              </div>
              
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4">
          <div className="container mx-auto">
            {currentView === DashboardView.NODE_EDITOR && (
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
            )}
            
            {currentView === DashboardView.FOCUS_MODE && <FocusMode />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
