
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGlobalStore } from '@/store/globalStore';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setAuthenticated, addNotification } = useGlobalStore();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // Simulate login with super admin
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Super admin credentials
      if (email === 'admin' && password === 'admin') {
        const superAdmin = {
          id: 'super-admin',
          email: 'admin@dalil.dz',
          role: 'admin' as const,
          name: 'Super Administrateur'
        };
        
        setUser(superAdmin);
        setAuthenticated(true);
        
        addNotification({
          type: 'success',
          message: t('auth.loginSuccess'),
          read: false
        });
        
        toast({
          title: t('common.success'),
          description: t('auth.loginSuccess')
        });
        
        return true;
      }
      
      // Mock other users for testing
      const mockUsers = [
        { email: 'juriste@dalil.dz', password: 'juriste123', role: 'juriste', name: 'Juriste Test' },
        { email: 'citoyen@dalil.dz', password: 'citoyen123', role: 'citoyen', name: 'Citoyen Test' }
      ];
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const authenticatedUser = {
          id: user.email,
          email: user.email,
          role: user.role as 'admin' | 'juriste' | 'citoyen',
          name: user.name
        };
        
        setUser(authenticatedUser);
        setAuthenticated(true);
        
        addNotification({
          type: 'success',
          message: t('auth.loginSuccess'),
          read: false
        });
        
        toast({
          title: t('common.success'),
          description: t('auth.loginSuccess')
        });
        
        return true;
      }
      
      toast({
        title: t('common.error'),
        description: t('auth.loginError'),
        variant: 'destructive'
      });
      
      return false;
      
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: t('common.error'),
        description: t('auth.loginError'),
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthenticated(false);
    
    addNotification({
      type: 'info',
      message: 'Déconnexion réussie',
      read: false
    });
    
    toast({
      title: t('common.info'),
      description: 'Vous avez été déconnecté'
    });
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: email,
        email,
        role: 'citoyen' as const,
        name
      };
      
      setUser(newUser);
      setAuthenticated(true);
      
      addNotification({
        type: 'success',
        message: t('auth.registerSuccess'),
        read: false
      });
      
      toast({
        title: t('common.success'),
        description: t('auth.registerSuccess')
      });
      
      return true;
      
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: t('common.error'),
        description: t('auth.registerError'),
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
