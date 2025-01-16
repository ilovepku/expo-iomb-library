import { registerWebModule, NativeModule } from 'expo';

import { ExpoIombLibraryModuleEvents } from './ExpoIombLibrary.types';

class ExpoIombLibraryModule extends NativeModule<ExpoIombLibraryModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoIombLibraryModule);
