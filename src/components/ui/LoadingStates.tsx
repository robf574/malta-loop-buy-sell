import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingCardProps {
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ className }) => (
  <Card className={className}>
    <CardContent className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </CardContent>
  </Card>
);

interface LoadingListProps {
  count?: number;
  className?: string;
}

export const LoadingList: React.FC<LoadingListProps> = ({ count = 3, className }) => (
  <div className={`space-y-4 ${className || ''}`}>
    {Array.from({ length: count }).map((_, index) => (
      <LoadingCard key={index} />
    ))}
  </div>
);

interface LoadingGridProps {
  count?: number;
  columns?: number;
  className?: string;
}

export const LoadingGrid: React.FC<LoadingGridProps> = ({ 
  count = 6, 
  columns = 2, 
  className 
}) => (
  <div className={`grid gap-4 ${className || ''}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
    {Array.from({ length: count }).map((_, index) => (
      <LoadingCard key={index} />
    ))}
  </div>
);

interface LoadingFormProps {
  fields?: number;
  className?: string;
}

export const LoadingForm: React.FC<LoadingFormProps> = ({ fields = 4, className }) => (
  <Card className={className}>
    <CardContent className="p-6">
      <div className="space-y-6">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <div className="flex gap-2 pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface LoadingProfileProps {
  className?: string;
}

export const LoadingProfile: React.FC<LoadingProfileProps> = ({ className }) => (
  <Card className={className}>
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface LoadingNavProps {
  className?: string;
}

export const LoadingNav: React.FC<LoadingNavProps> = ({ className }) => (
  <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom ${className || ''}`}>
    <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center justify-center flex-1 h-full gap-1">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  </nav>
);
