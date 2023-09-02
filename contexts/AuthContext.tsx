import { ReactNode, createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/firebase";

export type UserType = User | null;

export const AuthContext = createContext<Partial<UserType>>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (!user) await router.push("/login");
    });
    return () => {
      authStateChanged();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
