package com.weizhang;

import android.content.Intent;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;
import cn.leancloud.chatkit.LCChatKit;
import cn.leancloud.chatkit.LCChatKitUser;
import cn.leancloud.chatkit.activity.LCIMConversationActivity;
import cn.leancloud.chatkit.cache.LCIMConversationItemCache;
import cn.leancloud.chatkit.utils.LCIMConstants;
import com.avos.avoscloud.*;
import com.avos.avoscloud.im.v2.AVIMClient;
import com.avos.avoscloud.im.v2.AVIMConversation;
import com.avos.avoscloud.im.v2.AVIMException;
import com.avos.avoscloud.im.v2.callback.AVIMClientCallback;
import com.facebook.react.bridge.*;
import com.weizhang.util.ChatKitUserProvider;
import com.weizhang.util.Common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

/**
 * Created by free on 16/02/2017.
 *
 * 用于react调用native代码
 */
public class ReactProxy  extends ReactContextBaseJavaModule {
    private static final String TAG = "ReactProxy";

    private ReactApplicationContext context;


    public ReactProxy(ReactApplicationContext reactContext){
        super(reactContext);

        context = reactContext;
    }

    @Override
    public String getName() {
        return "ReactProxy";
    }

    @ReactMethod
    public void getChatLocalList(final String userId, final Callback callback) {

        Log.d(TAG, "getChatLocalList");

        LCChatKit.getInstance().open(userId, new AVIMClientCallback() {
            @Override
            public void done(AVIMClient avimClient, AVIMException e) {
                if (e != null) {
                    Log.e(TAG, "getChatLocalList exp=" + e.getMessage());
                    if (callback != null) {
                        callback.invoke();
                    }
                } else {
                    WritableNativeArray jsArray = new WritableNativeArray();

                    List<String> convIdList = LCIMConversationItemCache.getInstance().getSortedConversationList();
                    for (String convId : convIdList) {
                        AVIMConversation conversation = LCChatKit.getInstance().getClient().getConversation(convId);

                        WritableNativeMap jsMap = new WritableNativeMap();
                        jsMap.putString("userId", conversation.getConversationId());
                        jsMap.putString("lastMessage", conversation.getLastMessage().getContent());
                        jsMap.putInt("lastMessageAt", (int)conversation.getLastMessageAt().getTime());

                        jsArray.pushMap(jsMap);
                    }

                    if (callback != null) {
                        callback.invoke(jsArray);
                    }
                }
            }
        });
    }

    /**
     * 打开聊天界面，用户信息定义如下：
     * {
     *     userId,
     *     avatar_url,
     *     name
     * }
     * @param currUser 当前用户的信息
     * @param peerUser 聊天对象的信息
     */
    @ReactMethod
    public void openChat(final ReadableMap currUser, final ReadableMap peerUser) {
        if (currUser == null || peerUser == null) {
            Log.w(TAG, "openChat user is null");
            return;
        }

        // 加入用户信息缓存
        ChatKitUserProvider.getInstance().addUserInfo(currUser);
        ChatKitUserProvider.getInstance().addUserInfo(peerUser);

        LCChatKit.getInstance().open(currUser.getString("userId"), new AVIMClientCallback() {
            @Override
            public void done(AVIMClient avimClient, AVIMException e) {
                if (null == e) {
                    Intent intent = new Intent(getCurrentActivity(), LCIMConversationActivity.class);
                    intent.putExtra(LCIMConstants.PEER_ID, peerUser.getString("userId"));
                    getCurrentActivity().startActivity(intent);
                } else {
                    Toast.makeText(getCurrentActivity(), e.toString(), Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    /**
     * react调用native进行文件上传
     * @param uri 文件的uri
     * @param callback 上传成功失败的回调接口
     */
    @ReactMethod
    public void upload(final String uri, final Callback callback) {
        try {
            String path = Common.getRealFilePath(MainApplication.getInstance(), Uri.parse(uri));
            Log.d("FileUpload", "path=" + path + ", name=" + Common.getFileNameFromPath(path));

            final AVFile file = AVFile.withAbsoluteLocalPath(Common.getFileNameFromPath(path), path);

            file.saveInBackground(new SaveCallback() {
                @Override
                public void done(AVException e) {
                    // 成功或失败处理...
                    if(e == null) {
                        // 成功
                        String thumbUrl = file.getThumbnailUrl(true, 300, 300);

                        callback.invoke(true, file.getUrl(), thumbUrl);
                    } else {
                        // 失败
                        callback.invoke(false, "");
                    }
                }
            }, new ProgressCallback() {
                @Override
                public void done(Integer integer) {
                    // 上传进度数据，integer 介于 0 和 100
                }
            });

        } catch (Exception e) {
            // 失败
            callback.invoke(false, "");
        }
    }
}
