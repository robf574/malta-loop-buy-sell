import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return (
    <Card className="w-full max-w-md relative z-10 bg-white shadow-2xl border-2 border-white">
      <CardHeader className="text-center bg-gradient-to-b from-amber-50 to-white">
        <CardTitle className="text-4xl font-black text-amber-800 tracking-wide">
          MELA MALTA
        </CardTitle>
        <CardDescription className="text-amber-600 font-medium text-lg">
          Valletta's Beautiful Marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
