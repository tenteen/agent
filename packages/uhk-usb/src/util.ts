import { Constants, UsbCommand } from './constants';
import { LogService } from 'uhk-common';

export const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Convert the Buffer to number[]
 * @param {Buffer} buffer
 * @returns {number[]}
 * @private
 * @static
 */
export function convertBufferToIntArray(buffer: Buffer): number[] {
    return Array.prototype.slice.call(buffer, 0);
}

/**
 * Split the communication package into 64 byte fragments
 * @param {UsbCommand} usbCommand
 * @param {Buffer} configBuffer
 * @returns {Buffer[]}
 * @private
 */
export function getTransferBuffers(usbCommand: UsbCommand, configBuffer: Buffer): Buffer[] {
    const fragments: Buffer[] = [];
    const MAX_SENDING_PAYLOAD_SIZE = Constants.MAX_PAYLOAD_SIZE - 4;
    for (let offset = 0; offset < configBuffer.length; offset += MAX_SENDING_PAYLOAD_SIZE) {
        const length = offset + MAX_SENDING_PAYLOAD_SIZE < configBuffer.length
            ? MAX_SENDING_PAYLOAD_SIZE
            : configBuffer.length - offset;
        const header = new Buffer([usbCommand, length, offset & 0xFF, offset >> 8]);
        fragments.push(Buffer.concat([header, configBuffer.slice(offset, offset + length)]));
    }

    return fragments;
}

/**
 * Create the communication package that will send over USB and
 * @param {Buffer} buffer
 * @returns {number[]}
 * @private
 * @static
 */
export function getTransferData(buffer: Buffer): number[] {
    const data = convertBufferToIntArray(buffer);
    data.unshift(0);

    return data;
}

/**
 * Convert buffer to space separated hexadecimal string
 * @param {Buffer} buffer
 * @returns {string}
 * @private
 * @static
 */
export function bufferToString(buffer: Array<number>): string {
    let str = '';
    for (let i = 0; i < buffer.length; i++) {
        let hex = buffer[i].toString(16) + ' ';
        if (hex.length <= 2) {
            hex = '0' + hex;
        }
        str += hex;
    }
    return str;
}

export async function retry(command: Function, maxTry = 3, logService?: LogService): Promise<any> {
    let retryCount = 0;

    while (true) {
        try {
            // logService.debug(`[retry] try to run FUNCTION:\n ${command}, \n retry: ${retryCount}`);
            await command();
            // logService.debug(`[retry] success FUNCTION:\n ${command}, \n retry: ${retryCount}`);
            return;
        } catch (err) {
            retryCount++;
            if (retryCount >= maxTry) {

                if (logService) {
                    // logService.error(`[retry] failed and no try rerun FUNCTION:\n ${command}, \n retry: ${retryCount}`);
                }

                throw err;
            } else {
                if (logService) {
                    logService.info(`[retry] failed, but try run FUNCTION:\n ${command}, \n retry: ${retryCount}`);
                }
                await snooze(100);
            }
        }
    }
}
