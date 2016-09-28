package com.weizhang;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.theweflex.react.WeChatPackage;
import com.avos.avoscloud.AVOSCloud;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  @Override
  public void onCreate() {
      super.onCreate();

      // 初始化参数依次为 this, AppId, AppKey
      AVOSCloud.initialize(this,"iLQyRNE5pRG1ht5TkvqIua8v-gzGzoHsz","yUTGYrkMhb5XWyrnSnH0EGVq");
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
          new WeChatPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
