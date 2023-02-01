import { useEffect, useState } from "react";
import { AuthService, EventAggregator, ServiceFactory } from "../../lib";

/**
 * Subscribe to the current logged user permissions.
 * @returns A list of permissions.
 */
export default function usePermissions(): [boolean] {
    const authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);

    const [write, setWrite] = useState(false);

    useEffect(() => {
        const applyPermissions = () => {
            const permissions = authService.getPermissions();
            setWrite(permissions.includes("write"));
        };

        applyPermissions();

        EventAggregator.subscribe("auth-state", "usePermissions", isLoggedIn => {
            if (isLoggedIn) {
                applyPermissions();
            } else {
                setWrite(false);
            }
        });

        return () => {
            EventAggregator.unsubscribe("auth-state", "usePermissions");
        };
    }, []);

    return [write];
}
