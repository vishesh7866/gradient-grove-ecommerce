
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Lock, CreditCard, Truck, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally process the order with a payment gateway
    
    toast({
      title: "Order Successful!",
      description: "Your order has been placed successfully.",
    });
    
    // Clear cart and redirect to success page
    clearCart();
    navigate('/checkout/success');
  };
  
  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;

  return (
    <div className="min-h-screen pt-24 pb-16 page-enter">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Add some items to your cart before proceeding to checkout.
              </p>
              <Button asChild className="btn-pulse">
                <a href="/products">Shop Now</a>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Column - Shipping & Payment */}
                <div>
                  <Accordion type="single" defaultValue="shipping" collapsible className="w-full">
                    {/* Shipping Information */}
                    <AccordionItem value="shipping" className="border rounded-lg p-4 mb-6">
                      <AccordionTrigger className="py-2">
                        <div className="flex items-center">
                          <Truck className="mr-2 h-5 w-5" />
                          <span className="text-lg font-medium">Shipping Information</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              name="firstName"
                              value={shippingInfo.firstName}
                              onChange={handleShippingChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              name="lastName"
                              value={shippingInfo.lastName}
                              onChange={handleShippingChange}
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email"
                              type="email"
                              value={shippingInfo.email}
                              onChange={handleShippingChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              name="phone"
                              value={shippingInfo.phone}
                              onChange={handleShippingChange}
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleShippingChange}
                            required 
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              name="city"
                              value={shippingInfo.city}
                              onChange={handleShippingChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input 
                              id="state" 
                              name="state"
                              value={shippingInfo.state}
                              onChange={handleShippingChange}
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input 
                              id="zip" 
                              name="zip"
                              value={shippingInfo.zip}
                              onChange={handleShippingChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input 
                              id="country" 
                              name="country"
                              value={shippingInfo.country}
                              onChange={handleShippingChange}
                              required 
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Payment Method */}
                    <AccordionItem value="payment" className="border rounded-lg p-4">
                      <AccordionTrigger className="py-2">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-5 w-5" />
                          <span className="text-lg font-medium">Payment Method</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <RadioGroup 
                          value={paymentMethod} 
                          onValueChange={setPaymentMethod}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                              <img src="https://cdn-icons-png.flaticon.com/512/179/179431.png" alt="Credit Card" className="w-8 h-8 mr-2" />
                              Credit Card
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                              <img src="https://cdn-icons-png.flaticon.com/512/174/174861.png" alt="PayPal" className="w-8 h-8 mr-2" />
                              PayPal
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="apple-pay" id="apple-pay" />
                            <Label htmlFor="apple-pay" className="flex items-center cursor-pointer">
                              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968144.png" alt="Apple Pay" className="w-8 h-8 mr-2" />
                              Apple Pay
                            </Label>
                          </div>
                        </RadioGroup>
                        
                        {paymentMethod === 'credit-card' && (
                          <div className="mt-6 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input 
                                id="cardNumber" 
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={cardInfo.cardNumber}
                                onChange={handleCardChange}
                                required 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input 
                                id="cardName" 
                                name="cardName"
                                placeholder="John Doe"
                                value={cardInfo.cardName}
                                onChange={handleCardChange}
                                required 
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input 
                                  id="expiry" 
                                  name="expiry"
                                  placeholder="MM/YY"
                                  value={cardInfo.expiry}
                                  onChange={handleCardChange}
                                  required 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input 
                                  id="cvc" 
                                  name="cvc"
                                  placeholder="123"
                                  value={cardInfo.cvc}
                                  onChange={handleCardChange}
                                  required 
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                {/* Right Column - Order Summary */}
                <div>
                  <div className="border rounded-lg p-6 bg-white shadow-sm">
                    <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                    
                    <div className="space-y-4 max-h-64 overflow-auto mb-4">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <div className="flex">
                            <div className="w-16 h-16 rounded overflow-hidden mr-3">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                                {item.size && ` / Size: ${item.size}`}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full btn-pulse">
                      <Lock className="h-4 w-4 mr-2" />
                      Place Order
                    </Button>
                    
                    <div className="mt-6 text-center text-sm text-gray-500">
                      <div className="flex items-center justify-center mb-2">
                        <Lock className="h-4 w-4 mr-1" />
                        Secure Checkout
                      </div>
                      <p>
                        Your payment information is processed securely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
