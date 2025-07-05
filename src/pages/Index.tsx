
import React, { useState } from 'react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainNavigation } from '@/components/MainNavigation';
import { ContentRenderer } from '@/components/layout/ContentRenderer';
import { Footer } from '@/components/Footer';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ClipboardList, Search, BookOpen, Users } from 'lucide-react';

function Index() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [language, setLanguage] = useState('fr');

  console.log('Index component rendered, currentSection:', currentSection);

  const quickActions = [
    {
      title: 'Rechercher un texte juridique',
      description: 'Trouvez rapidement les textes de loi dont vous avez besoin',
      icon: Search,
      action: () => setCurrentSection('legal-search'),
      color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
    },
    {
      title: 'Consulter les procédures',
      description: 'Explorez les procédures administratives disponibles',
      icon: ClipboardList,
      action: () => setCurrentSection('procedures-catalog'),
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    },
    {
      title: 'Ajouter un texte juridique',
      description: 'Contribuez à enrichir la base de données juridiques',
      icon: FileText,
      action: () => setCurrentSection('legal-enrichment'),
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    },
    {
      title: 'Mes recherches sauvegardées',
      description: 'Accédez à vos recherches et favoris',
      icon: BookOpen,
      action: () => setCurrentSection('saved-searches'),
      color: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    },
  ];

  if (currentSection !== 'dashboard') {
    console.log('Rendering non-dashboard section:', currentSection);
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <MainHeader 
          language={language} 
          onLanguageChange={setLanguage}
          activeSection={currentSection}
          onSectionChange={setCurrentSection}
        />
        <div className="flex flex-1">
          <MainNavigation 
            activeSection={currentSection}
            onSectionChange={setCurrentSection}
            language={language}
          />
          <main className="flex-1 p-6">
            <ContentRenderer 
              activeSection={currentSection} 
              language={language}
            />
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  console.log('Rendering dashboard section');
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MainHeader 
        language={language} 
        onLanguageChange={setLanguage}
        activeSection={currentSection}
        onSectionChange={setCurrentSection}
      />
      
      <div className="flex flex-1">
        <MainNavigation 
          activeSection={currentSection}
          onSectionChange={setCurrentSection}
          language={language}
        />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">
              Bienvenue sur DALIL - Guide Algérien du Droit et des Procédures Administratives
            </h1>
            <p className="text-emerald-50">
              Votre plateforme centralisée pour accéder aux textes juridiques algériens et aux procédures administratives.
            </p>
          </div>

          {/* Statistics */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Aperçu de la plateforme</h2>
            <StatsGrid />
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                  console.log('Quick action clicked:', action.title);
                  action.action();
                }}>
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-sm">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs">
                      {action.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Commencez à explorer</h3>
                  <p className="text-gray-600 mb-4">
                    Votre activité récente apparaîtra ici une fois que vous commencerez à utiliser la plateforme.
                  </p>
                  <Button onClick={() => {
                    console.log('Start search button clicked');
                    setCurrentSection('legal-search');
                  }}>
                    Commencer une recherche
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default Index;
