import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Block from "./Block";
import Chain from "./Chain";
import Chains from "./Chains";
import Configuration from "./Configuration";
import Contract from "./Contract";
import Home from "./Home";
import L1 from "./L1";
import L1Chain from "./L1Chain";
import Login from "./Login";
import Peers from "./Peers";
import Users from "./Users";

/**
 *
 * @param root0 The props.
 * @param root0.isLoggedIn - Whether the user is logged in.
 * @returns The node to render.
 */
function RoutesSwitcher({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element {
    return (
        <Routes>
            {isLoggedIn ? (
                <React.Fragment>
                    <Route path="/" element={<Home />} key="home" />
                    <Route path="/peers" element={<Peers />} key="peers" />
                    {/* <Route

                        path="/peers/:peerId"
                        component={(props: PeerRouteProps) => <Peer {...props} />}
                        key="peer"
                    >*/}
                    <Route path="/chains/:chainID/blocks/:blockID" element={<Block />} key="block" />
                    <Route path="/chain/:chainID/contract/:contractHName" element={<Contract />} key="contract" />
                    <Route path="/chains/:chainID" element={<Chain />} key="chain" />
                    <Route path="/chains" element={<Chains />} key="chains" />
                    <Route path="/configuration" element={<Configuration />} key="configuration" />
                    <Route path="/l1" element={<L1 />} key="l1" />
                    <Route path="/l1/:chainID" element={<L1Chain />} key="l1-chain" />
                    <Route path="/users" element={<Users />} key="users" />
                    <Route path="*" element={<Navigate to="/" />} key="redirect-to-home" />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Route path="/login" element={<Login />} key="login" />
                    <Route path="*" element={<Navigate to="/login" />} key="redirect-to-login" />
                </React.Fragment>
            )}
        </Routes>
    );
}

export default RoutesSwitcher;
