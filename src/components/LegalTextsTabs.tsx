
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, FileText, Calendar, Building, Tag, Clock, CheckCircle } from 'lucide-react';
import { useLegalTexts } from '@/hooks/useLegalTexts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface LegalTextsTabsProps {
  section: string;
  onAddLegalText: () => void;
  onOpenApprovalQueue: () => void;
}

export function LegalTextsTabs({ section, onAddLegalText, onOpenApprovalQueue }: LegalTextsTabsProps) {
  const { texts, categories, isLoading } = useLegalTexts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTexts = texts.filter(text => {
    const matchesSearch = text.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      text.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || text.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_vigueur': return 'bg-green-100 text-green-800';
      case 'abroge': return 'bg-red-100 text-red-800';
      case 'modifie': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_vigueur': return 'En vigueur';
      case 'abroge': return 'Abrogé';
      case 'modifie': return 'Modifié';
      default: return 'Inconnu';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des textes juridiques...</p>
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="catalog" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="catalog">Catalogue</TabsTrigger>
        <TabsTrigger value="enrichment">Enrichissement</TabsTrigger>
        <TabsTrigger value="pending">En attente</TabsTrigger>
        <TabsTrigger value="history">Historique</TabsTrigger>
      </TabsList>

      <TabsContent value="catalog" className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des textes juridiques..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTexts.map((text) => (
            <Card key={text.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <Badge variant="outline" className="text-xs">
                      {text.type}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(text.status || 'en_vigueur')}>
                    {getStatusLabel(text.status || 'en_vigueur')}
                  </Badge>
                </div>
                <CardTitle className="text-sm line-clamp-2">{text.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                  {text.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    <span>{text.category}</span>
                  </div>
                  {text.institution && (
                    <div className="flex items-center gap-2">
                      <Building className="w-3 h-3" />
                      <span>{text.institution}</span>
                    </div>
                  )}
                  {text.journal_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {format(new Date(text.journal_date), 'PPP', { locale: fr })}
                      </span>
                    </div>
                  )}
                  {text.created_at && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>
                        Ajouté le {format(new Date(text.created_at), 'PPP', { locale: fr })}
                      </span>
                    </div>
                  )}
                </div>
                {text.tags && text.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {text.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {text.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{text.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTexts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun texte trouvé</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Aucun texte ne correspond à vos critères de recherche.'
                : 'Aucun texte juridique n\'a encore été ajouté.'}
            </p>
            <Button onClick={onAddLegalText}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un texte juridique
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="enrichment" className="space-y-4">
        <div className="text-center py-12">
          <Plus className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrichir la base de données</h3>
          <p className="text-gray-600 mb-4">
            Ajoutez de nouveaux textes juridiques pour enrichir la plateforme DALIL.
          </p>
          <Button onClick={onAddLegalText} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un nouveau texte
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="pending" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Textes en attente d'approbation</h3>
          <Button onClick={onOpenApprovalQueue} variant="outline">
            Voir la file d'attente
          </Button>
        </div>
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun texte en attente</h3>
          <p className="text-gray-600">
            Tous les textes soumis ont été traités.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Historique des modifications</h3>
          <p className="text-gray-600">
            L'historique des modifications des textes juridiques apparaîtra ici.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
