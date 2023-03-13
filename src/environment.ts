/* eslint-disable @typescript-eslint/member-ordering */
// The ##vars## will be replaced when the frontend is started in a Docker container.
import { DOCKER_WASP_API_URL, DOCKER_L1_API_URL } from "./lib/constants";
export class Environment {
    public static WaspApiUrl: string = import.meta.env.VITE_REACT_APP_WASP_API_URL ?? DOCKER_WASP_API_URL;

    public static L1ApiUrl: string = import.meta.env.VITE_REACT_APP_L1_API_URL ?? DOCKER_L1_API_URL;

    public static ExplorerUrl: string = import.meta.env.VITE_EXPLORER_URL ?? null;
}
