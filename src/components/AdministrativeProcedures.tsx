
import { useState } from "react";
import { AdministrativeProcedure } from "@/types/legal";
import { ProceduresTabs } from "@/components/ProceduresTabs";
import { ProcedureSummaryModal } from "@/components/ProcedureSummaryModal";
import { ProcedureDetailView } from "@/components/procedures/ProcedureDetailView";
import { ProcedureFormView } from "@/components/procedures/ProcedureFormView";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ClipboardList } from "lucide-react";

export function AdministrativeProcedures() {
  const [selectedProcedure, setSelectedProcedure] = useState<AdministrativeProcedure | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'form'>('list');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [lastAddedProcedure, setLastAddedProcedure] = useState<any>(null);

  console.log('AdministrativeProcedures rendered, currentView:', currentView);

  const handleProcedureSubmit = (data: any) => {
    console.log('Procedure submitted:', data);
    setLastAddedProcedure(data);
    setCurrentView('list');
    setShowSummaryModal(true);
  };

  const handleAddAnotherProcedure = () => {
    console.log('Add another procedure clicked');
    setShowSummaryModal(false);
    setCurrentView('form');
  };

  const handleCloseSummary = () => {
    console.log('Close summary clicked');
    setShowSummaryModal(false);
    setLastAddedProcedure(null);
  };

  const handleOpenApprovalQueue = () => {
    console.log('Opening approval queue...');
    // TODO: Implement approval queue modal or navigation
  };

  if (currentView === 'form') {
    console.log('Rendering form view');
    return (
      <ProcedureFormView 
        onBack={() => {
          console.log('Back to list from form');
          setCurrentView('list');
        }}
        onSubmit={handleProcedureSubmit}
      />
    );
  }

  if (currentView === 'detail' && selectedProcedure) {
    console.log('Rendering detail view for procedure:', selectedProcedure.id);
    return (
      <ProcedureDetailView 
        procedure={selectedProcedure}
        onBack={() => {
          console.log('Back to list from detail');
          setSelectedProcedure(null);
          setCurrentView('list');
        }}
      />
    );
  }

  console.log('Rendering list view');
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Procédures Administratives"
        description="Gestion et consultation des procédures administratives algériennes"
        icon={ClipboardList}
        iconColor="text-blue-600"
      />
      
      <ProceduresTabs 
        section="procedures-catalog" 
        onAddProcedure={() => {
          console.log('Add procedure clicked');
          setCurrentView('form');
        }}
        onOpenApprovalQueue={handleOpenApprovalQueue}
      />
      
      <ProcedureSummaryModal
        isOpen={showSummaryModal}
        onClose={handleCloseSummary}
        onAddAnother={handleAddAnotherProcedure}
        procedureData={lastAddedProcedure}
      />
    </div>
  );
}
