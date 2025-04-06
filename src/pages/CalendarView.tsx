
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useNodes } from "@/hooks/useNodes";

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { nodes } = useNodes();
  
  // This would normally come from a database
  // For demo purposes, we'll use the nodes from the store
  const eventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    // Filter nodes that were created on the selected date
    // In a real app, you would have actual calendar events
    return nodes.filter(node => {
      const nodeDate = new Date(node.createdAt);
      return nodeDate.toDateString() === selectedDate.toDateString();
    });
  };
  
  const selectedDateEvents = eventsForDate(date);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold neural-text flex items-center gap-2">
          <CalendarIcon className="h-8 w-8" />
          Calendar
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="neural-card p-6 col-span-1">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Select Date</h2>
              <div className="flex space-x-1">
                <Button variant="outline" size="icon" onClick={() => {
                  const prevMonth = new Date(date!);
                  prevMonth.setMonth(prevMonth.getMonth() - 1);
                  setDate(prevMonth);
                }}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => {
                  const nextMonth = new Date(date!);
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  setDate(nextMonth);
                }}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
        </Card>
        
        <Card className="neural-card p-6 col-span-2">
          <div className="space-y-4">
            <h2 className="text-xl font-medium">
              {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
            </h2>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="p-4 border border-neural-muted/30 rounded-lg">
                    <h3 className="text-lg font-medium">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                    <div className="mt-2">
                      <span className="inline-block bg-neural-muted/20 text-xs px-2 py-1 rounded">
                        {event.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed border-neural-muted/50 rounded-lg">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No events on this date.<br />
                  Create a new node to add it to your calendar.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CalendarView;
