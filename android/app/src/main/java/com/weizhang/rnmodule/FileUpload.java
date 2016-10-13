package com.weizhang.rnmodule;

import android.net.Uri;
import android.util.Log;
import com.avos.avoscloud.AVException;
import com.avos.avoscloud.AVFile;
import com.avos.avoscloud.ProgressCallback;
import com.avos.avoscloud.SaveCallback;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.weizhang.MainApplication;
import com.weizhang.util.Common;

import java.io.FileNotFoundException;

/**
 * Created by free on 9/29/16.
 */
public class FileUpload extends ReactContextBaseJavaModule {

    public FileUpload(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FileUpload";
    }

    @ReactMethod
    public void uploadFile(final String uri, final Callback callback) {
        try {
            String path = Common.getRealFilePath(MainApplication.getInstance(), Uri.parse(uri));
            Log.d("FileUpload", "path=" + path + ", name=" + Uri.parse(uri).getLastPathSegment());
            final AVFile file = AVFile.withAbsoluteLocalPath("LeanCloud.png", path);

            file.saveInBackground(new SaveCallback() {
                @Override
                public void done(AVException e) {
                    // 成功或失败处理...
                    Log.d(getName(), file.getUrl());//返回一个唯一的 Url 地址

                    callback.invoke("ok");
                }
            }, new ProgressCallback() {
                @Override
                public void done(Integer integer) {
                    // 上传进度数据，integer 介于 0 和 100。
                }
            });

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
