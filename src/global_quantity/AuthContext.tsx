"use client";
import React, {createContext, useState, useEffect} from "react";
import placeholder from "../assets/images/placeholder.jpg" ;

type AuthState = {
  isLoggedIn: boolean;
  loading: boolean;
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
  login_auth: (firebaseIdToken: string) => Promise<void>;
  logout_auth: () => Promise<void>;
  set_user_detail: (userId: string, data: any, type: "user" | "admin") => void;
  refresh_auth: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

// context storing the Authentication details that can be used later on
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode })  => {
    const [auth_in_context, setAuth] = useState<AuthState>({
        isLoggedIn: false,
        loading: true,
        account_type : ""
    });

    const [userData, setUserData] = useState<UserData>({  // storing the data of the logged in user
        id: "",
        username: "",
        name: "",
        profile_picture: "",
        email: "",
        // organisation
        // event_created
    })

    const [searchQuery, setSearchQuery] = useState("");


    const refresh_auth = async () => {
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/me`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            setAuth({
            isLoggedIn: false,
            loading: false,
            account_type: "",
            });
            setUserData(null);
            return;
        }

        const data = await res.json();

        setAuth({
            isLoggedIn: true,
            loading: false,
            account_type: data.accountType ?? "user",
        });

        setUserData({
            id: data.id,
            username: data.username,
            name: data.name,
            profile_picture: data.profile_picture,
            email: data.email,
        });
        } catch (error) {
        console.error("Failed to restore auth session:", error);
        setAuth({
            isLoggedIn: false,
            loading: false,
            account_type: "",
        });
        setUserData(null);
        }
    };

    useEffect(() => {  // handle side effect of stored information by browser to ensure user won't log off when refreshing their screen
        refresh_auth();
    }, []);


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

            if (!res.ok) {
                throw new Error("Failed to create session");
            }

            await refresh_auth();
            } catch (error) {
            console.error("login_auth error:", error);
            setAuth({
                isLoggedIn: false,
                loading: false,
                account_type: "",
            }); 
            setUserData(null);
        }
    };

    const logout_auth = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sessionLogout`, {
                method: "POST",
                credentials: "include",
            });
            } catch (error) {
            console.error("logout_auth error:", error);
            } finally {
            setAuth({
                isLoggedIn: false,
                loading: false,
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
                email: data["email_address"],
            }
        }
        else if (type === "admin"){
            parsedData = {
                id: userId,
                name: data["name"],
                profile_picture: data["profile_picture"],
                email: data["email_address"],
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
            login_auth, 
            logout_auth, 
            set_user_detail, 
            searchQuery, 
            setSearchQuery,
            refresh_auth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;