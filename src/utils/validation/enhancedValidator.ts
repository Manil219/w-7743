
import { securityMonitor } from '@/utils/enhancedSecurity';
import { ValidationRule, stringValidationRules, emailValidationRules, passwordValidationRules } from './validationRules';
import { sanitizers } from './sanitizers';

class EnhancedValidator {
  private rules: Map<string, ValidationRule[]> = new Map();
  private sanitizers: Map<string, (value: any) => any> = new Map();

  constructor() {
    this.initializeRules();
    this.initializeSanitizers();
  }

  private initializeRules() {
    this.rules.set('string', stringValidationRules);
    this.rules.set('email', emailValidationRules);
    this.rules.set('password', passwordValidationRules);
  }

  private initializeSanitizers() {
    Object.entries(sanitizers).forEach(([type, sanitizer]) => {
      this.sanitizers.set(type, sanitizer);
    });
  }

  validate(type: string, value: any, context?: string) {
    const rules = this.rules.get(type) || [];
    const errors: string[] = [];
    const warnings: string[] = [];

    rules.forEach(rule => {
      try {
        if (!rule.test(value)) {
          if (rule.critical) {
            errors.push(rule.message);
            securityMonitor.logSecurityEvent('critical_validation_failure', {
              rule: rule.name,
              type,
              context,
              value: typeof value === 'string' ? value.substring(0, 50) : value
            });
          } else {
            warnings.push(rule.message);
          }
        }
      } catch (error) {
        console.warn(`Validation rule ${rule.name} failed to execute:`, error);
      }
    });

    const sanitizer = this.sanitizers.get(type);
    const sanitized = sanitizer ? sanitizer(value) : value;

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitized
    };
  }

  validateObject(schema: Record<string, string>, data: Record<string, any>, context?: string) {
    const results: Record<string, any> = {};
    let hasErrors = false;

    Object.entries(schema).forEach(([field, type]) => {
      const value = data[field];
      const result = this.validate(type, value, `${context}.${field}`);
      results[field] = result;
      
      if (!result.isValid) {
        hasErrors = true;
      }
    });

    return {
      isValid: !hasErrors,
      results,
      sanitized: Object.keys(results).reduce((acc, key) => {
        acc[key] = results[key].sanitized;
        return acc;
      }, {} as Record<string, any>)
    };
  }
}

export const enhancedValidator = new EnhancedValidator();
