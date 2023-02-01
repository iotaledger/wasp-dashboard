import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthService, ServiceFactory } from "../../lib/classes";
import { InfoBox, Spinner } from "../components";
import "./Route.scss";

/**
 * Login panel.
 * @returns The node to render.
 */
function Login(): JSX.Element {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<string>("");

    const authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);

    React.useEffect(() => {
        setRedirect(authService.isLoggedIn() ? "/" : "");
    }, []);

    if (redirect.length > 0) {
        return <Navigate to={redirect} />;
    }

    const login = async () => {
        setIsBusy(true);
        setError(false);

        const success = await authService.login(user, password);

        setIsBusy(false);
        setError(!success);
    };

    return (
        <div className="main">
            <div className="content">
                <h2>Login</h2>
                <InfoBox title="" cardClassName="margin-t-s padding-l">
                    <form>
                        <p>Please enter your credentials to unlock the full dashboard.</p>
                        <div className="card--label">User</div>
                        <div className="card--value row">
                            <input
                                type="text"
                                autoComplete="username"
                                value={user}
                                disabled={isBusy}
                                onChange={e => setUser(e.target.value)}
                                autoFocus={true}
                            />
                        </div>
                        <div className="card--label">Password</div>
                        <div className="card--value row">
                            <input
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                disabled={isBusy}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={async e => {
                                    if (e.key === "Enter" && password.trim().length > 0 && user.trim().length > 0) {
                                        await login();
                                    }
                                }}
                            />
                        </div>
                        <hr />
                        <div className="card--value row middle">
                            <button
                                className="card--action margin-r-s"
                                type="button"
                                disabled={isBusy || user.trim().length === 0 || password.trim().length === 0}
                                onClick={async e => login()}
                            >
                                Login
                            </button>
                            {isBusy && <Spinner compact={true} />}
                            {error && <p className="danger margin-l-t">Your login attempt failed, please try again.</p>}
                        </div>
                    </form>
                </InfoBox>
            </div>
        </div>
    );
}
export default Login;
