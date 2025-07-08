import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedInput } from '@/components/common/EnhancedInput';
import { Map, Clock, MapPin, Mic, Camera, Globe, Calendar, Navigation, Layers } from 'lucide-react';

export function ImmersiveSearchInterface() {
  const [activeTab, setActiveTab] = useState("concept-map");
  const [searchQuery, setSearchQuery] = useState("");

  const immersiveFeatures = [
    {
      icon: <Map className="w-5 h-5 text-indigo-600" />,
      title: "Carte Conceptuelle",
      description: "Visualisation interactive des connexions juridiques"
    },
    {
      icon: <Clock className="w-5 h-5 text-green-600" />,
      title: "Timeline Intelligente", 
      description: "Navigation chronologique des évolutions réglementaires"
    },
    {
      icon: <MapPin className="w-5 h-5 text-red-600" />,
      title: "Géolocalisation",
      description: "Textes applicables selon la juridiction"
    },
    {
      icon: <Layers className="w-5 h-5 text-purple-600" />,
      title: "Multimodal",
      description: "Recherche combinée texte, voix et image"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Globe className="w-8 h-8 text-indigo-600" />
          Interface de Recherche Immersive
        </h2>
        <p className="text-gray-600 text-lg">
          Explorez le droit avec des outils de visualisation avancés
        </p>
      </div>

      {/* Fonctionnalités immersives */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {immersiveFeatures.map((feature, index) => (
          <Card key={index} className="border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-colors">
            <CardContent className="pt-4 text-center">
              <div className="flex justify-center mb-2">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concept-map">Carte</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="geolocation">Géo</TabsTrigger>
          <TabsTrigger value="multimodal">Multimodal</TabsTrigger>
        </TabsList>

        <TabsContent value="concept-map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                Carte Conceptuelle Interactive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <EnhancedInput
                    placeholder="Concept juridique à explorer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    context="legal"
                  />
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Map className="w-4 h-4 mr-2" />
                    Générer la carte
                  </Button>
                </div>

                {/* Zone de visualisation de la carte */}
                <div className="border-2 border-dashed border-indigo-200 rounded-lg p-8 text-center bg-indigo-50">
                  <Map className="w-24 h-24 mx-auto mb-4 text-indigo-300" />
                  <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                    Visualisation Interactive
                  </h3>
                  <p className="text-indigo-600 mb-4">
                    Explorez les connexions entre concepts juridiques sous forme de graphe interactif
                  </p>
                  <div className="flex justify-center gap-2">
                    <Badge className="bg-indigo-500 text-white">Nœuds : Concepts</Badge>
                    <Badge className="bg-indigo-500 text-white">Liens : Relations</Badge>
                    <Badge className="bg-indigo-500 text-white">Taille : Importance</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-indigo-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">Contrôles Interactifs</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Zoom et navigation</li>
                        <li>• Filtrage par domaine</li>
                        <li>• Clustering automatique</li>
                        <li>• Export de la vue</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-indigo-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">Types de Relations</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Hiérarchie normative</li>
                        <li>• Citations croisées</li>
                        <li>• Contradictions</li>
                        <li>• Évolutions temporelles</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-indigo-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">Algorithmes IA</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Détection de communautés</li>
                        <li>• Scoring de centralité</li>
                        <li>• Prédiction de liens</li>
                        <li>• Analyse de sentiment</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeline Juridique Intelligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-green-200 rounded-lg p-8 text-center bg-green-50">
                  <Clock className="w-24 h-24 mx-auto mb-4 text-green-300" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Navigation Chronologique
                  </h3>
                  <p className="text-green-600 mb-4">
                    Explorez l'évolution des textes juridiques dans le temps
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Lancer la timeline
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-green-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">Fonctionnalités Timeline</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Navigation par périodes</li>
                        <li>• Filtrage par type d'acte</li>
                        <li>• Zoom temporel intelligent</li>
                        <li>• Annotations contextuelles</li>
                        <li>• Comparaison versions</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">Analyses Temporelles</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Cycles de réforme</li>
                        <li>• Tendances législatives</li>
                        <li>• Impact des changements</li>
                        <li>• Prédictions d'évolution</li>
                        <li>• Corrélations temporelles</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geolocation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Recherche par Géolocalisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-red-200 rounded-lg p-8 text-center bg-red-50">
                  <MapPin className="w-24 h-24 mx-auto mb-4 text-red-300" />
                  <h3 className="text-xl font-semibold text-red-800 mb-2">
                    Juridiction Géographique
                  </h3>
                  <p className="text-red-600 mb-4">
                    Textes applicables selon votre localisation ou zone d'intérêt
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Navigation className="w-4 h-4 mr-2" />
                    Activer la géolocalisation
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-red-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">Niveaux Juridictionnels</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• National</li>
                        <li>• Régional</li>
                        <li>• Départemental</li>
                        <li>• Communal</li>
                        <li>• Zones spéciales</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">Critères Géographiques</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Zone urbaine/rurale</li>
                        <li>• Littoral/montagne</li>
                        <li>• Outre-mer</li>
                        <li>• Zones franches</li>
                        <li>• Parcs naturels</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">Services Intégrés</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Cartographie interactive</li>
                        <li>• Couches thématiques</li>
                        <li>• Export géodonnées</li>
                        <li>• Alertes zonales</li>
                        <li>• Comparaisons territoriales</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multimodal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Recherche Multimodale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors">
                    <CardContent className="pt-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                        <Mic className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Recherche Vocale</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Dictez vos requêtes juridiques naturellement
                      </p>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Mic className="w-4 h-4 mr-2" />
                        Activer
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
                    <CardContent className="pt-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Recherche Visuelle</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Analysez des documents via OCR intelligent
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Camera className="w-4 h-4 mr-2" />
                        Scanner
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-orange-200 hover:border-orange-400 transition-colors">
                    <CardContent className="pt-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
                        <Layers className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Recherche Hybride</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Combinez texte, voix et image simultanément
                      </p>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Layers className="w-4 h-4 mr-2" />
                        Combiner
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-3 text-purple-800">Exemple de Recherche Multimodale</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-500 text-white">Texte</Badge>
                        <span>"contrat de bail commercial"</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500 text-white">Voix</Badge>
                        <span>"avec clause d'indexation"</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-500 text-white">Image</Badge>
                        <span>Document scanné : "Bail 9 ans, Paris 11ème"</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
