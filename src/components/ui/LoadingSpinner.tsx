import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`}></div>
      {text && <p className="text-muted-foreground text-sm">{text}</p>}
    </div>
  );
};

export const PageLoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <LoadingSpinner size="lg" text="Loading page..." />
  </div>
);
