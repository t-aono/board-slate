import { ReactNode, createContext, useState, useEffect, useContext } from "react";
import { connectAuthEmulator, getAuth, onAuthStateChanged } from "firebase/auth";
import type { Auth, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { app } from "@/firebase";

type AuthUser = { auth: Auth; user: User | null };

const auth = getAuth(app);
if (process.env.NEXT_PUBLIC_ENVIRONMENT_ID === "local") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}

export const AuthContext = createContext<AuthUser>({ auth, user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (!user && pathname !== "/signup") await router.push("/login");
    });
    return () => {
      authStateChanged();
    };
  }, []);

  return <AuthContext.Provider value={{ auth, user }}>{children}</AuthContext.Provider>;
};
