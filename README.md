# Expo IOMB Library

A React Native wrapper for native IOMb SDKs, providing seamless integration with the IOMb(Census measurement system) analytics and tracking functionality in your Expo/React Native applications.

## Requirements

- iOS: `minSdkVersion 15.1`
- Android: `minSdkVersion 21`

## Features

- 📊 Session configuration and management
- 📱 View event tracking
- 🔍 Debug level control

## Installation

### In Managed Expo Projects

```bash
npx expo install expo-iomb-library expo-build-properties
```

### Configuration

#### iOS and Android Setup

Add the following to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "extraMavenRepos": [
              "https://repo.infonline.de/api/v4/projects/5/packages/maven"
            ]
          },
          "ios": {
            "extraPods": [
              {
                "name": "IOMbLibrary",
                "git": "https://repo.infonline.de/iom/base/sensors/app/ios.git"
              }
            ]
          }
        }
      ]
    ]
  }
}
```

## Usage

### Initialize Session

```typescript
import ExpoIombLibrary from "expo-iomb-library";
import { Platform } from "react-native";

const isIos = Platform.OS === "ios";

const baseURL = isIos ? "<yourIosBaseURL>" : "<yourAndroidBaseURL>";

const offerIdentifier = isIos
  ? "<yourIosIdentifier>"
  : "<yourAndroidIdentifier>";

// Configure and start session
await ExpoIombLibrary.sessionConfiguration({
  baseURL,
  offerIdentifier,
});
```

### Track View Events

```typescript
import { IOMBViewEvent } from "expo-iomb-library";

await ExpoIombLibrary.logViewEvent({
  type: IOMBViewEvent.APPEARED,
  category: "your-category",
  comment: "your-optional-comment",
});
```

### Set Debug Level

```typescript
import { IOMBDebugLevel } from "expo-iomb-library";
import { Platform } from "react-native";

if (Platform.OS === "ios") {
  await ExpoIombLibrary.setDebugLogLevel(IOMBDebugLevel.TRACE);
} else {
  await ExpoIombLibrary.setDebugModeEnabled(true);
}
```

### Cleanup

```typescript
await ExpoIombLibrary.terminateSession();
```

## API Reference

### Session Configuration

- `sessionConfiguration(payload: SessionConfigPayload)`: Initializes the IOMB session
  - `payload.baseURL`: Base URL for the API
  - `payload.offerIdentifier`: Identifier for the offer
  - `payload.hybridIdentifier`: Optional hybrid identifier

### Session Cleanup

- `terminateSession()`: Terminates the current IOMB session and cleans up resources

### Log View Event

- `logViewEvent(payload: LogViewEventPayload)`: Logs view-related events
  - `payload.type`: One of `IOMBViewEvent.APPEARED`, `REFRESHED`, or `DISAPPEARED`
  - `payload.category`: Category of the view
  - `payload.comment`: Optional comment

### Set Debug Log Level (iOS)

- `setDebugLogLevel(level: IOMBDebugLevel)`: Sets debug logging level
  - `level`: One of `OFF`, `ERROR`, `WARNING`, `INFO`, `TRACE`

### Set Debug Mode (Android)

- `setDebugModeEnabled(enable: boolean)`: Sets debug mode
  - `enable`: boolean value to enable or disable debug mode

## Types

```typescript
enum IOMBViewEvent {
  APPEARED = "appeared",
  REFRESHED = "refreshed",
  DISAPPEARED = "disappeared",
}

enum IOMBDebugLevel {
  OFF = "off",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  TRACE = "trace",
}

interface SessionConfigPayload {
  baseURL: string;
  offerIdentifier: string;
  hybridIdentifier?: string;
}

interface LogViewEventPayload {
  type: IOMBViewEvent;
  category: string;
  comment?: string;
}
```

## Example

Check out the [example](./example) directory for a complete working demo of all features.

## Documentation References

For more detailed information about the native SDKs, refer to the official documentation:

- [iOS Documentation](https://docs.infonline.de/infonline-measurement/en/integration/lib/iOS/IOMbLib_iOS_Interface_API/)
- [Android Documentation](https://docs.infonline.de/infonline-measurement/integration/lib/android/IOMbLib_Android_Interface_API/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
