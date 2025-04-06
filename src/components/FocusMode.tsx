
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer, Clock, Calendar, Check } from "lucide-react";

export const FocusMode: React.FC = () => {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const startTimer = (duration: number) => {
    setTimeRemaining(duration * 60);
    setActiveTimer(`${duration}`);
    // In a real app, you would set up an interval here to countdown
  };
  
  const stopTimer = () => {
    setActiveTimer(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold neural-text mb-2">Focus Mode</h1>
        <p className="text-muted-foreground">Eliminate distractions and deep dive into your tasks</p>
      </div>
      
      <Tabs defaultValue="pomodoro" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="pomodoro" className="data-[state=active]:neural-text">Pomodoro</TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:neural-text">Tasks</TabsTrigger>
          <TabsTrigger value="ambient" className="data-[state=active]:neural-text">Ambient</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pomodoro">
          <Card className="neural-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-neural-primary" />
                Pomodoro Timer
              </CardTitle>
              <CardDescription>
                Work in focused intervals with built-in breaks to maximize productivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="text-7xl font-mono neural-text font-bold mb-8 animate-pulse-glow">
                  {formatTime(timeRemaining)}
                </div>
                
                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                  {[25, 15, 5].map((duration) => (
                    <Button
                      key={duration}
                      onClick={() => startTimer(duration)}
                      variant={activeTimer === `${duration}` ? "default" : "outline"}
                      className={activeTimer === `${duration}` ? "bg-neural-primary hover:bg-neural-primary/90" : ""}
                    >
                      {duration} min
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              {activeTimer ? (
                <Button onClick={stopTimer} variant="destructive">
                  Stop Timer
                </Button>
              ) : (
                <p className="text-muted-foreground text-sm text-center">
                  Select a duration to start focusing
                </p>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card className="neural-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-neural-primary" />
                Focus Tasks
              </CardTitle>
              <CardDescription>
                Create a focused task list for your current session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>Task management coming soon in the next update!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ambient">
          <Card className="neural-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-neural-primary" />
                Ambient Mode
              </CardTitle>
              <CardDescription>
                Customizable background sounds and visuals for deep focus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>Ambient focus mode coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
