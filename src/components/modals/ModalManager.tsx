
import React from 'react';
import { useModalManager } from '@/hooks/useModalManager';
import { ModalProvider } from './context/ModalProvider';

// Import des modales optimisées
import { ComparisonModal } from './ComparisonModal';
import { PDFViewerModal } from './PDFViewerModal';
import { DocumentViewerModal } from './DocumentViewerModal';
import { ExportModal } from './ExportModal';
import { ImportModal } from './ImportModal';
import { FilterModal } from './FilterModal';
import { FeedbackModal } from './FeedbackModal';
import { UserManagementModal } from './UserManagementModal';
import { SessionManagementModal } from './SessionManagementModal';
import { WorkflowModal } from './WorkflowModal';
import { TemplateManagerModal } from './TemplateManagerModal';
import { TagManagerModal } from './TagManagerModal';
import { NotificationModal } from './NotificationModal';
import { AnalysisModal } from './AnalysisModal';

export function ModalManager() {
  const { modals, closeModal, openModal } = useModalManager();

  return (
    <ModalProvider>
      {/* Modales de visualisation */}
      <PDFViewerModal
        isOpen={modals.pdfViewer?.isOpen || false}
        onClose={() => closeModal('pdfViewer')}
        title={modals.pdfViewer?.title || 'Document PDF'}
        pdfUrl={modals.pdfViewer?.data?.url}
      />
      
      <DocumentViewerModal
        isOpen={modals.documentViewer?.isOpen || false}
        onClose={() => closeModal('documentViewer')}
        document={modals.documentViewer?.document}
      />

      {/* Modales de données */}
      <ComparisonModal
        isOpen={modals.comparison?.isOpen || false}
        onClose={() => closeModal('comparison')}
        items={modals.comparison?.data || []}
        onExport={(items) => openModal('export', { data: items, filename: 'comparison' })}
      />
      
      <ExportModal
        isOpen={modals.export?.isOpen || false}
        onClose={() => closeModal('export')}
        data={modals.export?.data || []}
        filename={modals.export?.filename || 'export'}
      />
      
      <ImportModal
        isOpen={modals.import?.isOpen || false}
        onClose={() => closeModal('import')}
        acceptedTypes={modals.import?.acceptedTypes || ['.csv', '.xlsx', '.json']}
        onImport={(files) => {
          console.log('Importing files:', files);
          closeModal('import');
        }}
      />

      {/* Modales d'interaction */}
      <FilterModal
        isOpen={modals.filter?.isOpen || false}
        onClose={() => closeModal('filter')}
        onFiltersApply={(filters) => {
          console.log('Applying filters:', filters);
          closeModal('filter');
        }}
        filterType={modals.filter?.type || 'general'}
      />
      
      <FeedbackModal
        isOpen={modals.feedback?.isOpen || false}
        onClose={() => closeModal('feedback')}
        type={modals.feedback?.type || 'feedback'}
        itemTitle={modals.feedback?.itemTitle}
      />

      {/* Modales de gestion */}
      <UserManagementModal
        isOpen={modals.userManagement?.isOpen || false}
        onClose={() => closeModal('userManagement')}
        action={modals.userManagement?.action || 'create'}
        user={modals.userManagement?.user}
        onSave={(userData) => {
          console.log('Saving user:', userData);
          closeModal('userManagement');
        }}
      />
      
      <SessionManagementModal
        isOpen={modals.sessionManagement?.isOpen || false}
        onClose={() => closeModal('sessionManagement')}
        data={modals.sessionManagement?.data}
        onAction={(action, data) => {
          console.log('Session action:', action, data);
        }}
      />

      {/* Modales de workflow */}
      <WorkflowModal
        isOpen={modals.workflowManager?.isOpen || false}
        onClose={() => closeModal('workflowManager')}
        workflow={modals.workflowManager?.workflow}
        onSave={(workflow) => {
          console.log('Saving workflow:', workflow);
          closeModal('workflowManager');
        }}
      />
      
      <TemplateManagerModal
        isOpen={modals.templateManager?.isOpen || false}
        onClose={() => closeModal('templateManager')}
        template={modals.templateManager?.template}
        onSave={(template) => {
          console.log('Saving template:', template);
          closeModal('templateManager');
        }}
      />
      
      <TagManagerModal
        isOpen={modals.tagManager?.isOpen || false}
        onClose={() => closeModal('tagManager')}
        tag={modals.tagManager?.tag}
        onSave={(tag) => {
          console.log('Saving tag:', tag);
          closeModal('tagManager');
        }}
      />

      {/* Modales de communication */}
      <NotificationModal
        isOpen={modals.notification?.isOpen || false}
        onClose={() => closeModal('notification')}
        notification={modals.notification?.notification}
        onSend={(notification) => {
          console.log('Sending notification:', notification);
          closeModal('notification');
        }}
      />

      {/* Modales d'analyse */}
      <AnalysisModal
        isOpen={modals.analysis?.isOpen || false}
        onClose={() => closeModal('analysis')}
        type={modals.analysis?.type || 'comparative'}
        data={modals.analysis?.data || []}
      />
    </ModalProvider>
  );
}

// Hook personnalisé pour utiliser les modales dans l'application
export function useModals() {
  return useModalManager();
}
