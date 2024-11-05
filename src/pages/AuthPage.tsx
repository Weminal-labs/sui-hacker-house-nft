import { useAuthCallback } from "@mysten/enoki/react";
import { useEffect } from "react";

export const AuthPage = () => {
    const { handled } = useAuthCallback();

    useEffect(() => {
        if (handled) {
            // Get access token, perform security checks,
            // manage user session, handle errors, and so on.
            window.location.href = "/";
            console.log('handled', handled)
        }
    }, [handled]);

    return <div>Loading...</div>
}