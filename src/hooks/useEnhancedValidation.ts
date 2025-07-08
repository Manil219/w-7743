
import { useState, useCallback } from 'react';
import { enhancedValidator } from '@/utils/validation/enhancedValidator';

export function useEnhancedValidation() {
  const [validationResults, setValidationResults] = useState<Record<string, any>>({});

  const validateField = useCallback((type: string, value: any, fieldName: string, context?: string) => {
    const result = enhancedValidator.validate(type, value, context);
    setValidationResults(prev => ({
      ...prev,
      [fieldName]: result
    }));
    return result;
  }, []);

  const validateForm = useCallback((schema: Record<string, string>, data: Record<string, any>, context?: string) => {
    const result = enhancedValidator.validateObject(schema, data, context);
    setValidationResults(result.results);
    return result;
  }, []);

  const clearValidation = useCallback((fieldName?: string) => {
    if (fieldName) {
      setValidationResults(prev => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setValidationResults({});
    }
  }, []);

  return {
    validationResults,
    validateField,
    validateForm,
    clearValidation
  };
}
