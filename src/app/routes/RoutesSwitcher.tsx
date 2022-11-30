import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Peer from "./Peer";
import { PeerRouteProps } from "./PeerRouteProps";
import Peers from "./Peers";


/**
 *
 * @param root0 The props.
 * @param root0.isLoggedIn - Whether the user is logged in.
 * @returns The node to render.
 */
function RoutesSwitcher({ isLoggedIn }: {isLoggedIn: boolean}): JSX.Element {
    return (
        <Switch>
            <Route
                exact={true}
                path="/login"
                component={() => (<Login />)}
                key="home"
            />
            {isLoggedIn ? (
                <React.Fragment>
                    <Route
                        exact={true}
                        path="/"
                        component={() => (<Home />)}
                        key="home"
                    />
                    <Route
                        exact={true}
                        path="/peers"
                        component={() => (<Peers />)}
                        key="peers"
                    />
                    <Route
                        exact={true}
                        path="/peers/:peerId"
                        component={(props: PeerRouteProps) => (<Peer {...props} />)}
                        key="peer"
                    />
                    {/* <Route
                        exact={true}
                        path="/chains"
                        component={() => (<Chains />)}
                        key="home"
                    /> */}
                    {/* <Route
                        exact={true}
                        path="/configuration"
                        component={() => (<Configuration />)}
                        key="home"
                    /> */}
                    {/* <Route
                        exact={true}
                        path="/l1"
                        component={() => (<L1 />)}
                        key="home"
                    /> */}
                    {/* <Route
                        exact={true}
                        path="/users"
                        component={() => (<Users />)}
                        key="home"
                    /> */}
                </React.Fragment>
            ) : (
                <Redirect exact={true} from="*" to="/login" />
            )}
        </Switch>
    );
}

export default RoutesSwitcher;
