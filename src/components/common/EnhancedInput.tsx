
import React from 'react';
import { Input } from '@/components/ui/input';
import { VoiceSearchInput } from './VoiceSearchInput';
import { cn } from '@/lib/utils';

interface EnhancedInputProps extends React.ComponentProps<"input"> {
  enableVoice?: boolean;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  suggestions?: Array<{
    id: string;
    text: string;
    type: 'recent' | 'suggestion' | 'template' | 'legal_term';
    category?: string;
  }>;
}

export function EnhancedInput({ 
  enableVoice = true, 
  context = 'general',
  suggestions,
  className,
  value,
  onChange,
  onKeyPress,
  placeholder,
  ...props 
}: EnhancedInputProps) {
  // Si enableVoice est true, utiliser VoiceSearchInput, sinon Input standard
  if (enableVoice) {
    return (
      <VoiceSearchInput
        value={value as string || ''}
        onChange={(val) => onChange?.({ target: { value: val } } as any)}
        placeholder={placeholder}
        context={context}
        className={className}
        onKeyPress={onKeyPress}
        suggestions={suggestions}
        showVoiceButton={true}
      />
    );
  }

  return (
    <Input
      {...props}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      className={className}
    />
  );
}
