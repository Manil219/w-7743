
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedInput } from '@/components/common/EnhancedInput';
import { EnhancedTextarea } from '@/components/common/EnhancedTextarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, MessageSquare, FileText, Search, Sparkles, Brain } from 'lucide-react';

export function AIAdvancedSection() {
  const [chatInput, setChatInput] = useState('');
  const [generationInput, setGenerationInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [generationResult, setGenerationResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    
    setChatHistory(prev => [...prev, { type: 'user', message: chatInput }]);
    setLoading(true);
    
    // Simulation de réponse IA
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        message: `Réponse intelligente basée sur votre question: "${chatInput}". L'IA analyse votre demande et fournit une réponse contextuelle pertinente.` 
      }]);
      setChatInput('');
      setLoading(false);
    }, 1500);
  };

  const handleGeneration = async () => {
    if (!generationInput.trim()) return;
    
    setLoading(true);
    setProgress(0);
    
    // Simulation de génération progressive
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerationResult(`Document généré automatiquement basé sur: "${generationInput}"\n\nContenu structuré et optimisé par l'IA...`);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-purple-600" />
          Intelligence Artificielle Avancée
        </h2>
        <p className="text-gray-600 text-lg">
          Exploitez la puissance de l'IA pour optimiser votre travail juridique
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Assistant IA
          </TabsTrigger>
          <TabsTrigger value="generation" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Génération de contenu
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Assistant IA Conversationnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Historique du chat */}
              <div className="min-h-[300px] max-h-[400px] overflow-y-auto border rounded-lg p-4 space-y-3">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-gray-500 mt-20">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Commencez une conversation avec l'assistant IA</p>
                  </div>
                ) : (
                  chatHistory.map((item, index) => (
                    <div
                      key={index}
                      className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          item.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {item.type === 'ai' && <Bot className="w-4 h-4" />}
                          <Badge variant={item.type === 'user' ? 'secondary' : 'outline'}>
                            {item.type === 'user' ? 'Vous' : 'Assistant IA'}
                          </Badge>
                        </div>
                        <p className="text-sm">{item.message}</p>
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 animate-pulse" />
                        <span className="text-sm">L'IA réfléchit...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Saisie du chat */}
              <div className="flex gap-2">
                <EnhancedInput
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Posez votre question à l'assistant IA..."
                  context="general"
                  enableVoice={true}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleChatSubmit}
                  disabled={loading || !chatInput.trim()}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Envoyer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Génération Automatique de Contenu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="generation-input">Description du contenu à générer</Label>
                <EnhancedTextarea
                  id="generation-input"
                  value={generationInput}
                  onChange={(e) => setGenerationInput(e.target.value)}
                  placeholder="Décrivez le type de document ou contenu que vous souhaitez générer..."
                  context="general"
                  enableVoice={true}
                  className="min-h-[120px]"
                />
              </div>

              <Button 
                onClick={handleGeneration}
                disabled={loading || !generationInput.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Générer le contenu
                  </>
                )}
              </Button>

              {loading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression de la génération</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {generationResult && (
                <Card className="border-2 border-purple-200 bg-purple-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <Badge className="bg-purple-600">Contenu généré par IA</Badge>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">
                        {generationResult}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
