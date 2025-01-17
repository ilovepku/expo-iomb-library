# Expo IOMB Library

A React Native wrapper for native IOMb SDKs, providing seamless integration with the IOMb analytics and tracking functionality in your Expo/React Native applications.

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

Add the following to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "extraPods": [
              {
                "name": "IOMbLibrary",
                "git": "https://<username>:<password>@repo.infonline.de/iom/base/sensors/app/ios.git"
              }
            ]
          }
        }
      ]
    ]
  }
}
```

Replace `<username>` and `<password>` with your IOMb repository credentials.

## Usage

### Initialize Session

```typescript
import ExpoIombLibrary from "expo-iomb-library";

// Configure and start session
await ExpoIombLibrary.sessionConfiguration({
  baseURL: "https://your-api-base-url.com",
  offerIdentifier: "your-offer-id",
});
```

### Track View Events

```typescript
import { IOMBViewEvent } from "expo-iomb-library";

await ExpoIombLibrary.logViewEvent({
  type: IOMBViewEvent.APPEARED,
  category: "Home",
  comment: "Optional comment",
});
```

### Set Debug Level (iOS Specific)

```typescript
import { IOMBDebugLevel } from "expo-iomb-library";

if (Platform.OS === "ios") {
  await ExpoIombLibrary.setDebugLogLevel(IOMBDebugLevel.TRACE);
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
  - Levels: `OFF`, `ERROR`, `WARNING`, `INFO`, `TRACE`

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
