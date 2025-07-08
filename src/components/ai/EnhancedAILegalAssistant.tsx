
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PredictiveJuridicalAnalysis } from './PredictiveJuridicalAnalysis';
import { SpecializedNLP } from './SpecializedNLP';
import { Bot, Brain, Zap, TrendingUp, MessageSquare, Sparkles, History, BarChart3, Users, Target, Shield, AlertTriangle } from 'lucide-react';

// Import du composant assistant existant
import { AILegalAssistant } from '@/components/AILegalAssistant';

export function EnhancedAILegalAssistant() {
  const [activeFeature, setActiveFeature] = useState<'assistant' | 'prediction' | 'nlp'>('assistant');

  const features = [
    {
      id: 'assistant' as const,
      title: 'Assistant IA Classique',
      description: 'Recherche intelligente et suggestions contextuelles',
      icon: Bot,
      color: 'text-green-600'
    },
    {
      id: 'prediction' as const,
      title: 'Analyse Prédictive Juridique',
      description: 'Prédiction d\'issues, évaluation de risques, détection d\'anomalies',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      id: 'nlp' as const,
      title: 'NLP Juridique Spécialisé',
      description: 'Extraction d\'entités, résumés automatiques, classification avancée',
      icon: Zap,
      color: 'text-blue-600'
    }
  ];

  const aiCapabilities = {
    prediction: [
      {
        icon: <Target className="w-5 h-5 text-purple-600" />,
        title: "Prédiction d'issues judiciaires",
        description: "Algorithmes d'IA pour prédire les résultats de litiges basés sur l'historique jurisprudentiel"
      },
      {
        icon: <Shield className="w-5 h-5 text-blue-600" />,
        title: "Évaluation automatique des risques",
        description: "Scoring automatique de conformité réglementaire"
      },
      {
        icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
        title: "Détection d'anomalies",
        description: "IA pour identifier automatiquement les incohérences dans les textes juridiques"
      },
      {
        icon: <Sparkles className="w-5 h-5 text-green-600" />,
        title: "Recommandations contextuelles",
        description: "Suggestions proactives de textes pertinents basées sur le comportement utilisateur"
      }
    ],
    nlp: [
      {
        icon: <Users className="w-5 h-5 text-blue-600" />,
        title: "Extraction d'entités juridiques",
        description: "Reconnaissance automatique de parties, dates, montants, références légales"
      },
      {
        icon: <Bot className="w-5 h-5 text-green-600" />,
        title: "Résumé automatique intelligent",
        description: "Synthèses personnalisées selon le profil utilisateur (avocat, juriste d'entreprise, etc.)"
      },
      {
        icon: <BarChart3 className="w-5 h-5 text-purple-600" />,
        title: "Classification automatique avancée",
        description: "Catégorisation fine des documents par domaine de droit spécialisé"
      },
      {
        icon: <MessageSquare className="w-5 h-5 text-orange-600" />,
        title: "Analyse de sentiment juridique",
        description: "Détection du ton et de l'orientation des décisions judiciaires"
      }
    ]
  };

  const recentSearches = [
    { query: "Procédure de divorce", time: "Il y a 2 heures", results: 15 },
    { query: "Code du commerce article 544", time: "Hier", results: 8 },
    { query: "Loi sur l'investissement 2023", time: "Il y a 2 jours", results: 23 }
  ];

  const insights = [
    {
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      title: "Tendance détectée",
      description: "Augmentation des recherches sur les marchés publics (+45% cette semaine)"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      title: "Nouveau texte pertinent",
      description: "Décret exécutif n° 24-15 pourrait intéresser vos recherches récentes"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header principal */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Brain className="w-10 h-10 text-green-600" />
              Intelligence Artificielle et Machine Learning Avancé
            </h1>
            <p className="text-gray-600 text-xl mb-6">
              Assistant IA Juridique avec analyse prédictive et NLP spécialisé pour le droit
            </p>
            
            {/* Badges de fonctionnalités */}
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Badge className="bg-purple-600 text-white px-3 py-1">Analyse Prédictive</Badge>
              <Badge className="bg-blue-600 text-white px-3 py-1">NLP Spécialisé</Badge>
              <Badge className="bg-green-600 text-white px-3 py-1">Machine Learning</Badge>
              <Badge variant="outline" className="px-3 py-1">IA Avancée</Badge>
            </div>
            
            {/* Navigation des fonctionnalités */}
            <div className="flex justify-center gap-4 flex-wrap">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Button
                    key={feature.id}
                    variant={activeFeature === feature.id ? "default" : "outline"}
                    onClick={() => setActiveFeature(feature.id)}
                    className="flex-col h-auto p-4 space-y-2 min-w-[200px]"
                  >
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                    <div className="text-center">
                      <div className="font-semibold text-sm">{feature.title}</div>
                      <div className="text-xs text-gray-500">{feature.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Contenu principal basé sur la sélection */}
      {activeFeature === 'assistant' && (
        <div className="space-y-6">
          <AILegalAssistant />
          
          {/* Informations supplémentaires */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recherches Récentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSearches.map((search, index) => (
                  <div key={index} className="space-y-2">
                    <div className="font-medium text-sm cursor-pointer hover:text-green-600">
                      {search.query}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{search.time}</span>
                      <Badge variant="secondary" className="text-xs">
                        {search.results} résultats
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Insights IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {insight.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{insight.title}</div>
                      <div className="text-xs text-gray-600">{insight.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeFeature === 'prediction' && (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                1.1 Analyse Prédictive Juridique
              </CardTitle>
              <p className="text-gray-600">
                Algorithmes avancés d'Intelligence Artificielle pour l'analyse prédictive en droit
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {aiCapabilities.prediction.map((capability, index) => (
                  <Card key={index} className="border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        {capability.icon}
                        <h3 className="font-semibold text-sm">{capability.title}</h3>
                      </div>
                      <p className="text-xs text-gray-600">{capability.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          <PredictiveJuridicalAnalysis />
        </div>
      )}

      {activeFeature === 'nlp' && (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-600" />
                1.2 NLP (Natural Language Processing) Juridique Spécialisé
              </CardTitle>
              <p className="text-gray-600">
                Traitement du langage naturel spécialisé pour l'analyse automatique de textes juridiques
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {aiCapabilities.nlp.map((capability, index) => (
                  <Card key={index} className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        {capability.icon}
                        <h3 className="font-semibold text-sm">{capability.title}</h3>
                      </div>
                      <p className="text-xs text-gray-600">{capability.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          <SpecializedNLP />
        </div>
      )}

      {/* Footer récapitulatif */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-2 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              Fonctionnalités d'IA Juridique Intégrées
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl shadow-sm border-2 border-purple-100">
                <TrendingUp className="w-10 h-10 text-purple-600 mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-3 text-purple-600">Analyse Prédictive</h4>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• Prédiction d'issues judiciaires</li>
                  <li>• Évaluation automatique des risques</li>
                  <li>• Détection d'anomalies</li>
                  <li>• Recommandations contextuelles</li>
                </ul>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border-2 border-blue-100">
                <Zap className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-3 text-blue-600">NLP Spécialisé</h4>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• Extraction d'entités juridiques</li>
                  <li>• Résumés automatiques intelligents</li>
                  <li>• Classification automatique avancée</li>
                  <li>• Analyse de sentiment juridique</li>
                </ul>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border-2 border-green-100">
                <Bot className="w-10 h-10 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-3 text-green-600">Assistant Classique</h4>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• Recherche intelligente</li>
                  <li>• Suggestions contextuelles</li>
                  <li>• Actions rapides</li>
                  <li>• Historique et insights</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">
                <strong>🚀 Intelligence Artificielle et Machine Learning Avancé :</strong> 
                Toutes les fonctionnalités d'IA juridique sont maintenant intégrées et accessibles dans cette section.
                Utilisez les onglets ci-dessus pour explorer chaque fonctionnalité en détail.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
