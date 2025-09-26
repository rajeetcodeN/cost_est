import React, { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import PriceCalculator from '@/components/PriceCalculator';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleProductSelect = (product: string) => {
    setSelectedProduct(product);
  };

  const handleSendToChat = (message: string) => {
    // Use the global function to send message to chat
    if ((window as any).sendMessageToChat) {
      (window as any).sendMessageToChat(message);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-background">
      {/* Chat Panel - Top on mobile, Left on desktop */}
      <div className="flex-1 lg:w-1/2 border-b lg:border-b-0 lg:border-r border-border min-h-0 lg:h-screen lg:overflow-hidden">
        <ChatInterface 
          onProductSelect={handleProductSelect}
          onReceiveMessage={(message) => {
            // This enables the global function setup in ChatInterface
            console.log('Received message from form:', message);
          }}
          onFormFill={(data) => {
            // Form fill functionality handled via window global
          }}
        />
      </div>
      
      {/* Calculator Panel - Bottom on mobile, Right on desktop */}
      <div className="flex-1 lg:w-1/2 min-h-0 lg:h-screen lg:overflow-auto">
        <PriceCalculator 
          selectedProduct={selectedProduct} 
          onSendToChat={handleSendToChat}
          onFormFill={(data) => {
            // Form fill functionality handled via window global
          }}
        />
      </div>
    </div>
  );
};

export default Index;
