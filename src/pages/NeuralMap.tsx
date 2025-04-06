
import { useState, useEffect } from "react";
import { useNodes } from "@/hooks/useNodes";
import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";

const NeuralMap = () => {
  const { nodes, edges } = useNodes();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the 3D visualization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold neural-text flex items-center gap-2">
          <Network className="h-8 w-8" />
          Neural Map
        </h1>
        <div className="space-x-2">
          <Button variant="outline" size="sm">2D View</Button>
          <Button variant="default" size="sm">3D View</Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>
      
      <div className="neural-card p-6 h-[calc(100vh-200px)] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neural-primary"></div>
          </div>
        ) : nodes.length > 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="flex flex-wrap gap-4 justify-center">
                {nodes.map(node => (
                  <div 
                    key={node.id} 
                    className="p-4 border border-neural-primary/30 bg-neural-muted/10 rounded-lg min-w-[150px] cursor-pointer hover:border-neural-primary transition-colors"
                  >
                    <h3 className="font-medium">{node.title}</h3>
                    <div className="mt-1">
                      <span className="inline-block bg-neural-muted/20 text-xs px-2 py-1 rounded">
                        {node.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground">
                {edges.length > 0 ? 
                  `${edges.length} connections between nodes` : 
                  "No connections yet. Use the Node Editor to create connections."}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <Network className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Your Neural Map is Empty</h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Create nodes using the Node Editor to visualize your neural network here.
              The map will show connections between your ideas, tasks, and goals.
            </p>
            <Button onClick={() => window.location.href = "/dashboard/node-editor"}>
              Create Your First Node
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeuralMap;
