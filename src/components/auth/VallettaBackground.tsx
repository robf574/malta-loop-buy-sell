import React from 'react';

export const VallettaBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-100 to-orange-100">
      {/* Warm sky with realistic clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-orange-50 to-yellow-100"></div>
      
      {/* Realistic fluffy clouds */}
      <div className="absolute top-12 left-16 w-32 h-20 bg-gradient-to-br from-white via-orange-50 to-orange-100 rounded-full opacity-90 shadow-lg"></div>
      <div className="absolute top-20 right-20 w-28 h-16 bg-gradient-to-bl from-white via-orange-50 to-orange-100 rounded-full opacity-85 shadow-lg"></div>
      <div className="absolute top-16 left-1/2 w-24 h-14 bg-gradient-to-br from-white via-orange-50 to-orange-100 rounded-full opacity-80 shadow-lg"></div>
      <div className="absolute top-8 right-1/3 w-20 h-12 bg-gradient-to-bl from-white via-orange-50 to-orange-100 rounded-full opacity-75 shadow-lg"></div>
      
      {/* Valletta Cityscape - Golden limestone buildings */}
      <div className="absolute bottom-0 left-0 w-full h-2/3">
        {/* Main city buildings - tiered like Valletta */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          {/* Lower tier buildings */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600">
            {/* Building facades with windows */}
            <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-t from-amber-900 to-amber-700">
              <div className="absolute top-4 left-2 w-2 h-3 bg-amber-800 rounded-sm"></div>
              <div className="absolute top-4 left-5 w-2 h-3 bg-amber-800 rounded-sm"></div>
              <div className="absolute top-8 left-2 w-2 h-3 bg-amber-800 rounded-sm"></div>
              <div className="absolute top-8 left-5 w-2 h-3 bg-amber-800 rounded-sm"></div>
            </div>
            <div className="absolute bottom-0 left-1/4 w-1/4 h-full bg-gradient-to-t from-amber-800 to-amber-600">
              <div className="absolute top-3 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-3 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-7 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-7 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 w-1/4 h-full bg-gradient-to-t from-amber-700 to-amber-500">
              <div className="absolute top-2 left-2 w-2 h-3 bg-amber-600 rounded-sm"></div>
              <div className="absolute top-2 left-5 w-2 h-3 bg-amber-600 rounded-sm"></div>
              <div className="absolute top-6 left-2 w-2 h-3 bg-amber-600 rounded-sm"></div>
              <div className="absolute top-6 left-5 w-2 h-3 bg-amber-600 rounded-sm"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/4 h-full bg-gradient-to-t from-amber-800 to-amber-600">
              <div className="absolute top-4 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-4 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-8 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-8 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
            </div>
          </div>
          
          {/* Middle tier buildings */}
          <div className="absolute bottom-1/3 left-0 w-full h-1/3 bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500">
            <div className="absolute bottom-0 left-1/6 w-1/5 h-full bg-gradient-to-t from-amber-800 to-amber-600">
              <div className="absolute top-3 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-3 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-7 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-7 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
            </div>
            <div className="absolute bottom-0 right-1/6 w-1/5 h-full bg-gradient-to-t from-amber-800 to-amber-600">
              <div className="absolute top-2 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-2 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-6 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
              <div className="absolute top-6 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
            </div>
          </div>
          
          {/* Upper tier with iconic dome and spire */}
          <div className="absolute bottom-2/3 left-0 w-full h-1/3 bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400">
            {/* St. Paul's Pro-Cathedral Dome */}
            <div className="absolute bottom-0 left-1/3 w-1/6 h-full">
              <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-lg">
                <div className="absolute top-2 left-2 w-2 h-2 bg-amber-600 rounded-sm"></div>
                <div className="absolute top-2 left-5 w-2 h-2 bg-amber-600 rounded-sm"></div>
              </div>
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
            
            {/* Bell Tower/Spire */}
            <div className="absolute bottom-0 right-1/3 w-1/12 h-full">
              <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-lg">
                <div className="absolute top-2 left-1 w-1 h-2 bg-amber-600 rounded-sm"></div>
                <div className="absolute top-4 left-1 w-1 h-2 bg-amber-600 rounded-sm"></div>
              </div>
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3 h-12 bg-gradient-to-b from-blue-300 to-blue-500 rounded-t-full shadow-lg"></div>
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mediterranean Sea */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-blue-700 via-blue-500 to-blue-400">
        {/* Realistic wave patterns */}
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-t from-blue-800 to-blue-600 rounded-t-full"></div>
        <div className="absolute bottom-2 left-0 w-full h-2 bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-full"></div>
        <div className="absolute bottom-4 left-0 w-full h-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-full"></div>
        
        {/* Sailboat in foreground */}
        <div className="absolute bottom-8 left-1/3 w-8 h-6 bg-gradient-to-b from-white to-blue-100 rounded-t-lg shadow-lg">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-amber-600"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gradient-to-r from-white to-blue-50 rounded-sm"></div>
        </div>
        
        {/* Additional small boats */}
        <div className="absolute bottom-6 right-1/4 w-4 h-3 bg-gradient-to-b from-white to-blue-100 rounded-t-md shadow-md">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-amber-600"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gradient-to-r from-white to-blue-50 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};
