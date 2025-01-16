import { NativeModule, requireNativeModule } from 'expo';

import { ExpoIombLibraryModuleEvents } from './ExpoIombLibrary.types';

declare class ExpoIombLibraryModule extends NativeModule<ExpoIombLibraryModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoIombLibraryModule>('ExpoIombLibrary');
