import { useEffect } from "react";
import { StyleSheet, View, Button, Platform } from "react-native";
import ExpoIombLibrary, {
  IOMBViewEvent,
  IOMBDebugLevel,
} from "expo-iomb-library";

const isIos = Platform.OS === "ios";

const baseURL = isIos ? "<yourIosBaseURL>" : "<yourAndroidBaseURL>";

const offerIdentifier = isIos
  ? "<yourIosIdentifier>"
  : "<yourAndroidIdentifier>";

export default function App() {
  useEffect(() => {
    const initializeSessionAndLogViewEvent = async () => {
      try {
        if (isIos) {
          await ExpoIombLibrary.setDebugLogLevel(IOMBDebugLevel.TRACE);
        } else {
          await ExpoIombLibrary.setDebugModeEnabled(true);
        }

        await ExpoIombLibrary.sessionConfiguration({
          baseURL,
          offerIdentifier,
        });

        await ExpoIombLibrary.logViewEvent({
          type: IOMBViewEvent.APPEARED,
          category: "<yourCategory>",
        });
      } catch (error) {
        console.error(
          "Failed to initialize session and log view event:",
          error
        );
      }
    };

    initializeSessionAndLogViewEvent();

    // Cleanup: terminate session when component unmounts
    return () => {
      ExpoIombLibrary.terminateSession();
    };
  }, []);

  const handleRefresh = async () => {
    try {
      await ExpoIombLibrary.logViewEvent({
        type: IOMBViewEvent.REFRESHED,
        category: "<yourCategory>",
      });
    } catch (error) {
      console.error("Failed to log refresh view event:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Trigger Refresh View Event" onPress={handleRefresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
