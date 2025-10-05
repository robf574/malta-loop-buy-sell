import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  className,
  children 
}) => {
  return (
    <div className={cn("text-center space-y-2", className)}>
      <h1 className="text-4xl font-black text-amber-800 tracking-wide">
        {title}
      </h1>
      {subtitle && (
        <p className="text-amber-600 font-medium text-lg">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  className,
  children 
}) => {
  return (
    <div className={cn("space-y-1", className)}>
      <h2 className="text-2xl font-black text-amber-800 tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="text-amber-600 font-medium">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  title, 
  subtitle, 
  className,
  children 
}) => {
  return (
    <div className={cn("space-y-1", className)}>
      <h3 className="text-xl font-black text-amber-800 tracking-wide">
        {title}
      </h3>
      {subtitle && (
        <p className="text-amber-600 font-medium text-sm">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};
