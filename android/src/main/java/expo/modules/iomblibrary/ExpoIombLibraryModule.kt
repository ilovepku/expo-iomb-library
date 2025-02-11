package expo.modules.iomblibrary

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.records.Field

import de.infonline.lib.iomb.IOLViewEvent
import de.infonline.lib.iomb.IOMB
import de.infonline.lib.iomb.measurements.Measurement
import de.infonline.lib.iomb.measurements.iomb.IOMBSetup
import de.infonline.lib.iomb.IOLDebug

class SessionConfigurationPayload : Record {
  @Field
  val baseURL: String = ""
  @Field
  val offerIdentifier: String = ""
  @Field
  val hybridIdentifier: String? = null
}

class LogViewEventPayload : Record {
  @Field
  val type: String = ""
  @Field
  val category: String = ""
  @Field
  val comment: String? = null
}

class ExpoIombLibraryModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoIombLibrary")

    AsyncFunction("sessionConfiguration") { payload: SessionConfigurationPayload ->
      val setup = IOMBSetup(
      offerIdentifier = payload.offerIdentifier,
      baseUrl = payload.baseURL,
      hybridIdentifier = payload.hybridIdentifier)

      IOMB_SESSION = IOMB.createBlocking(setup)
    }

    AsyncFunction("terminateSession") {
      IOMB.delete(Measurement.Type.IOMB)
    }

    AsyncFunction("logViewEvent") { payload: LogViewEventPayload ->
      val enumType = IOLViewEvent.IOLViewEventType.valueOf(uppercase(payload.type))
      val event = IOLViewEvent(type = enumType, category = payload.category, comment = payload.comment)
      IOMB_SESSION.logEvent(event)
    }

    AsyncFunction("setDebugModeEnabled") { enable: Boolean ->
      IOLDebug.debugMode = enable
    }
  }

  // Helper functions
  companion object {
    lateinit var IOMB_SESSION: Measurement
  }

  private fun uppercase(value: String) : String {
    return value.replaceFirstChar { it.uppercase() }
  }
}