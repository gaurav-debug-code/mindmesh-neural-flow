
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNodes } from "@/hooks/useNodes";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const TimeCapsule = () => {
  const { nodes } = useNodes();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // For demo purposes, we'll just show the current nodes
  // In a real app, you would fetch historical data based on the selected date
  
  const moveDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold neural-text flex items-center gap-2">
          <Clock className="h-8 w-8" />
          Time Capsule
        </h1>
      </div>
      
      <div className="neural-card p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => moveDate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Day
          </Button>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-lg font-medium">{format(selectedDate, 'PPP')}</span>
          </div>
          
          <Button variant="outline" onClick={() => moveDate(1)} disabled={
            selectedDate.toDateString() === new Date().toDateString()
          }>
            Next Day
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="border-t border-neural-muted/30 pt-6">
          <h2 className="text-xl font-medium mb-4">Your Neural Network on {format(selectedDate, 'MMM d, yyyy')}</h2>
          
          {nodes.length > 0 ? (
            <div className="space-y-4">
              {nodes.map(node => (
                <div key={node.id} className="p-4 border border-neural-muted/30 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">{node.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      Created: {format(new Date(node.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
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
            <div className="text-center py-12">
              <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No nodes were created on this date.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="neural-card p-6">
        <h2 className="text-xl font-medium mb-4">Journal Entries</h2>
        <div className="text-center py-12 text-muted-foreground">
          <p>Journal entries feature coming soon!</p>
          <p className="mt-2">Track your thoughts and reflections alongside your neural network.</p>
        </div>
      </div>
    </div>
  );
};

export default TimeCapsule;
