import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LegalTextHistoryTab } from './legal/LegalTextHistoryTab';
import { LegalTextsPendingApprovalTab } from './legal/LegalTextsPendingApprovalTab';
import { LegalTextsEnrichmentTab } from './legal/LegalTextsEnrichmentTab';
import { LegalTextsCatalogTab } from './legal/LegalTextsCatalogTab';
import { LegalTextsTimelineTab } from './legal/LegalTextsTimelineTab';
import { LegalTextsComparisonTab } from './legal/LegalTextsComparisonTab';
import { LegalTextsSearchTab } from './legal/LegalTextsSearchTab';

interface LegalTextsTabsProps {
  section: string;
  onAddLegalText?: () => void;
  onOpenApprovalQueue?: () => void;
  onOCRTextExtracted?: (text: string) => void;
}

export function LegalTextsTabs({ section, onAddLegalText, onOpenApprovalQueue, onOCRTextExtracted }: LegalTextsTabsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getTabsConfig = () => {
    switch (section) {
      case 'legal-catalog':
        return {
          defaultValue: 'catalog',
          tabs: [
            { 
              value: 'catalog', 
              label: 'Catalogue', 
              content: (
                <LegalTextsCatalogTab 
                  onAddLegalText={onAddLegalText}
                  onOpenApprovalQueue={onOpenApprovalQueue}
                />
              )
            },
            { 
              value: 'timeline', 
              label: 'Timeline des procédures', 
              content: <LegalTextsTimelineTab />
            },
            { 
              value: 'comparison', 
              label: 'Comparaison des procédures', 
              content: <LegalTextsComparisonTab />
            },
            { 
              value: 'history', 
              label: 'Historiques des versions', 
              content: <LegalTextHistoryTab />
            }
          ]
        };
      case 'legal-search':
        return {
          defaultValue: 'search',
          tabs: [
            { 
              value: 'search', 
              label: 'Recherche de Textes Juridiques', 
              content: <LegalTextsSearchTab />
            },
            { 
              value: 'history', 
              label: 'Historique des recherches', 
              content: <LegalTextHistoryTab />
            }
          ]
        };
      case 'legal-enrichment':
        return {
          defaultValue: 'enrichment',
          tabs: [
            { 
              value: 'enrichment', 
              label: 'Alimentation', 
              content: (
                <LegalTextsEnrichmentTab 
                  onAddLegalText={onAddLegalText || (() => {})}
                  onOCRTextExtracted={onOCRTextExtracted}
                />
              )
            },
            { 
              value: 'pending-approval', 
              label: 'Textes juridiques en attente de publication', 
              content: <LegalTextsPendingApprovalTab />
            }
          ]
        };
      default:
        return {
          defaultValue: 'enrichment',
          tabs: [
            { 
              value: 'enrichment', 
              label: 'Alimentation', 
              content: (
                <LegalTextsEnrichmentTab 
                  onAddLegalText={onAddLegalText || (() => {})}
                  onOCRTextExtracted={onOCRTextExtracted}
                />
              )
            }
          ]
        };
    }
  };

  const tabsConfig = getTabsConfig();

  return (
    <div className="space-y-6">
      <Tabs defaultValue={tabsConfig.defaultValue} className="w-full">
        <TabsList className={`grid w-full ${
          tabsConfig.tabs.length === 1 ? 'grid-cols-1' : 
          tabsConfig.tabs.length === 2 ? 'grid-cols-2' : 
          tabsConfig.tabs.length === 3 ? 'grid-cols-3' : 
          'grid-cols-4'
        }`}>
          {tabsConfig.tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabsConfig.tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
