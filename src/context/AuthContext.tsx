import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "farmer" | "analyst" | "institution" | null;

type AuthContextValue = {
  role: UserRole;
  email: string | null;
  login: (email: string, password: string) => Exclude<UserRole, null> | null;
  logout: () => void;
};

const DEMO: Record<string, { password: string; role: Exclude<UserRole, null> }> = {
  "farmer@demo.com": { password: "demo123", role: "farmer" },
  "analyst@demo.com": { password: "demo123", role: "analyst" },
  "institution@demo.com": { password: "demo123", role: "institution" },
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => {
    const r = localStorage.getItem("dharti_role") as UserRole;
    const e = localStorage.getItem("dharti_email");
    if (r && e && (r === "farmer" || r === "analyst" || r === "institution")) {
      return r;
    }
    return null;
  });
  const [email, setEmail] = useState<string | null>(() =>
    localStorage.getItem("dharti_email")
  );

  const login = useCallback((userEmail: string, password: string) => {
    const key = userEmail.trim().toLowerCase();
    const entry = DEMO[key];
    if (!entry || entry.password !== password) return null;
    setRole(entry.role);
    setEmail(key);
    localStorage.setItem("dharti_role", entry.role);
    localStorage.setItem("dharti_email", key);
    return entry.role;
  }, []);

  const logout = useCallback(() => {
    setRole(null);
    setEmail(null);
    localStorage.removeItem("dharti_role");
    localStorage.removeItem("dharti_email");
  }, []);

  const value = useMemo(
    () => ({ role, email, login, logout }),
    [role, email, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
