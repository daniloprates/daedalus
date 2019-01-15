// @flow
import type {
  BugReportRequestHttpOptions,
  BugReportRequestPayload
} from '../types/report-request.types';
import type { GeneratePaperWalletParams } from '../types/paper-wallet-request.types';
import type {
  CardanoNodeState, CardanoStatus,
  FaultInjectionIpcRequest,
  TlsConfig
} from '../types/cardano-node.types';

/**
 * ======================= IPC CHANNELS API =========================
 * This is the ipc-api contract between main and renderer process
 * which defines channel names and their possible message types.
 * Complex types are referenced from common/types to keep this api readable.
 * ==================================================================
 */

/**
 * Channel for loading a base64 encoded asset from within the `source/renderer` folder
 */
export const LOAD_ASSET_CHANNEL = 'LoadAssetChannel';
export type LoadAssetRendererRequest = { fileName: string };
export type LoadAssetMainResponse = string;
/**
 * Channel for opening an external url in the default browser
 */
export const OPEN_EXTERNAL_URL_CHANNEL = 'OPEN_EXTERNAL_URL_CHANNEL';
export type OpenExternalUrlRequest = string;
export type OpenExternalUrlResponse = void;

/**
 * Channel to send bug report requests
 */
export const SUBMIT_BUG_REPORT_REQUEST_CHANNEL = 'SUBMIT_BUG_REPORT_REQUEST_CHANNEL';
export type SubmitBugReportRequest = {
  httpOptions: BugReportRequestHttpOptions,
  requestPayload?: BugReportRequestPayload
}
export type SubmitBugReportRequestResponse = void;

/**
 * Channel to generate and save a paper wallet certificate
 */
export const GENERATE_PAPER_WALLET_CHANNEL = 'GENERATE_PAPER_WALLET_CHANNEL';
export type GeneratePaperWalletRequest = GeneratePaperWalletParams;
export type GeneratePaperWalletResponse = void;

export const GO_TO_ADA_REDEMPTION_SCREEN_CHANNEL = 'GO_TO_ADA_REDEMPTION_SCREEN_CHANNEL';
export const GO_TO_NETWORK_STATUS_SCREEN_CHANNEL = 'GO_TO_NETWORK_STATUS_SCREEN_CHANNEL';

export const OPEN_ABOUT_DIALOG_CHANNEL = 'OPEN_ABOUT_DIALOG_CHANNEL';

/**
 * ====================== CARDANO IPC CHANNELS ======================
 * This is the ipc-api contract between main & renderer process
 * to communicate with the cardano-node manager code.
 * ==================================================================
 */

/**
 * Channel to indicate that cardano-node will exit for updating
 */
export const CARDANO_AWAIT_UPDATE_CHANNEL = 'CARDANO_AWAIT_UPDATE_CHANNEL';
export type CardanoAwaitUpdateRequest = void;
export type CardanoAwaitUpdateResponse = void;

/**
 * Channel where main process tells the renderer about cardano-node state updates
 */
export const CARDANO_STATE_CHANNEL = 'CARDANO_STATE_CHANNEL';
export type CardanoStateRequest = void;
export type CardanoStateResponse = CardanoNodeState;

/**
 * Channel to exchange tls config between main and renderer process
 */
export const CARDANO_TLS_CONFIG_CHANNEL = 'CARDANO_TLS_CONFIG_CHANNEL';
export type CardanoTlsConfigRequest = void;
export type CardanoTlsConfigResponse = ?TlsConfig;

/**
 * Channel where renderer can request a cardano-node restart
 */
export const CARDANO_RESTART_CHANNEL = 'CARDANO_RESTART_CHANNEL';
export type CardanoRestartRequest = void;
export type CardanoRestartResponse = void;

/**
 * Channel where render process can toggle cardano-node fault injections
 */
export const CARDANO_FAULT_INJECTION_CHANNEL = 'CARDANO_FAULT_INJECTION_CHANNEL';
export type CardanoFaultInjectionRequest = FaultInjectionIpcRequest;
export type CardanoFaultInjectionResponse = void;

/**
 * Channel where renderer can ask for the last cached cardano-node status.
 */
export const GET_CACHED_CARDANO_STATUS_CHANNEL = 'GET_CACHED_CARDANO_STATUS_CHANNEL';
export type GetCachedCardanoStatusRequest = void;
export type GetCachedCardanoStatusResponse = ?CardanoStatus;

/**
 * Channel where renderer and main process can exchange cardano-node status info.
 */
export const SET_CACHED_CARDANO_STATUS_CHANNEL = 'SET_CACHED_CARDANO_STATUS_CHANNEL';
export type SetCachedCardanoStatusRequest = ?CardanoStatus;
export type SetCachedCardanoStatusResponse = void;
