import { useState, useEffect } from "react";
import { LandingScene } from "@/components/LandingScene";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { useNavigate } from "react-router-dom";
import { Brain, Lightbulb, Zap, LineChart, Lock, Calendar, Check } from "lucide-react";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate("/dashboard");
  };

  return (
    <>
      <div className="neural-bg min-h-screen overflow-x-hidden">
        <Navbar transparent />
        
        <LandingScene />
        
        <section className="relative min-h-screen flex items-center justify-center px-4">
          <div className={`container mx-auto text-center transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 inline-flex items-center py-1 px-3 rounded-full bg-neural-muted/20 border border-neural-primary/20 neural-glow">
                <div className="w-2 h-2 rounded-full bg-neural-primary mr-2 animate-pulse"></div>
                <span className="text-sm">Now in public beta</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 neural-text">
                Visualize Your Thoughts as a Neural Network
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                MindMesh transforms the way you organize your ideas, goals, and tasks with a dynamic 3D neural network visualization.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button 
                  size="lg"
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-neural-primary to-neural-secondary hover:opacity-90 text-lg"
                >
                  Get Started — It's Free
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-neural-primary/50 hover:border-neural-primary text-neural-primary hover:text-neural-primary/90 hover:bg-neural-primary/10 text-lg"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 neural-text">
                Organize Your Mind, Unlock Your Potential
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                MindMesh combines cutting-edge visualization with powerful productivity tools to help you see the connections between your thoughts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "3D Neural Visualization",
                  description: "Visualize your goals, tasks, and ideas as an interactive 3D neural network that evolves as you think."
                },
                {
                  icon: Zap,
                  title: "Focus Mode",
                  description: "Eliminate distractions and dive deep into your work with our specialized focus tools and timers."
                },
                {
                  icon: Lightbulb,
                  title: "Connect Your Thoughts",
                  description: "Create connections between different areas of your life and discover insights you might have missed."
                },
                {
                  icon: LineChart,
                  title: "Track Progress",
                  description: "Monitor your progress over time and see how your mind map evolves with the time capsule feature."
                },
                {
                  icon: Lock,
                  title: "Premium Features",
                  description: "Upgrade for AI-powered recommendations, enhanced visualization options, and collaborative mind mapping."
                },
                {
                  icon: Calendar,
                  title: "Calendar Integration",
                  description: "Connect your calendar to visualize your schedule alongside your goals and tasks within your neural network."
                }
              ].map((feature, index) => (
                <div key={index} className="neural-card p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neural-muted/30 mb-4 neural-glow">
                    <feature.icon className="h-6 w-6 text-neural-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="how-it-works" className="py-20 px-4 bg-neural-muted/10">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 neural-text">
                How MindMesh Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Getting started is simple. Create an account, set up your first nodes, and watch your neural network come to life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Create Your Account",
                  description: "Sign up for free and set up your personal neural network."
                },
                {
                  step: "02",
                  title: "Add Your First Nodes",
                  description: "Create nodes for different areas of your life — work, learning, wellness, and creativity."
                },
                {
                  step: "03",
                  title: "Connect and Visualize",
                  description: "Connect related nodes and watch your 3D neural network visualization come to life."
                }
              ].map((step, index) => (
                <div key={index} className="neural-card p-6 relative">
                  <div className="text-4xl font-bold text-neural-primary/20 absolute top-4 right-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-medium mb-2 mt-8">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-neural-primary to-neural-secondary hover:opacity-90"
              >
                Start Building Your Network
              </Button>
            </div>
          </div>
        </section>
        
        <section id="pricing" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 neural-text">
                Choose Your Plan
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start for free or upgrade for premium features to enhance your neural network experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Free",
                  price: "$0",
                  description: "Perfect for getting started",
                  features: [
                    "Basic 3D visualization",
                    "Up to 50 nodes",
                    "Focus mode",
                    "Standard node styles",
                  ],
                  buttonText: "Get Started",
                  popular: false
                },
                {
                  name: "Pro",
                  price: "$9.99",
                  period: "/month",
                  description: "For serious productivity enthusiasts",
                  features: [
                    "Advanced 3D visualization",
                    "Unlimited nodes",
                    "Enhanced focus mode",
                    "Custom node styles",
                    "AI-powered insights",
                    "Priority support"
                  ],
                  buttonText: "Upgrade to Pro",
                  popular: true
                },
                {
                  name: "Team",
                  price: "$19.99",
                  period: "/month",
                  description: "For collaborative teams",
                  features: [
                    "Everything in Pro",
                    "Collaborative mind maps",
                    "Team dashboards",
                    "Advanced integrations",
                    "Admin controls",
                    "Dedicated support"
                  ],
                  buttonText: "Contact Sales",
                  popular: false
                }
              ].map((plan, index) => (
                <div key={index} className={`neural-card p-6 relative ${plan.popular ? 'border-neural-primary neural-glow' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-neural-primary text-white text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold neural-text">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-neural-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-neural-primary to-neural-secondary hover:opacity-90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => setShowAuthModal(true)}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <footer className="py-12 px-4 border-t border-neural-muted/30">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Brain className="h-6 w-6 text-neural-primary" />
                <span className="font-bold ml-2 neural-text">MindMesh</span>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
              </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MindMesh. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Index;
