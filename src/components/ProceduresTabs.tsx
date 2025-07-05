
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Plus, Search, ClipboardList, Calendar, Building, Star, Users, Clock, CheckCircle } from 'lucide-react';
import { useProcedures } from '@/hooks/useProcedures';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProceduresTabsProps {
  section: string;
  onAddProcedure: () => void;
  onOpenApprovalQueue: () => void;
}

export function ProceduresTabs({ section, onAddProcedure, onOpenApprovalQueue }: ProceduresTabsProps) {
  const { procedures, isLoading } = useProcedures();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || procedure.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-100 text-green-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'Facile';
      case 'moyenne': return 'Moyenne';
      case 'difficile': return 'Difficile';
      default: return 'Non définie';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const categories = [...new Set(procedures.map(p => p.category))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des procédures...</p>
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
        <TabsTrigger value="resources">Ressources</TabsTrigger>
      </TabsList>

      <TabsContent value="catalog" className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des procédures administratives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProcedures.map((procedure) => (
            <Card key={procedure.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-blue-600" />
                    <Badge variant="outline" className="text-xs">
                      {procedure.category}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(procedure.status || 'active')}>
                    {procedure.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <CardTitle className="text-sm line-clamp-2">{procedure.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                  {procedure.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building className="w-3 h-3" />
                    <span>{procedure.institution}</span>
                  </div>
                  {procedure.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>Durée: {procedure.duration}</span>
                    </div>
                  )}
                  {procedure.cost && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-semibold">💰 {procedure.cost}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getDifficultyColor(procedure.difficulty || 'moyenne')}>
                    {getDifficultyLabel(procedure.difficulty || 'moyenne')}
                  </Badge>
                  {procedure.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{procedure.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                {procedure.completed_count !== undefined && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Complétions</span>
                      <span className="font-semibold">{procedure.completed_count}</span>
                    </div>
                    <Progress value={Math.min((procedure.completed_count / 100) * 100, 100)} className="h-1" />
                  </div>
                )}

                {procedure.tags && procedure.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {procedure.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {procedure.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{procedure.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProcedures.length === 0 && (
          <div className="text-center py-12">
            <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune procédure trouvée</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Aucune procédure ne correspond à vos critères de recherche.'
                : 'Aucune procédure administrative n\'a encore été ajoutée.'}
            </p>
            <Button onClick={onAddProcedure} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une procédure
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="enrichment" className="space-y-4">
        <div className="text-center py-12">
          <Plus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrichir la base de données</h3>
          <p className="text-gray-600 mb-4">
            Ajoutez de nouvelles procédures administratives pour enrichir la plateforme DALIL.
          </p>
          <Button onClick={onAddProcedure} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une nouvelle procédure
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="pending" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Procédures en attente d'approbation</h3>
          <Button onClick={onOpenApprovalQueue} variant="outline">
            Voir la file d'attente
          </Button>
        </div>
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune procédure en attente</h3>
          <p className="text-gray-600">
            Toutes les procédures soumises ont été traitées.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="resources" className="space-y-4">
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ressources procédurales</h3>
          <p className="text-gray-600">
            Guides, modèles et ressources utiles pour les procédures administratives.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
