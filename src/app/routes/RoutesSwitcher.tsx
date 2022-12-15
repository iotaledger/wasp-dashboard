import React, { useEffect } from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import Configuration from "./Configuration";
import Home from "./Home";
import L1 from "./L1";
import L1Chain from "./L1Chain";
import Login from "./Login";
import Peers from "./Peers";

/**
 *
 * @param root0 The props.
 * @param root0.isLoggedIn - Whether the user is logged in.
 * @returns The node to render.
 */
function RoutesSwitcher({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, [isLoggedIn]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} key="login" />
            {isLoggedIn && (
                <React.Fragment>
                    <Route path="/" element={<Home />} key="home" />
                    <Route path="/peers" element={<Peers />} key="peers" />
                    {/* <Route

                        path="/peers/:peerId"
                        component={(props: PeerRouteProps) => <Peer {...props} />}
                        key="peer"
                    >*/}
                    {/* <Route

                        path="/chains"
                        element={(<Chains />)}
                        key="home"
                    /> */}
                    <Route path="/configuration" element={<Configuration />} key="configuration" />
                    <Route path="/l1" element={<L1 />} key="l1" />
                    <Route path="/l1/:chainId" element={<L1Chain />} key="l1-chain" />
                    {/* <Route

                        path="/users"
                        element={(<Users />)}
                        key="home"
                    /> */}
                </React.Fragment>
            )}
        </Routes>
    );
}

export default RoutesSwitcher;
