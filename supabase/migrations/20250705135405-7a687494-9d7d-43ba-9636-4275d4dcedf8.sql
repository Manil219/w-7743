
-- Créer une table pour les sessions utilisateur et les préférences étendues
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_data JSONB DEFAULT '{}',
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Améliorer la table profiles existante avec plus de champs
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS organization TEXT,
ADD COLUMN IF NOT EXISTS position TEXT,
ADD COLUMN IF NOT EXISTS specializations TEXT[],
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS language_preference TEXT DEFAULT 'fr';

-- Créer une table pour les catégories de textes juridiques
CREATE TABLE IF NOT EXISTS public.legal_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.legal_categories(id),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer une table pour les versions des textes juridiques
CREATE TABLE IF NOT EXISTS public.legal_text_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_text_id UUID REFERENCES public.legal_texts(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  content TEXT,
  changes_summary TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(legal_text_id, version_number)
);

-- Créer une table pour les commentaires et annotations
CREATE TABLE IF NOT EXISTS public.text_annotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_text_id UUID REFERENCES public.legal_texts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  annotation_type TEXT DEFAULT 'comment',
  content TEXT NOT NULL,
  position_start INTEGER,
  position_end INTEGER,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer une table pour les favoris
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, -- 'legal_text' ou 'procedure'
  item_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- Créer une table pour les étapes de procédures détaillées
CREATE TABLE IF NOT EXISTS public.procedure_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_id UUID REFERENCES public.administrative_procedures(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_estimate TEXT,
  required_documents TEXT[],
  is_required BOOLEAN DEFAULT TRUE,
  tips TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer une table pour les documents de procédures
CREATE TABLE IF NOT EXISTS public.procedure_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_id UUID REFERENCES public.administrative_procedures(id) ON DELETE CASCADE,
  document_name TEXT NOT NULL,
  document_type TEXT,
  is_required BOOLEAN DEFAULT TRUE,
  template_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer une table pour le suivi des procédures par utilisateur
CREATE TABLE IF NOT EXISTS public.user_procedure_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  procedure_id UUID REFERENCES public.administrative_procedures(id) ON DELETE CASCADE,
  current_step INTEGER DEFAULT 1,
  status TEXT DEFAULT 'en_cours', -- 'en_cours', 'completée', 'abandonnée'
  notes TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer une table pour les approbations en attente
CREATE TABLE IF NOT EXISTS public.approval_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type TEXT NOT NULL, -- 'legal_text' ou 'procedure'
  item_id UUID NOT NULL,
  submitted_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewer_id UUID REFERENCES auth.users(id),
  reviewer_comments TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Améliorer les index pour de meilleures performances
CREATE INDEX IF NOT EXISTS idx_legal_texts_type ON public.legal_texts(type);
CREATE INDEX IF NOT EXISTS idx_legal_texts_category ON public.legal_texts(category);
CREATE INDEX IF NOT EXISTS idx_legal_texts_status ON public.legal_texts(status);
CREATE INDEX IF NOT EXISTS idx_legal_texts_created_at ON public.legal_texts(created_at);
CREATE INDEX IF NOT EXISTS idx_procedures_category ON public.administrative_procedures(category);
CREATE INDEX IF NOT EXISTS idx_procedures_status ON public.administrative_procedures(status);
CREATE INDEX IF NOT EXISTS idx_search_history_user ON public.search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, read);

-- Activer RLS sur toutes les nouvelles tables
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_text_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.text_annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_procedure_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approval_queue ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour user_sessions
CREATE POLICY "Users can manage their own sessions" ON public.user_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Politiques RLS pour legal_categories (lecture publique, écriture authentifiée)
CREATE POLICY "Anyone can view legal categories" ON public.legal_categories
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create categories" ON public.legal_categories
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update categories they created" ON public.legal_categories
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Politiques RLS pour legal_text_versions
CREATE POLICY "Anyone can view text versions" ON public.legal_text_versions
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create versions" ON public.legal_text_versions
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Politiques RLS pour text_annotations
CREATE POLICY "Users can view public annotations and their own" ON public.text_annotations
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can create their own annotations" ON public.text_annotations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own annotations" ON public.text_annotations
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own annotations" ON public.text_annotations
  FOR DELETE USING (auth.uid() = user_id);

-- Politiques RLS pour user_favorites
CREATE POLICY "Users can manage their own favorites" ON public.user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Politiques RLS pour procedure_steps
CREATE POLICY "Anyone can view procedure steps" ON public.procedure_steps
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create steps" ON public.procedure_steps
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update steps" ON public.procedure_steps
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Politiques RLS pour procedure_documents
CREATE POLICY "Anyone can view procedure documents" ON public.procedure_documents
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create documents" ON public.procedure_documents
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Politiques RLS pour user_procedure_progress
CREATE POLICY "Users can manage their own procedure progress" ON public.user_procedure_progress
  FOR ALL USING (auth.uid() = user_id);

-- Politiques RLS pour approval_queue
CREATE POLICY "Users can view items they submitted" ON public.approval_queue
  FOR SELECT USING (auth.uid() = submitted_by OR auth.uid() = reviewer_id);
CREATE POLICY "Users can create approval requests" ON public.approval_queue
  FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Reviewers can update approval status" ON public.approval_queue
  FOR UPDATE USING (auth.uid() = reviewer_id);

-- Insérer des catégories par défaut
INSERT INTO public.legal_categories (name, description, order_index) VALUES
('Droit constitutionnel', 'Textes relatifs à la Constitution et aux institutions', 1),
('Droit civil', 'Code civil et textes relatifs aux personnes et aux biens', 2),
('Droit pénal', 'Code pénal et procédure pénale', 3),
('Droit commercial', 'Code de commerce et droit des affaires', 4),
('Droit du travail', 'Code du travail et relations professionnelles', 5),
('Droit fiscal', 'Code des impôts et fiscalité', 6),
('Droit administratif', 'Procédures administratives et fonction publique', 7),
('Droit de l''urbanisme', 'Aménagement du territoire et construction', 8),
('Droit de l''environnement', 'Protection de l''environnement et développement durable', 9),
('Droit des douanes', 'Code des douanes et commerce extérieur', 10)
ON CONFLICT DO NOTHING;

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger aux tables appropriées
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_texts_updated_at BEFORE UPDATE ON public.legal_texts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_procedures_updated_at BEFORE UPDATE ON public.administrative_procedures
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_annotations_updated_at BEFORE UPDATE ON public.text_annotations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_procedure_progress_updated_at BEFORE UPDATE ON public.user_procedure_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
