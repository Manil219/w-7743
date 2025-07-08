import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdvancedCollaborationTools } from '@/components/collaboration/AdvancedCollaborationTools';
import { EnhancedForum } from '@/components/collaboration/EnhancedForum';
import { DomainForums } from '@/components/collaboration/DomainForums';
import { CollaborativeAnnotations } from '@/components/collaboration/CollaborativeAnnotations';
import { CollaborativeWorkflow } from '@/components/collaboration/CollaborativeWorkflow';
import { SecureFileSharing } from '@/components/collaboration/SecureFileSharing';
import { 
  Users, 
  MessageSquare, 
  Share2, 
  Search, 
  Plus, 
  Calendar,
  FileText,
  User,
  Clock,
  Heart,
  Reply,
  Pin,
  Eye,
  Download,
  Star,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Filter,
  UserPlus,
  Upload,
  FolderOpen,
  Tag
} from 'lucide-react';

interface CollaborationSectionsProps {
  section: string;
  language: string;
}

export function CollaborationSections({ section, language }: CollaborationSectionsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getSectionTitle = () => {
    switch (section) {
      case 'forum':
        return 'Forum de discussion juridique';
      case 'collaborative-workspace':
        return 'Espace de travail collaboratif';
      case 'shared-resources':
        return 'Ressources partagées';
      default:
        return 'Collaboration';
    }
  };

  const getSectionDescription = () => {
    switch (section) {
      case 'forum':
        return 'Échangez avec la communauté juridique, posez vos questions et partagez vos expertises';
      case 'collaborative-workspace':
        return 'Travaillez en équipe sur des projets juridiques, partagez des documents et coordonnez vos actions';
      case 'shared-resources':
        return 'Accédez aux ressources partagées par la communauté et contribuez avec vos propres documents';
      default:
        return 'Outils de collaboration pour la communauté juridique';
    }
  };

  const forumTopics = [
    {
      id: 1,
      title: "Nouvelle réforme du droit des sociétés 2025",
      author: "Dr. Ahmed Benali",
      role: "Avocat spécialisé",
      replies: 23,
      views: 456,
      lastActivity: "Il y a 2 heures",
      tags: ["réforme", "sociétés", "2025"],
      isPinned: true,
      isHot: true
    },
    {
      id: 2,
      title: "Interprétation de l'article 124 du Code civil",
      author: "Me. Fatima Zahra",
      role: "Juriste d'entreprise",
      replies: 15,
      views: 289,
      lastActivity: "Il y a 4 heures",
      tags: ["code civil", "interprétation"],
      isPinned: false,
      isHot: false
    },
    {
      id: 3,
      title: "Procédures de divorce : nouvelles modalités",
      author: "Prof. Mohamed Cherif",
      role: "Universitaire",
      replies: 31,
      views: 678,
      lastActivity: "Il y a 1 jour",
      tags: ["divorce", "procédures", "famille"],
      isPinned: false,
      isHot: true
    }
  ];

  const workspaceProjects = [
    {
      id: 1,
      name: "Révision du règlement intérieur",
      description: "Mise à jour du règlement intérieur de l'entreprise selon les nouvelles dispositions légales",
      members: ["Ahmed B.", "Fatima Z.", "Omar K."],
      progress: 75,
      dueDate: "28 janvier 2025",
      status: "En cours",
      lastUpdate: "Il y a 1 heure"
    },
    {
      id: 2,
      name: "Analyse jurisprudentielle - Droit du travail",
      description: "Étude comparative des dernières décisions en matière de droit du travail",
      members: ["Sarah M.", "Karim L."],
      progress: 45,
      dueDate: "5 février 2025",
      status: "En cours",
      lastUpdate: "Il y a 3 heures"
    },
    {
      id: 3,
      name: "Guide des procédures administratives",
      description: "Création d'un guide pratique pour les nouvelles procédures administratives",
      members: ["Youssef A.", "Aicha B.", "Hassan M.", "Leila K."],
      progress: 90,
      dueDate: "20 janvier 2025",
      status: "Finalisation",
      lastUpdate: "Il y a 30 minutes"
    }
  ];

  const sharedResources = [
    {
      id: 1,
      title: "Modèles de contrats commerciaux 2025",
      type: "ZIP",
      size: "15.2 MB",
      author: "Cabinet Juridique Al-Adala",
      downloads: 1245,
      rating: 4.8,
      category: "Contrats",
      uploadDate: "12 janvier 2025",
      description: "Collection complète de modèles de contrats commerciaux mis à jour selon la législation 2025"
    },
    {
      id: 2,
      title: "Guide pratique - Procédures douanières",
      type: "PDF",
      size: "5.7 MB",
      author: "Direction Générale des Douanes",
      downloads: 892,
      rating: 4.6,
      category: "Douanes",
      uploadDate: "10 janvier 2025",
      description: "Guide officiel des procédures douanières simplifiées pour les entreprises"
    },
    {
      id: 3,
      title: "Jurisprudence environnementale - Recueil 2024",
      type: "PDF",
      size: "28.4 MB",
      author: "Tribunal Administratif de Rabat",
      downloads: 567,
      rating: 4.9,
      category: "Environnement",
      uploadDate: "8 janvier 2025",
      description: "Compilation des principales décisions en matière de droit de l'environnement"
    }
  ];

  const renderForum = () => (
    <Tabs defaultValue="discussions" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="discussions">Discussions</TabsTrigger>
        <TabsTrigger value="experts">Forum Expert</TabsTrigger>
        <TabsTrigger value="domains">Forums par Domaine</TabsTrigger>
      </TabsList>

      <TabsContent value="discussions" className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher dans le forum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau sujet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">245</div>
              <div className="text-sm text-gray-600">Sujets actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">1,289</div>
              <div className="text-sm text-gray-600">Membres</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">3,567</div>
              <div className="text-sm text-gray-600">Réponses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">45,123</div>
              <div className="text-sm text-gray-600">Vues totales</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Discussions récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {forumTopics.map((topic) => (
                <div key={topic.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {topic.isPinned && <Pin className="w-4 h-4 text-red-500" />}
                        {topic.isHot && <Badge className="bg-red-100 text-red-800">🔥 Populaire</Badge>}
                        <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {topic.author} • {topic.role}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {topic.lastActivity}
                        </span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {topic.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Reply className="w-4 h-4" />
                          {topic.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {topic.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="experts">
        <EnhancedForum />
      </TabsContent>

      <TabsContent value="domains">
        <DomainForums />
      </TabsContent>
    </Tabs>
  );

  const renderWorkspace = () => (
    <Tabs defaultValue="projects" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="projects">Projets</TabsTrigger>
        <TabsTrigger value="annotations">Annotations</TabsTrigger>
        <TabsTrigger value="workflows">Workflows</TabsTrigger>
        <TabsTrigger value="advanced">Collaboration Avancée</TabsTrigger>
      </TabsList>

      <TabsContent value="projects" className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau projet
            </Button>
            <Button variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Inviter des membres
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher des projets..."
              className="pl-10 w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workspaceProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-2">{project.description}</CardDescription>
                  </div>
                  <Badge className={
                    project.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'Finalisation' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progression</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Équipe ({project.members.length} membres)</div>
                    <div className="flex -space-x-2">
                      {project.members.map((member, index) => (
                        <div 
                          key={index}
                          className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                        >
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-8 h-8 rounded-full p-0 ml-2">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Échéance :</span>
                      <div className="font-medium">{project.dueDate}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Dernière activité :</span>
                      <div className="font-medium">{project.lastUpdate}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      Documents
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Discussion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="annotations">
        <CollaborativeAnnotations />
      </TabsContent>

      <TabsContent value="workflows">
        <CollaborativeWorkflow />
      </TabsContent>

      <TabsContent value="advanced">
        <AdvancedCollaborationTools />
      </TabsContent>
    </Tabs>
  );

  const renderSharedResources = () => (
    <Tabs defaultValue="resources" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="resources">Ressources</TabsTrigger>
        <TabsTrigger value="secure">Partage Sécurisé</TabsTrigger>
      </TabsList>

      <TabsContent value="resources" className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des ressources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Upload className="w-4 h-4 mr-2" />
            Partager une ressource
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-gray-600">Ressources</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Download className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">12,345</div>
              <div className="text-sm text-gray-600">Téléchargements</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-gray-600">Contributeurs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">4.7</div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sharedResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="mt-2">{resource.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{resource.type}</Badge>
                      <span className="text-gray-500">{resource.size}</span>
                      <Badge className="bg-blue-100 text-blue-800">{resource.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(resource.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-1 text-gray-600">{resource.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {resource.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {resource.uploadDate}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500">
                    <Download className="w-4 h-4 inline mr-1" />
                    {resource.downloads.toLocaleString()} téléchargements
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Aperçu
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="secure">
        <SecureFileSharing />
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          {section === 'forum' && <MessageSquare className="w-6 h-6 text-emerald-600" />}
          {section === 'collaborative-workspace' && <Users className="w-6 h-6 text-emerald-600" />}
          {section === 'shared-resources' && <Share2 className="w-6 h-6 text-emerald-600" />}
          {getSectionTitle()}
        </h2>
        <p className="text-gray-600">
          {getSectionDescription()}
        </p>
      </div>

      {section === 'forum' && renderForum()}
      {section === 'collaborative-workspace' && renderWorkspace()}
      {section === 'shared-resources' && renderSharedResources()}
    </div>
  );
}
