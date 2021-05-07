
package com.apivideoreactnativelivestream

import android.content.Context
import androidx.constraintlayout.widget.ConstraintLayout


class ReactNativeLivestreamView(context: Context): ConstraintLayout(context) {
  init {
    inflate(context, R.layout.react_native_livestream, this)
  }
}
