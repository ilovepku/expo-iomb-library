import { NativeModule, requireNativeModule } from "expo";

import {
  IOMBDebugLevel,
  SessionConfigPayload,
  LogViewEventPayload,
} from "./ExpoIombLibrary.types";

declare class ExpoIombLibraryModule extends NativeModule {
  sessionConfiguration(payload: SessionConfigPayload): Promise<void>;
  terminateSession(): Promise<void>;
  logViewEvent(payload: LogViewEventPayload): Promise<void>;
  // iOS specific
  setDebugLogLevel(level: IOMBDebugLevel): Promise<void>;
  // Android specific
  setDebugModeEnabled(enable: boolean): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoIombLibraryModule>("ExpoIombLibrary");
