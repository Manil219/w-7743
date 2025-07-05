
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type LegalText = Database['public']['Tables']['legal_texts']['Row'];
type LegalTextInsert = Database['public']['Tables']['legal_texts']['Insert'];
type LegalTextUpdate = Database['public']['Tables']['legal_texts']['Update'];

export function useLegalTexts() {
  const { toast } = useToast();
  const [texts, setTexts] = useState<LegalText[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchTexts();
    fetchCategories();
  }, []);

  const fetchTexts = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_texts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTexts(data || []);
    } catch (error) {
      console.error('Error fetching legal texts:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les textes juridiques',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_categories')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const createText = async (textData: LegalTextInsert) => {
    try {
      const { data, error } = await supabase
        .from('legal_texts')
        .insert(textData)
        .select()
        .single();

      if (error) throw error;

      setTexts(prev => [data, ...prev]);
      toast({
        title: 'Succès',
        description: 'Texte juridique créé avec succès',
      });
      
      return data;
    } catch (error) {
      console.error('Error creating legal text:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le texte juridique',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateText = async (id: string, updates: LegalTextUpdate) => {
    try {
      const { data, error } = await supabase
        .from('legal_texts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTexts(prev => prev.map(text => text.id === id ? data : text));
      toast({
        title: 'Succès',
        description: 'Texte juridique mis à jour avec succès',
      });
      
      return data;
    } catch (error) {
      console.error('Error updating legal text:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le texte juridique',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteText = async (id: string) => {
    try {
      const { error } = await supabase
        .from('legal_texts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTexts(prev => prev.filter(text => text.id !== id));
      toast({
        title: 'Succès',
        description: 'Texte juridique supprimé avec succès',
      });
    } catch (error) {
      console.error('Error deleting legal text:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le texte juridique',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    texts,
    categories,
    isLoading,
    createText,
    updateText,
    deleteText,
    refetch: fetchTexts,
  };
}
