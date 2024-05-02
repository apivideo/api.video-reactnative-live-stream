package video.api.reactnative.livestream.utils.permissions

import java.util.concurrent.Executors

/**
 * SerialPermissionsManager is a wrapper around PermissionsManager that serializes permission requests.
 */
class SerialPermissionsManager(
  private val permissionsManager: PermissionsManager
) {
  private val executor = Executors.newSingleThreadExecutor()
  private val permissionRequests = mutableListOf<Runnable>()

  fun hasPermission(permission: String): Boolean {
    return permissionsManager.hasPermission(permission)
  }

  private fun processNextRequest() {
    synchronized(this) {
      permissionRequests.removeAt(0)
    }

    if (permissionRequests.isNotEmpty()) {
      executor.execute(permissionRequests.first())
    }
  }

  fun requestPermissions(
    permissions: List<String>,
    onAllGranted: () -> Unit,
    onShowPermissionRationale: (List<String>, () -> Unit) -> Unit,
    onAtLeastOnePermissionDenied: (List<String>) -> Unit
  ) {
    val request = Runnable {
      permissionsManager.requestPermissions(
        permissions,
        {
          onAllGranted()
          processNextRequest()
        },
        onShowPermissionRationale,
        { permissions ->
          onAtLeastOnePermissionDenied(permissions)
          processNextRequest()
        }
      )
    }
    synchronized(this) {
      permissionRequests.add(request)
      if (permissionRequests.size == 1) {
        executor.execute(request)
      }
    }
  }

  fun requestPermission(
    permission: String,
    onGranted: () -> Unit,
    onShowPermissionRationale: (() -> Unit) -> Unit,
    onDenied: () -> Unit
  ) {
    val request = Runnable {
      permissionsManager.requestPermission(
        permission,
        {
          onGranted()
          processNextRequest()
        },
        onShowPermissionRationale,
        {
          onDenied()
          processNextRequest()
        }
      )
    }
    synchronized(this) {
      permissionRequests.add(request)
      if (permissionRequests.size == 1) {
        executor.execute(request)
      }
    }
  }
}
