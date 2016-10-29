package com.weizhang;

import android.app.Application;

import android.util.Log;
import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.theweflex.react.WeChatPackage;
import com.avos.avoscloud.*;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static final String TAG = "MainApplication";

    private static MainApplication instance;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "onCreate start");

        // 初始化参数依次为 this, AppId, AppKey
        AVOSCloud.initialize(this,"iLQyRNE5pRG1ht5TkvqIua8v-gzGzoHsz","yUTGYrkMhb5XWyrnSnH0EGVq");
        AVAnalytics.enableCrashReport(this, true);

        instance = this;

        Log.d(TAG, "onCreate end");
    }

    public static MainApplication getInstance(){
        return instance;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new PickerPackage(),
            new WeChatPackage(),
            new RNPackages()
        );
      }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
