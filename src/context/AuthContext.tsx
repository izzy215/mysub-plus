// // ✅ Provider란?
// // "자식 컴포넌트들에게 데이터를 전달할 수 있는 상위 컴포넌트"
// // 쉽게 말해, 공급자 같은 역할

// // 리액트는 원래 부모 → 자식으로 props를 통해 데이터 전달하는데,
// // Provider는 어디서든 쓸 수 있는 전역 데이터를 만들고,
// // 이걸 자식 컴포넌트들이 필요할 때 가져다 쓸 수 있게 해주는 구조

'use client';

// import { createContext, useContext, useState, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';

// //
// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   const login = (email: string, password: string) => {
//     // 실제 인증이 아니라 mock 처리
//     if (email && password) {
//       setIsAuthenticated(true);
//       router.push('/dashboard');
//     }
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// // ✅ useContext란?
// // "Context에서 제공하는 전역 데이터를 가져오는 Hook"
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth는 AuthProvider 안에서만 사용해야 해요');
//   return context;
// };



import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth는 AuthProvider 안에서만 사용해야 해요');
  return context;
};
