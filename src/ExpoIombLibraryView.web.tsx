import * as React from 'react';

import { ExpoIombLibraryViewProps } from './ExpoIombLibrary.types';

export default function ExpoIombLibraryView(props: ExpoIombLibraryViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
