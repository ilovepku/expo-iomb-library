import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoIombLibraryViewProps } from './ExpoIombLibrary.types';

const NativeView: React.ComponentType<ExpoIombLibraryViewProps> =
  requireNativeView('ExpoIombLibrary');

export default function ExpoIombLibraryView(props: ExpoIombLibraryViewProps) {
  return <NativeView {...props} />;
}
