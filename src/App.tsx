
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import NodeEditor from "@/pages/NodeEditor";
import NeuralMap from "@/pages/NeuralMap";
import FocusMode from "@/pages/FocusMode";
import TimeCapsule from "@/pages/TimeCapsule";
import CalendarView from "@/pages/CalendarView";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/node-editor" element={<NodeEditor />} />
            <Route path="/dashboard/neural-map" element={<NeuralMap />} />
            <Route path="/dashboard/focus" element={<FocusMode />} />
            <Route path="/dashboard/time-capsule" element={<TimeCapsule />} />
            <Route path="/dashboard/calendar" element={<CalendarView />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
