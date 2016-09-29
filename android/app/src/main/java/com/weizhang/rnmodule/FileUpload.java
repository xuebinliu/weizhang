package com.weizhang.rnmodule;

import android.net.Uri;
import android.util.Log;
import com.avos.avoscloud.AVFile;
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
    public void uploadFile(String uri, Callback callback) {
        Log.d("FileUpload", "uri=" + uri);

        try {
            String path = Common.getRealFilePath(MainApplication.getInstance(), Uri.parse(uri));
            Log.d("FileUpload", "path=" + path + ", name=" + Uri.parse(uri).getLastPathSegment());
            AVFile file = AVFile.withAbsoluteLocalPath("LeanCloud.png", path);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        callback.invoke("ok");
    }
}
