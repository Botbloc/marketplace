"use client";
import React from 'react';
import {useState,useContext, useEffect} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import InputField from '../../components/elements/InputField';
import ConfirmationButton from '../../components/elements/ConfirmationButton';
import AuthContext from '../../global_quantity/AuthContext';
import { auth } from "../../lib/firebase";
import { fetchWithTokenAuth } from '../../lib/api';

const email_verfication = () => {
    const [code, setCode] = useState<string>("");
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!AuthContext) {
        return <div>Auth context unavailable.</div>;
    }

    const {refreshUser, resendVerification, login_auth, firebaseUser} = useContext(AuthContext);

    const handleResend = async () => {
        try {
            setSubmitting(true);
            setMessage("");
            await resendVerification();
            setMessage("Verification email sent again.");
        } catch (error: any) {
            setMessage(error.message || "Failed to resend verification email.");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!firebaseUser) return;
        console.log("firebaseUser: ", firebaseUser);

        const interval = setInterval(async () => {
            try {
            await auth.currentUser?.reload();

            if (auth.currentUser?.emailVerified) {
                clearInterval(interval);
                const idToken = await auth.currentUser.getIdToken(true);
                const sth = await fetchWithTokenAuth(
                    `${process.env.NEXT_PUBLIC_URL}/api/auth/verification`,
                    { method: "PATCH" }
                    );
                console.log(sth);
                await login_auth(idToken);
                router.push("/");
            }
            } catch (error) {
            console.error("Auto verification check failed:", error);
            }
        }, 3000);

    return () => clearInterval(interval);
    }, [firebaseUser, login_auth, router]);

    const handleVerified = async () => {
        try {
            setSubmitting(true);
            setMessage("");

            const verified = await refreshUser();

            if (!verified || !auth.currentUser) {
                setMessage("Your email is still not verified yet.");
                return;
            }

            const idToken = await auth.currentUser.getIdToken(true);
            await login_auth(idToken);

            router.push("/");
        } catch (error: any) {
            setMessage(error.message || "Failed to complete verification.");
        } finally {
            setSubmitting(false);
        }
    };
    return(
    <div className='email_verfication'>
        <div className='container'>
            <h4>Check your inbox</h4>
            <h6>Enter the verification code we just sent to your email</h6> 
            <ConfirmationButton
                fnc={handleVerified}
                text = "I’ve verified my email"
                disabled={submitting}
            />
            <ConfirmationButton
                fnc={handleResend}
                text = "Resend verification email"
                disabled={submitting}
            />
            <ConfirmationButton
                fnc={() => router.push("/login")}
                text = "Back to login"
                disabled={submitting}
            />
            {message && <p>{message}</p>}
        </div>
    </div>
    )
}

export default email_verfication;