import ExpoModulesCore
import IOMbLibrary

// Define payload types for better type safety
struct SessionConfigurationPayload: Record {
  @Field var baseURL: String
  @Field var offerIdentifier: String
  @Field var hybridIdentifier: String?
}

struct LogViewEventPayload: Record {
  @Field var type: String
  @Field var category: String
  @Field var comment: String?
}

public class ExpoIombLibraryModule: Module {
  // helper functions
  private func stringToEnumValue(_ value: String, values: [String]) -> UInt {
    return UInt(values.firstIndex(where: { $0 == value }) ?? 0)
  }

  public func definition() -> ModuleDefinition {
    Name("ExpoIombLibrary")

    AsyncFunction("sessionConfiguration") { (payload: SessionConfigurationPayload) -> Void in
      guard let url = URL(string: payload.baseURL) else { return }

      let configuration = IOMBSessionConfiguration(
        offerIdentifier: payload.offerIdentifier,
        hybridIdentifier: payload.hybridIdentifier,
        baseURL: url
      )

      IOMBSession.defaultSession(for: .iomb).start(with: configuration)
    }

    AsyncFunction("terminateSession") { () -> Void in
      IOMBSession.defaultSession(for: .iomb).terminateSession()
    }

    AsyncFunction("logViewEvent") { [self] (payload: LogViewEventPayload) -> Void in
      let types = ["appeared", "refreshed", "disappeared"]
      let eventType = IOMBViewEventType(rawValue: stringToEnumValue(payload.type, values: types))!
      let event = IOMBViewEvent(type: eventType, category: payload.category, comment: payload.comment)
      IOMBSession.defaultSession(for: .iomb).logEvent(event)
    }

    AsyncFunction("setDebugLogLevel") { [self] (_ level: String) -> Void in
      let levels = ["off", "error", "warning", "info", "trace"]
      let level = IOMBDebugLevel(rawValue: Int(stringToEnumValue(level, values: levels)))!
      IOMBLogging.setDebugLogLevel(level)
    }
  }
}
