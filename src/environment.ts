/* eslint-disable @typescript-eslint/member-ordering */
export class Environment {
  public static readonly WaspApiUrl: string = process.env.REACT_APP_WASP_API_URL ?? "http://localhost:9090";

  public static readonly L1ApiUrl: string = process.env.REACT_APP_L1_API_URL ?? "http://localhost:14265";
}
