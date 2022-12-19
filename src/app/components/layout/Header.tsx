import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceFactory } from "../../../factories/serviceFactory";
import { IBpsMetrics } from "../../../models/websocket/IBpsMetrics";
import { IDBSizeMetric } from "../../../models/websocket/IDBSizeMetric";
import { INodeStatus } from "../../../models/websocket/INodeStatus";
import { IPublicNodeStatus } from "../../../models/websocket/IPublicNodeStatus";
import { WebSocketTopic } from "../../../models/websocket/webSocketTopic";
import { AuthService } from "../../../services/authService";
import { EventAggregator } from "../../../services/eventAggregator";
import { MetricsService } from "../../../services/metricsService";
import { FormatHelper } from "../../../utils/formatHelper";
import Breakpoint from "./Breakpoint";
import "./Header.scss";
import { HeaderProps } from "./HeaderProps";
import HealthIndicator from "./HealthIndicator";
import MicroGraph from "./MicroGraph";
import SearchInput from "./SearchInput";

/**
 * Header panel.
 * @param props The Header props.
 * @returns The node to render.
 */
function Header(props: HeaderProps) {
    const metricsService = ServiceFactory.get<MetricsService>(MetricsService.ServiceName);
    const authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);

    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(authService.isLoggedIn()));
    const [online, setOnline] = useState(false);
    const [isHealthy, setIsHealth] = useState(false);
    const [isSinced, setIsSynced] = useState(false);
    const [memorySizeFormatted, setMemorySizeFormatted] = useState("");
    const [memorySize, setMemorySize] = useState<number[]>([]);
    const [dbLedgerSizeFormatted, setDbLedgerSizeFormatted] = useState("");
    const [dbTangleSizeFormatted, setDbTangleSizeFormatted] = useState("");
    const [dbLedgerSize, setDbLedgerSize] = useState<number[]>([]);
    const [dbTangleSize, setDbTangleSize] = useState<number[]>([]);
    const [bpsValues, setBpsValues] = useState<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        EventAggregator.subscribe("auth-state", "header", (newIsLoggedIn: boolean) => {
            setIsLoggedIn(newIsLoggedIn);
        });

        EventAggregator.subscribe("online", "header", (newOnline: boolean) => {
            setOnline(newOnline);
        });

        const publicNodeStatusSubscription = metricsService.subscribe<IPublicNodeStatus>(
            WebSocketTopic.PublicNodeStatus,
            data => {
                if (data) {
                    setOnline(true);
                    setIsHealth(data.isHealthy);
                    setIsSynced(data.isSynced);
                }
            },
        );

        const nodeStatusSubscription = metricsService.subscribe<INodeStatus>(
            WebSocketTopic.NodeStatus,
            data => {
                if (data) {
                    const newMemorySizeFormatted = FormatHelper.iSize(data.memUsage, 1);

                    setMemorySizeFormatted(newMemorySizeFormatted);
                }
            },
            allData => {
                const nonNull = allData.filter(d => d !== undefined && d !== null);
                setMemorySize(nonNull.map(d => d.memUsage));
            },
        );

        const databaseSizeSubscription = metricsService.subscribe<IDBSizeMetric>(
            WebSocketTopic.DBSizeMetric,
            data => {
                if (data) {
                    const newDbLedgerSizeFormatted = FormatHelper.size(data.utxo);

                    setDbLedgerSizeFormatted(newDbLedgerSizeFormatted);

                    const newDbTangleSizeFormatted = FormatHelper.size(data.tangle);

                    setDbTangleSizeFormatted(newDbTangleSizeFormatted);
                }
            },
            allData => {
                const nonNull = allData.filter(d => d !== undefined && d !== null);

                const newDbLedgerSizeValues = nonNull.map(d => d.utxo);

                setDbLedgerSize(newDbLedgerSizeValues);

                const newDbTangleSizeValues = nonNull.map(d => d.tangle);

                setDbTangleSize(newDbTangleSizeValues);
            },
        );

        let cachedbBpsValues: number[] = [];

        const bpsMetricsSubscription = metricsService.subscribe<IBpsMetrics>(WebSocketTopic.BPSMetrics, data => {
            if (data) {
                const newBpsValues = cachedbBpsValues.slice(-40);
                newBpsValues.push(data.new);

                cachedbBpsValues = newBpsValues;
                setBpsValues(newBpsValues);
            }
        });

        return () => {
            EventAggregator.unsubscribe("auth-state", "header");
            EventAggregator.unsubscribe("online", "header");

            metricsService.unsubscribe(publicNodeStatusSubscription);
            metricsService.unsubscribe(nodeStatusSubscription);
            metricsService.unsubscribe(databaseSizeSubscription);
            metricsService.unsubscribe(bpsMetricsSubscription);
        };
    }, []);

    const bpsFormatted = bpsValues[bpsValues.length - 1].toString();

    return (
        <header className="header">
            <div className="content">
                {online && (
                    <React.Fragment>
                        {props.children}
                        <SearchInput
                            compact={true}
                            onSearch={query => navigate(`/explorer/search/${query}`)}
                            className="child child-fill"
                        />
                        <Breakpoint size="tablet" aboveBelow="above">
                            <HealthIndicator label="Health" healthy={isHealthy} className="child" />
                            <HealthIndicator label="Sync" healthy={isSinced} className="child" />
                        </Breakpoint>
                        <Breakpoint size="desktop" aboveBelow="above">
                            <MicroGraph label="BPS" value={bpsFormatted} values={bpsValues} className="child" />
                            {isLoggedIn && (
                                <React.Fragment>
                                    <MicroGraph
                                        label="Ledger db"
                                        value={dbLedgerSizeFormatted}
                                        values={dbLedgerSize}
                                        className="child"
                                    />
                                    <MicroGraph
                                        label="Tangle db"
                                        value={dbTangleSizeFormatted}
                                        values={dbTangleSize}
                                        className="child"
                                    />
                                    <MicroGraph
                                        label="Memory"
                                        value={memorySizeFormatted}
                                        values={memorySize}
                                        className="child"
                                    />
                                </React.Fragment>
                            )}
                        </Breakpoint>
                    </React.Fragment>
                )}
            </div>
        </header>
    );
}

export default Header;
