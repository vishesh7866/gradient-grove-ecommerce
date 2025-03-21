
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { User, ShieldCheck, Package, CreditCard, History } from 'lucide-react';

// Define schemas for the forms
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters" }),
  confirmPassword: z.string().min(8),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const OrdersList = () => {
  // Mock orders data
  const orders = [
    { id: 'ORD-1234', date: '2023-05-15', status: 'Delivered', total: 129.99 },
    { id: 'ORD-5678', date: '2023-04-20', status: 'Shipped', total: 89.99 },
  ];

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={40} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-medium mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">When you place orders, they will appear here</p>
          <Button asChild>
            <a href="/products">Start Shopping</a>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Order {order.id}</CardTitle>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                    'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <CardDescription>
                  Placed on {order.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span>Total: ${order.total.toFixed(2)}</span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const AddressesList = () => {
  // Mock addresses
  const addresses = [
    { id: 1, name: 'Home', street: '123 Main St', city: 'Los Angeles', state: 'CA', zipcode: '90001' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Saved Addresses</h3>
        <Button size="sm">Add New</Button>
      </div>
      
      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't saved any addresses yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(address => (
            <Card key={address.id} className="relative">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{address.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{address.street}</p>
                <p className="text-sm">{address.city}, {address.state} {address.zipcode}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Payment Methods</h3>
        <Button size="sm">Add New</Button>
      </div>
      
      <div className="text-center py-12">
        <CreditCard size={40} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-medium mb-2">No payment methods</h3>
        <p className="text-gray-500 mb-6">Add a payment method for faster checkout</p>
        <Button>Add Payment Method</Button>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile form
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  // Password form
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    // In a real app, you would update the user's profile on the server
    console.log("Profile update:", data);
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  const onPasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    // In a real app, you would update the user's password on the server
    console.log("Password update:", data);
    toast.success("Password updated successfully");
    passwordForm.reset();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-16 page-enter">
        <div className="container mx-auto px-6">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Please log in</h1>
            <p className="mb-8">You need to be logged in to view your profile.</p>
            <Button asChild>
              <a href="/login">Log In</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 page-enter">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="overflow-x-auto flex-wrap gap-2 px-1">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <History size={16} />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-2">
                <Package size={16} />
                <span>Addresses</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard size={16} />
                <span>Payment Methods</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <ShieldCheck size={16} />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Personal Information</CardTitle>
                    {!isEditing && (
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-3">
                          <Button type="submit">Save Changes</Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-gray-500">Name</Label>
                        <p className="font-medium">{user?.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Email</Label>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => {
                    logout();
                    toast.success("Logged out successfully");
                    window.location.href = "/";
                  }}
                >
                  Log Out
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <OrdersList />
            </TabsContent>
            
            <TabsContent value="addresses">
              <AddressesList />
            </TabsContent>
            
            <TabsContent value="payment">
              <PaymentMethods />
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Update Password</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
