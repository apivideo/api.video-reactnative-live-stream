package video.api.reactnative.livestream.utils

import android.content.Context
import android.content.DialogInterface
import androidx.annotation.StringRes
import androidx.appcompat.app.AlertDialog

/**
 * Show a dialog with the given title and message.
 */
fun Context.showDialog(
  @StringRes title: Int,
  @StringRes message: Int = 0,
  @StringRes
  positiveButtonText: Int = android.R.string.ok,
  @StringRes
  negativeButtonText: Int = 0,
  onPositiveButtonClick: () -> Unit = {},
  onNegativeButtonClick: () -> Unit = {}
) {
  AlertDialog.Builder(this)
    .setTitle(title)
    .setMessage(message)
    .apply {
      if (positiveButtonText != 0) {
        setPositiveButton(positiveButtonText) { dialogInterface: DialogInterface, _: Int ->
          dialogInterface.dismiss()
          onPositiveButtonClick()
        }
      }
      if (negativeButtonText != 0) {
        setNegativeButton(negativeButtonText) { dialogInterface: DialogInterface, _: Int ->
          dialogInterface.dismiss()
          onNegativeButtonClick()
        }
      }
    }
    .show()
}
