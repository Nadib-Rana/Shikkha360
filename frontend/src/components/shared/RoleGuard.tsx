import { ReactNode } from 'react';

interface Props {
  role: 'admin' | 'student' | 'teacher';
  allowed: string[];
  children: ReactNode;
}

export default function RoleGuard({ role, allowed, children }: Props) {
  return allowed.includes(role) ? <>{children}</> : <p className="text-red-500">Access Denied</p>;
}