
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 1000);
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold neural-text flex items-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          Settings
        </h1>
      </div>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="account" className="data-[state=active]:neural-text">
            <User className="h-4 w-4 mr-2" /> Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:neural-text">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:neural-text">
            <Palette className="h-4 w-4 mr-2" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:neural-text">
            <Shield className="h-4 w-4 mr-2" /> Privacy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card className="neural-card p-6">
            <h2 className="text-xl font-medium mb-6">Account Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-neural-muted/30">
                <h3 className="text-lg font-medium mb-4">Password</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="neural-card p-6">
            <h2 className="text-xl font-medium mb-6">Notification Preferences</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive updates about your account via email</p>
                </div>
                <Switch defaultChecked id="email-notifications" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Task Reminders</h3>
                  <p className="text-sm text-muted-foreground">Get notified about upcoming tasks and deadlines</p>
                </div>
                <Switch defaultChecked id="task-reminders" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Neural Network Updates</h3>
                  <p className="text-sm text-muted-foreground">Notifications when your network has new suggestions</p>
                </div>
                <Switch id="network-updates" />
              </div>
              
              <div className="flex justify-end pt-4 border-t border-neural-muted/30">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card className="neural-card p-6">
            <h2 className="text-xl font-medium mb-6">Appearance Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="h-20 border-2 border-neural-primary">Light</Button>
                  <Button variant="outline" className="h-20">Dark</Button>
                  <Button variant="outline" className="h-20">System</Button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-neural-muted/30">
                <h3 className="font-medium mb-3">Neural Network Visualization</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">Enable Animations</Label>
                    <Switch defaultChecked id="animations" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-quality">High Quality Rendering</Label>
                    <Switch id="high-quality" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card className="neural-card p-6">
            <h2 className="text-xl font-medium mb-6">Privacy Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Data Usage</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics">Allow Analytics</Label>
                      <p className="text-sm text-muted-foreground">Help us improve MindMesh with anonymous usage data</p>
                    </div>
                    <Switch defaultChecked id="analytics" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="personalization">Enable Personalization</Label>
                      <p className="text-sm text-muted-foreground">Allow AI to personalize your experience</p>
                    </div>
                    <Switch defaultChecked id="personalization" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-neural-muted/30">
                <h3 className="font-medium mb-3">Account Privacy</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">Export All My Data</Button>
                  <Button variant="outline" className="w-full justify-start text-destructive border-destructive hover:bg-destructive/10">
                    Delete Account
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-neural-muted/30">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
