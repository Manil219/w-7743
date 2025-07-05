
import React from 'react';
import { Input } from '@/components/ui/input';
import { securityMonitor } from '@/utils/enhancedSecurity';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  context?: string;
  onSecurityViolation?: (threats: string[]) => void;
}

export function SecureInput({ 
  context = 'user_input',
  onSecurityViolation,
  onChange,
  ...props 
}: SecureInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Validation de sécurité
    const validation = securityMonitor.validateInput(value, context);
    
    if (!validation.isValid && onSecurityViolation) {
      onSecurityViolation(validation.threats);
    }
    
    // Utiliser la valeur sanitisée
    e.target.value = validation.sanitized;
    
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Input
      {...props}
      onChange={handleChange}
    />
  );
}
