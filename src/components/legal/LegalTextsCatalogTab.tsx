
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  Calendar, 
  Tag, 
  Eye, 
  Download, 
  Share2,
  Filter,
  BookOpen,
  Scale,
  Building,
  Plus,
  Clock
} from 'lucide-react';
import { VoiceSearchInput } from '@/components/common/VoiceSearchInput';

interface LegalTextsCatalogTabProps {
  onAddLegalText?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function LegalTextsCatalogTab({ onAddLegalText, onOpenApprovalQueue }: LegalTextsCatalogTabProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const legalTexts = [
    {
      id: 1,
      title: "Loi n° 08-09 du 25 février 2008 portant code de procédure civile et administrative",
      type: "Loi",
      category: "Procédure",
      publishDate: "25 février 2008",
      status: "En vigueur",
      description: "Code régissant les procédures civiles et administratives en Algérie",
      authority: "Assemblée Populaire Nationale",
      joNumber: "J.O. n° 21 du 23 avril 2008"
    },
    {
      id: 2,
      title: "Ordonnance n° 75-58 du 26 septembre 1975 portant code civil",
      type: "Ordonnance",
      category: "Civil",
      publishDate: "26 septembre 1975",
      status: "En vigueur",
      description: "Code civil algérien régissant les relations entre particuliers",
      authority: "Conseil de la Révolution",
      joNumber: "J.O. n° 78 du 30 septembre 1975"
    },
    {
      id: 3,
      title: "Loi n° 90-11 du 21 avril 1990 relative aux relations de travail",
      type: "Loi",
      category: "Travail",
      publishDate: "21 avril 1990",
      status: "En vigueur",
      description: "Loi régissant les relations de travail en Algérie",
      authority: "Assemblée Populaire Nationale",
      joNumber: "J.O. n° 17 du 25 avril 1990"
    },
    {
      id: 4,
      title: "Loi n° 18-05 du 10 mai 2018 relative au commerce électronique",
      type: "Loi",
      category: "Commercial",
      publishDate: "10 mai 2018",
      status: "En vigueur",
      description: "Cadre juridique pour le commerce électronique en Algérie",
      authority: "Assemblée Populaire Nationale",
      joNumber: "J.O. n° 28 du 16 mai 2018"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En vigueur':
        return 'bg-green-100 text-green-800';
      case 'Abrogé':
        return 'bg-red-100 text-red-800';
      case 'Suspendu':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Loi':
        return Scale;
      case 'Ordonnance':
        return BookOpen;
      case 'Décret':
        return Building;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">1,247</p>
            <p className="text-sm text-gray-600">Textes total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Scale className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">892</p>
            <p className="text-sm text-gray-600">Lois</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">234</p>
            <p className="text-sm text-gray-600">Ordonnances</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Building className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">121</p>
            <p className="text-sm text-gray-600">Décrets</p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche, filtres et boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 flex-1">
          <div className="flex-1 max-w-md">
            <VoiceSearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Rechercher dans le catalogue..."
              context="legal"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onOpenApprovalQueue}
            className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
          >
            <Clock className="w-4 h-4 mr-2" />
            File d'approbation
          </Button>
          <Button 
            size="sm"
            onClick={onAddLegalText}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter texte juridique
          </Button>
        </div>
      </div>

      {/* Liste des textes juridiques */}
      <div className="space-y-4">
        {legalTexts.map((text) => {
          const TypeIcon = getTypeIcon(text.type);
          return (
            <Card key={text.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <TypeIcon className="w-5 h-5 text-emerald-600" />
                      <CardTitle className="text-lg">{text.title}</CardTitle>
                      <Badge variant="outline">{text.type}</Badge>
                      <Badge className={getStatusColor(text.status)}>
                        {text.status}
                      </Badge>
                    </div>
                    <CardDescription className="mb-3">
                      {text.description}
                    </CardDescription>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Publié le:</span>
                        <p className="font-medium flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {text.publishDate}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Catégorie:</span>
                        <p className="font-medium flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {text.category}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Autorité:</span>
                        <p className="font-medium">{text.authority}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {text.joNumber}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Consulter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Télécharger
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-1" />
                      Partager
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
