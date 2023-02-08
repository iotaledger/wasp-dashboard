/* eslint-disable @typescript-eslint/member-ordering */
// The ##vars## will be replaced when the frontend is started in a Docker container.
export class Environment {
    public static WaspApiUrl: string = process.env.REACT_APP_WASP_API_URL ?? "##WASP_API_URL##";

    public static L1ApiUrl: string = process.env.REACT_APP_L1_API_URL ?? "##L1_API_URL##";
}
