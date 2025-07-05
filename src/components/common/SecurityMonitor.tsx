
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, Activity, Lock, Eye, RefreshCw } from "lucide-react";

interface SecurityMetric {
  name: string;
  status: "secure" | "warning" | "critical";
  score: number;
  lastCheck: string;
  description: string;
  recommendation?: string;
}

interface SecurityAlert {
  id: string;
  type: "threat" | "vulnerability" | "policy";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: string;
  resolved: boolean;
}

export function SecurityMonitor() {
  const [metrics, setMetrics] = useState<SecurityMetric[]>([
    {
      name: "Authentification",
      status: "secure",
      score: 95,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Système d'authentification sécurisé",
      recommendation: "Considérer l'authentification à deux facteurs"
    },
    {
      name: "Chiffrement des données",
      status: "secure",
      score: 98,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Chiffrement AES-256 actif"
    },
    {
      name: "Validation des entrées",
      status: "warning",
      score: 85,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Validation stricte des données utilisateur",
      recommendation: "Implémenter la sanitisation HTML"
    },
    {
      name: "Protection CSRF",
      status: "secure",
      score: 92,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Protection contre les attaques CSRF"
    },
    {
      name: "Sécurité des sessions",
      status: "warning",
      score: 78,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Gestion sécurisée des sessions utilisateur",
      recommendation: "Réduire la durée des sessions"
    },
    {
      name: "Audit des logs",
      status: "secure",
      score: 90,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Journalisation des événements de sécurité"
    }
  ]);

  const [alerts, setAlerts] = useState<SecurityAlert[]>([
    {
      id: "1",
      type: "vulnerability",
      severity: "medium",
      message: "Mise à jour de sécurité disponible pour les dépendances",
      timestamp: new Date().toLocaleString('fr-FR'),
      resolved: false
    },
    {
      id: "2",
      type: "policy", 
      severity: "low",
      message: "Politique de mots de passe à renforcer",
      timestamp: new Date(Date.now() - 3600000).toLocaleString('fr-FR'),
      resolved: false
    }
  ]);

  const [isScanning, setIsScanning] = useState(false);

  const runSecurityScan = async () => {
    setIsScanning(true);
    
    // Simulation d'un scan de sécurité
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mise à jour des métriques
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      lastCheck: new Date().toLocaleString('fr-FR'),
      score: Math.min(100, metric.score + Math.floor(Math.random() * 5))
    })));
    
    setIsScanning(false);
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "secure": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const overallScore = Math.round(metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length);
  const activeAlertsCount = alerts.filter(alert => !alert.resolved).length;

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Moniteur de sécurité</h2>
          <p className="text-gray-600">Surveillance en temps réel de la sécurité de l'application</p>
        </div>
        <Button 
          onClick={runSecurityScan}
          disabled={isScanning}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Scan en cours...' : 'Lancer un scan'}
        </Button>
      </div>

      {/* Score global et alertes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              Score de sécurité global
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-teal-600">{overallScore}%</div>
                <div className="text-sm text-gray-600">Niveau de sécurité</div>
              </div>
              <div className="flex items-center gap-2">
                {overallScore >= 90 ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                )}
              </div>
            </div>
            <Progress value={overallScore} className="h-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Alertes actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{activeAlertsCount}</div>
              <div className="text-sm text-gray-600">Alertes non résolues</div>
              {activeAlertsCount === 0 && (
                <div className="mt-2 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Aucune alerte active
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métriques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                  <h4 className="font-semibold text-sm">{metric.name}</h4>
                </div>
                <Badge className={
                  metric.status === "secure" ? "bg-green-100 text-green-800" :
                  metric.status === "warning" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }>
                  {metric.score}%
                </Badge>
              </div>
              <Progress value={metric.score} className="h-2 mb-2" />
              <p className="text-xs text-gray-500 mb-2">{metric.description}</p>
              {metric.recommendation && (
                <p className="text-xs text-blue-600 italic">{metric.recommendation}</p>
              )}
              <div className="text-xs text-gray-400 mt-2">
                Dernière vérification: {metric.lastCheck}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alertes détaillées */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Alertes de sécurité</h3>
          {alerts.filter(alert => !alert.resolved).map((alert) => (
            <Alert key={alert.id}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-gray-500">{alert.timestamp}</span>
                  </div>
                  <div>{alert.message}</div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => resolveAlert(alert.id)}
                >
                  Résoudre
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Recommandations de sécurité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-600" />
            Recommandations de sécurité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Authentification forte</h4>
                <p className="text-sm text-blue-700">Implémentez l'authentification à deux facteurs pour renforcer la sécurité.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900">Audit régulier</h4>
                <p className="text-sm text-green-700">Programmez des audits de sécurité automatiques hebdomadaires.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-900">Mise à jour des dépendances</h4>
                <p className="text-sm text-orange-700">Maintenez toutes les dépendances à jour pour éviter les vulnérabilités connues.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
