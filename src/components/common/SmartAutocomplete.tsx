
import React from 'react';
import { EnhancedInput } from './EnhancedInput';

interface AutocompleteOption {
  id: string;
  text: string;
  type: 'recent' | 'suggestion' | 'template' | 'legal_term';
  category?: string;
  frequency?: number;
}

interface SmartAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  suggestions?: AutocompleteOption[];
}

export function SmartAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Tapez pour commencer...",
  context = 'general',
  className,
  onKeyPress,
  suggestions = []
}: SmartAutocompleteProps) {
  return (
    <EnhancedInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      context={context}
      className={className}
      onKeyPress={onKeyPress}
      enableVoice={true}
      suggestions={suggestions}
    />
  );
}
