import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingActionButton: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 xl:hidden z-50">
      <Button 
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>
    </div>
  );
};

export default FloatingActionButton;