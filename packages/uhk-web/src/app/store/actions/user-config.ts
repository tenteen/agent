import { Action } from '@ngrx/store';
import { type, UserConfiguration, ConfigurationReply } from 'uhk-common';
import { UserConfigurationValue } from '../../models/user-configuration-value';
import { UploadFileData } from '../../models/upload-file-data';

const PREFIX = '[user-config] ';

// tslint:disable-next-line:variable-name
export const ActionTypes = {
    LOAD_USER_CONFIG: type(PREFIX + 'Load User Config'),
    LOAD_CONFIG_FROM_DEVICE: type(PREFIX + 'Load User Config from Device'),
    LOAD_CONFIG_FROM_DEVICE_REPLY: type(PREFIX + 'Load User Config from Device reply'),
    LOAD_USER_CONFIG_SUCCESS: type(PREFIX + 'Load User Config Success'),
    SAVE_USER_CONFIG_SUCCESS: type(PREFIX + 'Save User Config Success'),
    SAVE_USER_CONFIG_IN_JSON_FILE: type(PREFIX + 'Save User Config in JSON file'),
    SAVE_USER_CONFIG_IN_BIN_FILE: type(PREFIX + 'Save User Config in binary file'),
    LOAD_RESET_USER_CONFIGURATION: type(PREFIX + 'Load reset user configuration'),
    RENAME_USER_CONFIGURATION: type(PREFIX + 'Rename user configuration'),
    SET_USER_CONFIGURATION_VALUE: type(PREFIX + 'Set user configuration value'),
    LOAD_USER_CONFIGURATION_FROM_FILE: type(PREFIX + 'Load user configuration from file'),
    APPLY_USER_CONFIGURATION_FROM_FILE: type(PREFIX + 'Apply user configuration from file')
};

export class LoadUserConfigAction implements Action {
    type = ActionTypes.LOAD_USER_CONFIG;
}

export class LoadConfigFromDeviceAction implements Action {
    type = ActionTypes.LOAD_CONFIG_FROM_DEVICE;
}

export class LoadConfigFromDeviceReplyAction implements Action {
    type = ActionTypes.LOAD_CONFIG_FROM_DEVICE_REPLY;

    constructor(public payload: ConfigurationReply) {
    }
}

export class LoadUserConfigSuccessAction implements Action {
    type = ActionTypes.LOAD_USER_CONFIG_SUCCESS;

    constructor(public payload: UserConfiguration) {
    }
}

export class SaveUserConfigSuccessAction implements Action {
    type = ActionTypes.SAVE_USER_CONFIG_SUCCESS;

    constructor(public payload: UserConfiguration) {
    }
}

export class SaveUserConfigInJsonFileAction implements Action {
    type = ActionTypes.SAVE_USER_CONFIG_IN_JSON_FILE;
}

export class SaveUserConfigInBinaryFileAction implements Action {
    type = ActionTypes.SAVE_USER_CONFIG_IN_BIN_FILE;
}

export class LoadResetUserConfigurationAction implements Action {
    type = ActionTypes.LOAD_RESET_USER_CONFIGURATION;

    constructor(public payload: UserConfiguration) {
    }
}

export class RenameUserConfigurationAction implements Action {
    type = ActionTypes.RENAME_USER_CONFIGURATION;

    constructor(public payload: string) {
    }
}

export class SetUserConfigurationValueAction implements Action {
    type = ActionTypes.SET_USER_CONFIGURATION_VALUE;

    constructor(public payload: UserConfigurationValue) {
    }
}

export class LoadUserConfigurationFromFileAction implements Action {
    type = ActionTypes.LOAD_USER_CONFIGURATION_FROM_FILE;

    constructor(public payload: UploadFileData) {
    }
}

export class ApplyUserConfigurationFromFileAction implements Action {
    type = ActionTypes.APPLY_USER_CONFIGURATION_FROM_FILE;

    constructor(public payload: UserConfiguration) {
    }
}

export type Actions
    = LoadUserConfigAction
    | LoadUserConfigSuccessAction
    | SaveUserConfigSuccessAction
    | LoadConfigFromDeviceAction
    | LoadConfigFromDeviceReplyAction
    | SaveUserConfigInJsonFileAction
    | SaveUserConfigInBinaryFileAction
    | LoadResetUserConfigurationAction
    | RenameUserConfigurationAction
    | SetUserConfigurationValueAction
    | LoadUserConfigurationFromFileAction
    | ApplyUserConfigurationFromFileAction
    ;
