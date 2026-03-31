"use client";
import React, {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;
import { auth } from "../lib/firebase";
import { fetchWithTokenAuth } from '../lib/api';
import {
  User,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
} from "firebase/auth";

type NewUserResponse = {
    accountType?: string;
    message?: string;
  };

type AuthState = {
  isLoggedIn: boolean;
  sessionLoading: boolean;
  account_type: string;
};

type UserData = {
  id: string;
  username?: string;
  name: string;
  profile_picture: string;
  email: string;
};

type AuthContextType = {
  auth_in_context: AuthState;
  userData: UserData | null;
  firebaseLoading: boolean;
  signup: (email: string, password: string, extraData?: any) => Promise<NewUserResponse>;
  login_auth: (firebaseIdToken: string) => Promise<AuthState>;
  logout_auth: () => Promise<void>;
  set_user_detail: (userId: string, data: any, type: "user" | "admin") => void;
  refresh_auth: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  refreshUser: () => Promise<boolean>;
  resendVerification: () => Promise<void>;
  firebaseUser : User | null;
};

// context storing the Authentication details that can be used later on
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode })  => {
    const [auth_in_context, setAuth] = useState<AuthState>({
        isLoggedIn: false,
        sessionLoading: true,
        account_type : ""
    });

    const [firebaseUser, setUser] = useState<User | null>(null);
    const [firebaseLoading, setFirebaseLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [userData, setUserData] = useState<UserData | null>(null);

    const refresh_auth = async () => {
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/me`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            setAuth({
            isLoggedIn: false,
            sessionLoading: false,
            account_type: "",
            });
            setUserData(null);
            return;
        }
        const data = await res.json();

        const payload = data.user;

        setAuth({
            isLoggedIn: true,
            sessionLoading: false,
            account_type: payload.accountType ?? "user",
        });
        setUserData({
            id: payload.id,
            username: payload.username,
            name: payload.name,
            profile_picture: payload.profile_picture,
            email: payload.email,
        });

        } catch (error) {
            console.error("Failed to restore auth session:", error);
            setAuth({
                isLoggedIn: false,
                sessionLoading: false,
                account_type: "",
            });
        setUserData(null);
        }
    };

    useEffect(() => {  
        // handle cookie-based backend session
        refresh_auth();
    }, []);

    useEffect(() => {
        // handle firebase identity
        const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            setFirebaseLoading(false);
        });
        return () => unsubscribe(); // cleanup
    }, []);

    const refreshUser = async () => {
        if (!auth.currentUser) return false;

        await auth.currentUser.reload();
        const refreshedUser = auth.currentUser;

        setUser(refreshedUser);

        return !!refreshedUser?.emailVerified;
    };

    const resendVerification = async () => {
        if (!auth.currentUser) {
            throw new Error("No authenticated user found.");
        }

        await sendEmailVerification(auth.currentUser, {
            url: process.env.NEXT_PUBLIC_FRONDEND_URL + "/email-verification",
            handleCodeInApp: false,
        });
    };

    const signup = async (
        email: string, 
        password: string,
        username: string 
    ) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        //console.log("userCredential: ",userCredential);

        // send user info to backend
        const data : NewUserResponse = await fetchWithTokenAuth(`${process.env.NEXT_PUBLIC_URL}/api/auth/newUser`, {
            method: "POST",
            },
            {
                "username": username,
            }
        );
        console.log("success");

        await sendEmailVerification(userCredential.user, {
            url: process.env.NEXT_PUBLIC_FRONDEND_URL + "/email-verification",
            handleCodeInApp: false,
        });
        
        setUser(userCredential.user);

        return data;
    };


    const login_auth = async (firebaseIdToken: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/sessionLogin`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                idToken: firebaseIdToken,
                }),
            });
            console.log("login auth ...");
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error );
            }

            
            console.log("data: ",data);

            setAuth({
                isLoggedIn: true,
                sessionLoading: false,
                account_type: data.accountType ?? "user",
            });

            setUserData({
                id: data.id,
                username: data.username,
                name: data.name,
                profile_picture: data.profile_picture,
                email: data.email,
            });
            return auth_in_context;
            
        } catch (error) {
            
            console.error(error);
            setAuth({
                isLoggedIn: false,
                sessionLoading: false,
                account_type: "",
            }); 
            setUserData(null);
        }
    };

    const logout_auth = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/sessionLogout`, {
                method: "POST",
                credentials: "include",
            });
            } catch (error) {
            console.error("logout_auth error:", error);
            } finally {
            setAuth({
                isLoggedIn: false,
                sessionLoading: false,
                account_type: "",
            });
            setUserData(null);
        }
    };

    const set_user_detail = (
        userId: string,
        data: any,
        type: "user" | "admin"
    ) => {      // saving user information
        let parsedData : UserData;

        if (type === "user"){
            parsedData = {
                id: userId,
                username: data["username"],
                name: data["name"],
                profile_picture: data["profile_picture"],
                email: data["email"],
            }
        }
        else if (type === "admin"){
            parsedData = {
                id: userId,
                name: data["name"],
                profile_picture: data["profile_picture"],
                email: data["email"],
            }   
        }
        if (parsedData) {
            setUserData(parsedData);
        }
    }
    
    return (
        <AuthContext.Provider 
        value={{
            auth_in_context, 
            userData, 
            searchQuery, 
            firebaseLoading,
            firebaseUser,
            signup,
            login_auth, 
            logout_auth, 
            set_user_detail, 
            setSearchQuery,
            refresh_auth,
            refreshUser,
            resendVerification,
            
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;