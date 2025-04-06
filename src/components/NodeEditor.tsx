
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNodes } from "@/hooks/useNodes";

interface NodeFormData {
  title: string;
  description: string;
  category: string;
}

const initialFormData: NodeFormData = {
  title: "",
  description: "",
  category: "work"
};

export const NodeEditor: React.FC = () => {
  const [formData, setFormData] = useState<NodeFormData>(initialFormData);
  const { toast } = useToast();
  const { createNode } = useNodes();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the form data
    console.log("Creating node:", formData);
    
    // Create the node in the Redux store
    // Add a random position in 3D space for the node
    createNode({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      position: [
        Math.random() * 10 - 5,  // X between -5 and 5
        Math.random() * 10 - 5,  // Y between -5 and 5
        Math.random() * 10 - 5   // Z between -5 and 5
      ]
    });
    
    // Show success toast
    toast({
      title: "Node created",
      description: `${formData.title} has been added to your neural network.`,
    });
    
    // Reset form
    setFormData(initialFormData);
  };

  return (
    <div className="neural-card p-6">
      <h2 className="text-xl font-medium mb-4 neural-text flex items-center gap-2">
        <Plus className="h-5 w-5" />
        Create New Node
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Node Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter a title for your node"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your node"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="wellness">Wellness</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
              <SelectItem value="creativity">Creativity</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="w-full gap-2">
          <Save className="h-4 w-4" />
          Save Node
        </Button>
      </form>
    </div>
  );
};
