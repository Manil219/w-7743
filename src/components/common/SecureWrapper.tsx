
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';
import { securityMonitor } from '@/utils/enhancedSecurity';

interface SecureWrapperProps {
  children: React.ReactNode;
  onSecurityViolation?: (threats: string[]) => void;
}

export function SecureWrapper({ children, onSecurityViolation }: SecureWrapperProps) {
  const [securityStatus, setSecurityStatus] = React.useState<'safe' | 'warning' | 'danger'>('safe');
  const [lastCheck, setLastCheck] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const report = securityMonitor.getSecurityReport();
    
    if (report.last24h > 10) {
      setSecurityStatus('warning');
    } else if (report.last24h > 20) {
      setSecurityStatus('danger');
    } else {
      setSecurityStatus('safe');
    }
    
    setLastCheck(new Date());
  }, []);

  return (
    <div className="space-y-4">
      {securityStatus !== 'safe' && (
        <Alert variant={securityStatus === 'danger' ? 'destructive' : 'default'}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {securityStatus === 'warning' 
              ? 'Activité suspecte détectée. Soyez vigilant avec les entrées utilisateur.'
              : 'Niveau de menace élevé détecté. Vérifiez les logs de sécurité.'
            }
          </AlertDescription>
        </Alert>
      )}
      {children}
      <div className="text-xs text-gray-500 flex items-center gap-1">
        <Shield className="w-3 h-3" />
        Protection active - Dernière vérification: {lastCheck.toLocaleTimeString()}
      </div>
    </div>
  );
}
