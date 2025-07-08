
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { SemanticSearchSection } from './SemanticSearchSection';
import { ImmersiveSearchInterface } from './ImmersiveSearchInterface';
import { Brain, Globe, Zap, TestTube, Sparkles } from 'lucide-react';

export function NextGenSearchSection() {
  const [activeTab, setActiveTab] = useState("semantic");

  const searchFeatures = [
    {
      id: "semantic",
      title: "Recherche Sémantique",
      description: "Concepts, citations croisées, cas similaires",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: "immersive", 
      title: "Interface Immersive",
      description: "Cartes, timeline, géolocalisation, multimodal",
      icon: Globe,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-emerald-200">
        <CardHeader>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Zap className="w-8 h-8 text-emerald-600" />
              Fonctionnalités de Recherche Nouvelle Génération
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Explorez le droit avec des technologies d'IA avancées et des interfaces immersives
            </p>
            
            <div className="flex justify-center gap-4">
              {searchFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.id} className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-2 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="semantic" className="gap-2">
            <Brain className="w-4 h-4" />
            Recherche Sémantique & Conceptuelle
          </TabsTrigger>
          <TabsTrigger value="immersive" className="gap-2">
            <Globe className="w-4 h-4" />
            Interface de Recherche Immersive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="semantic">
          <SemanticSearchSection />
        </TabsContent>

        <TabsContent value="immersive">
          <ImmersiveSearchInterface />
        </TabsContent>
      </Tabs>

      {/* Footer avec informations techniques */}
      <Card className="bg-gradient-to-r from-emerald-50 to-indigo-50 border-2 border-emerald-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Technologies Intégrées de Nouvelle Génération
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-800">Recherche Sémantique & Conceptuelle</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Badge className="bg-purple-500 text-white justify-center">Concepts Juridiques</Badge>
                  <Badge className="bg-blue-500 text-white justify-center">Citations Croisées</Badge>
                  <Badge className="bg-green-500 text-white justify-center">Recherche Visuelle</Badge>
                  <Badge className="bg-orange-500 text-white justify-center">Cas Similaires</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-indigo-800">Interface de Recherche Immersive</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Badge className="bg-indigo-500 text-white justify-center">Carte Conceptuelle</Badge>
                  <Badge className="bg-green-500 text-white justify-center">Timeline Intelligente</Badge>
                  <Badge className="bg-red-500 text-white justify-center">Géolocalisation</Badge>
                  <Badge className="bg-purple-500 text-white justify-center">Recherche Multimodale</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
