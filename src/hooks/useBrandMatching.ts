import { supabase } from "@/integrations/supabase/client";

export const useBrandMatching = () => {
  const triggerMatch = async (itemId: string, type: 'listing' | 'wanted') => {
    try {
      const { data, error } = await supabase.functions.invoke('match-brands', {
        body: { 
          itemId: type === 'listing' ? itemId : null,
          wantedAdId: type === 'wanted' ? itemId : null,
          type 
        }
      });

      if (error) throw error;
      
      console.log('Brand matching result:', data);
      return data;
    } catch (error) {
      console.error('Error triggering brand match:', error);
      throw error;
    }
  };

  return { triggerMatch };
};
