
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ClipboardList, Users, TrendingUp, Clock, CheckCircle, Star, BookOpen } from 'lucide-react';
import { useLegalTexts } from '@/hooks/useLegalTexts';
import { useProcedures } from '@/hooks/useProcedures';
import { useProfile } from '@/hooks/useProfile';

export function StatsGrid() {
  const { texts, isLoading: textsLoading } = useLegalTexts();
  const { procedures, isLoading: proceduresLoading } = useProcedures();
  const { profile } = useProfile();

  const stats = [
    {
      title: 'Textes Juridiques',
      value: textsLoading ? '...' : texts.length.toLocaleString(),
      description: 'Textes disponibles',
      icon: FileText,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Procédures Administratives', 
      value: proceduresLoading ? '...' : procedures.length.toLocaleString(),
      description: 'Procédures disponibles',
      icon: ClipboardList,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Textes En Vigueur',
      value: textsLoading ? '...' : texts.filter(t => t.status === 'en_vigueur').length.toLocaleString(),
      description: 'Textes actifs',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Procédures Actives',
      value: proceduresLoading ? '...' : procedures.filter(p => p.status === 'active').length.toLocaleString(),
      description: 'Procédures disponibles',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Catégories Juridiques',
      value: textsLoading ? '...' : [...new Set(texts.map(t => t.category))].length.toLocaleString(),
      description: 'Domaines couverts',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Institutions',
      value: proceduresLoading ? '...' : [...new Set(procedures.map(p => p.institution))].length.toLocaleString(),
      description: 'Organismes publics',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-md ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
