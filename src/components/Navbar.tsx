
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate("/dashboard");
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 py-4 ${transparent ? "bg-transparent" : "bg-neural-background backdrop-blur-md border-b border-neural-muted/30"}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2 text-foreground">
            <Brain className="h-8 w-8 text-neural-primary" />
            <span className="font-bold text-xl neural-text">MindMesh</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setShowAuthModal(true)}
              className="border-neural-primary/50 hover:border-neural-primary text-neural-primary hover:text-neural-primary/90 hover:bg-neural-primary/10"
            >
              Login
            </Button>
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-neural-primary to-neural-secondary hover:opacity-90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};
