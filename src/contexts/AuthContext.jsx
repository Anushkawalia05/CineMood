import { useMemo, useState } from "react";
import { AuthContext } from "./auth";
import { checkAccountPassword, makeAccountPassword } from "../utils/demoAuth";
import { getData, removeData, saveData } from "../utils/storage";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getData("cinemood:demo-session", null));

  const value = useMemo(() => ({
    user,
    async signUp({ name, email, password }) {
      const normalizedEmail = email.trim().toLowerCase();
      const savedAccounts = getData("cinemood:demo-accounts", []);
      const accounts = Array.isArray(savedAccounts) ? savedAccounts : [];
      if (accounts.some((account) => account.email === normalizedEmail)) return "An account with this email already exists in this browser.";
      try {
        const { salt, passwordHash } = await makeAccountPassword(password);
        const account = { name: name.trim(), email: normalizedEmail, salt, passwordHash };
        if (!saveData("cinemood:demo-accounts", [...accounts, account])) return "This browser could not save the demo account.";
        const session = { name: account.name, email: account.email };
        if (!saveData("cinemood:demo-session", session)) return "This browser could not start the demo session.";
        setUser(session);
        return null;
      } catch (error) {
        return error.message || "Could not create this demo account.";
      }
    },
    async signIn({ email, password }) {
      const normalizedEmail = email.trim().toLowerCase();
      const savedAccounts = getData("cinemood:demo-accounts", []);
      const accounts = Array.isArray(savedAccounts) ? savedAccounts : [];
      const account = accounts.find((item) => item.email === normalizedEmail);
      if (!account) return "No demo account with this email exists in this browser.";
      try {
        if (!await checkAccountPassword(password, account.salt, account.passwordHash)) return "That password does not match this demo account.";
        const session = { name: account.name, email: account.email };
        if (!saveData("cinemood:demo-session", session)) return "This browser could not start the demo session.";
        setUser(session);
        return null;
      } catch (error) {
        return error.message || "Could not sign in.";
      }
    },
    signOut() {
      removeData("cinemood:demo-session");
      setUser(null);
    }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
