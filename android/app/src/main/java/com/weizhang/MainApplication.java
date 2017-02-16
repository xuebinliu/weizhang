package com.weizhang;

import android.app.Application;

import android.util.Log;
import cn.leancloud.chatkit.LCChatKit;
import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.theweflex.react.WeChatPackage;
import com.avos.avoscloud.*;
import com.weizhang.util.ChatKitUserProvider;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static final String TAG = "MainApplication";

    // LeanCloud appId、appKey
    private static final String APP_ID = "iLQyRNE5pRG1ht5TkvqIua8v-gzGzoHsz";
    private static final String APP_KEY = "yUTGYrkMhb5XWyrnSnH0EGVq";

    private static MainApplication instance;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "onCreate start");

        // 初始化云存储
        AVOSCloud.initialize(this, APP_ID, APP_KEY);
        // 初始化crash上报
        AVAnalytics.enableCrashReport(this, true);
        // 初始化聊天功能
        LCChatKit.getInstance().setProfileProvider(ChatKitUserProvider.getInstance());
        LCChatKit.getInstance().init(getApplicationContext(), APP_ID, APP_KEY);

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
