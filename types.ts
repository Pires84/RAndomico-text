export enum View {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  COLLABORATORS = 'COLLABORATORS',
  SORTEIOS = 'SORTEIOS',
  SETTINGS = 'SETTINGS',
  NOTIFICATIONS = 'NOTIFICATIONS',
  HELP = 'HELP'
}

export interface Collaborator {
  id: string;
  matricula: string;
  name: string;
  gender: 'M' | 'F';
  sector: string;
  status: 'Ativo' | 'Férias' | 'Pendente' | 'Afastado';
  lastExam: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  time: string;
}

export interface KPI {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
  icon: string;
  variant: 'white' | 'orange';
}