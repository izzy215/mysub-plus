// //라우팅 보호

'use client';

// import { ReactNode, useEffect } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/navigation';

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// //isAuthenticated 없으면 /login 으로 redirect
// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       //isAuthenticated 없으면 /login 으로 redirect
//       router.push('/login');
//     }
//   }, [isAuthenticated, router]);
  
//   //isAuthenticated 있으면 렌더링 없으며 null 
//   return <>{isAuthenticated ? children : null}</>;
// }


import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
