export interface Resolution {
  title: string;
  description?: string;
  isPublic: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface ResolutionLog {
  logDate: string;
  followScore: number;
  notes?: string;
  createdAt: string;
}