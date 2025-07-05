
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Procedure {
  id: string;
  title: string;
  category: string;
  description?: string;
  institution: string;
  duration?: string;
  difficulty?: string;
  cost?: string;
  status?: string;
  required_documents?: string[];
  tags?: string[];
  forms?: any;
  steps?: any;
  rating?: number;
  completed_count?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

export function useProcedures() {
  const { toast } = useToast();
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProcedures();
  }, []);

  const fetchProcedures = async () => {
    try {
      const { data, error } = await supabase
        .from('administrative_procedures')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProcedures(data || []);
    } catch (error) {
      console.error('Error fetching procedures:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les procédures',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProcedure = async (procedureData: Partial<Procedure>) => {
    try {
      const { data, error } = await supabase
        .from('administrative_procedures')
        .insert(procedureData)
        .select()
        .single();

      if (error) throw error;

      setProcedures(prev => [data, ...prev]);
      toast({
        title: 'Succès',
        description: 'Procédure créée avec succès',
      });
      
      return data;
    } catch (error) {
      console.error('Error creating procedure:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la procédure',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateProcedure = async (id: string, updates: Partial<Procedure>) => {
    try {
      const { data, error } = await supabase
        .from('administrative_procedures')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProcedures(prev => prev.map(proc => proc.id === id ? data : proc));
      toast({
        title: 'Succès',
        description: 'Procédure mise à jour avec succès',
      });
      
      return data;
    } catch (error) {
      console.error('Error updating procedure:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour la procédure',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteProcedure = async (id: string) => {
    try {
      const { error } = await supabase
        .from('administrative_procedures')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProcedures(prev => prev.filter(proc => proc.id !== id));
      toast({
        title: 'Succès',
        description: 'Procédure supprimée avec succès',
      });
    } catch (error) {
      console.error('Error deleting procedure:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la procédure',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    procedures,
    isLoading,
    createProcedure,
    updateProcedure,
    deleteProcedure,
    refetch: fetchProcedures,
  };
}
