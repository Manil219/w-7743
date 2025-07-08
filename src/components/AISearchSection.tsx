
import { EnhancedAILegalAssistant } from './ai/EnhancedAILegalAssistant';

interface AISearchSectionProps {
  language?: string;
}

export function AISearchSection({ language = "fr" }: AISearchSectionProps) {
  return <EnhancedAILegalAssistant />;
}
