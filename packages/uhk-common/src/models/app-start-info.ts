import { CommandLineArgs } from './command-line-args';

export interface AppStartInfo {
    commandLineArgs: CommandLineArgs;
    deviceConnected: boolean;
    hasPermission: boolean;
}
