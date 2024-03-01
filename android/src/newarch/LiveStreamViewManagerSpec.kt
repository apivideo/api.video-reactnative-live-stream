package video.api.reactnative.livestream

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.ApiVideoLiveStreamViewManagerDelegate
import com.facebook.react.viewmanagers.ApiVideoLiveStreamViewManagerInterface
import com.facebook.soloader.SoLoader

abstract class LiveStreamViewManagerSpec<T : View> : SimpleViewManager<T>(),
  ApiVideoLiveStreamViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = ApiVideoLiveStreamViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }
}
