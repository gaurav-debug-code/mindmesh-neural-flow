
import { useEffect } from "react";
import { NodeEditor as NodeEditorComponent } from "@/components/NodeEditor";
import { useNodes } from "@/hooks/useNodes";

const NodeEditor = () => {
  const { nodes } = useNodes();

  useEffect(() => {
    // Console log the current nodes when the component mounts
    console.log("Current nodes:", nodes);
  }, [nodes]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <NodeEditorComponent />
        </div>
        <div className="neural-card p-6">
          <h2 className="text-xl font-medium mb-4 neural-text">Your Neural Network</h2>
          {nodes.length > 0 ? (
            <div className="space-y-4">
              {nodes.map(node => (
                <div key={node.id} className="p-4 border border-neural-muted/30 rounded-lg">
                  <h3 className="text-lg font-medium">{node.title}</h3>
                  <p className="text-muted-foreground">{node.description}</p>
                  <div className="mt-2">
                    <span className="inline-block bg-neural-muted/20 text-xs px-2 py-1 rounded">
                      {node.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 border border-dashed border-neural-muted/50 rounded-lg">
              <p className="text-muted-foreground text-center">
                No nodes created yet.<br />
                Use the form to add your first node.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NodeEditor;
