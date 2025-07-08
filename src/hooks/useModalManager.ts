
import { useState, useCallback, useMemo } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';

export interface ModalState {
  [key: string]: {
    isOpen: boolean;
    data?: any;
    [key: string]: any;
  };
}

const initialModalState: ModalState = {
  pdfViewer: { isOpen: false, data: null },
  comparison: { isOpen: false, data: [] },
  filter: { isOpen: false, type: 'general' },
  feedback: { isOpen: false, type: 'feedback', itemTitle: '' },
  export: { isOpen: false, data: [], filename: 'export' },
  import: { isOpen: false, acceptedTypes: ['.csv', '.xlsx', '.json'] },
  advancedSearch: { isOpen: false, data: null },
  analysis: { isOpen: false, type: 'comparative', data: [] },
  management: { isOpen: false, type: 'domain' },
  workflow: { isOpen: false, data: null },
  aiGeneration: { isOpen: false, type: 'form', data: null },
  userManagement: { isOpen: false, action: 'create', user: null },
  alertManagement: { isOpen: false, alert: null },
  sessionManagement: { isOpen: false, data: null },
  documentViewer: { isOpen: false, document: null },
  templateManager: { isOpen: false, template: null },
  projectManager: { isOpen: false, project: null },
  tagManager: { isOpen: false, tag: null },
  workflowManager: { isOpen: false, workflow: null },
  geolocationSearch: { isOpen: false, location: null },
  notification: { isOpen: false, notification: null }
};

export function useModalManager() {
  const [modals, setModals] = useState<ModalState>(initialModalState);

  const openModal = useCallback((modalName: string, data?: any) => {
    performanceMonitor.recordMetric(`modal_open_${modalName}`, performance.now(), 'interaction');
    
    setModals(prev => ({
      ...prev,
      [modalName]: { ...prev[modalName], isOpen: true, ...data }
    }));
  }, []);

  const closeModal = useCallback((modalName: string) => {
    performanceMonitor.recordMetric(`modal_close_${modalName}`, performance.now(), 'interaction');
    
    setModals(prev => ({
      ...prev,
      [modalName]: { ...prev[modalName], isOpen: false }
    }));
  }, []);

  const closeAllModals = useCallback(() => {
    performanceMonitor.recordMetric('modal_close_all', performance.now(), 'interaction');
    
    setModals(prev => 
      Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: { ...prev[key], isOpen: false }
      }), {} as ModalState)
    );
  }, []);

  const modalStats = useMemo(() => ({
    openCount: Object.values(modals).filter(modal => modal.isOpen).length,
    isAnyOpen: Object.values(modals).some(modal => modal.isOpen)
  }), [modals]);

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    ...modalStats
  };
}
