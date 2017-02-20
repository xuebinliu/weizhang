package com.weizhang;

import android.content.Context;
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
import cn.leancloud.chatkit.utils.LCIMConversationUtils;
import com.avos.avoscloud.*;
import com.avos.avoscloud.im.v2.*;
import com.avos.avoscloud.im.v2.callback.AVIMClientCallback;
import com.avos.avoscloud.im.v2.callback.AVIMConversationCallback;
import com.avos.avoscloud.im.v2.messages.AVIMTextMessage;
import com.facebook.react.bridge.*;
import com.weizhang.util.ChatKitUserProvider;
import com.weizhang.util.Common;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by free on 16/02/2017.
 *
 * 用于react调用native代码
 */
public class ReactProxy  extends ReactContextBaseJavaModule {
    private static final String TAG = "ReactProxy";

    public ReactProxy(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ReactProxy";
    }


    /**
     * 获取对话对方的名称
     * @param conversationId
     * @param callback (conversationId, name)
     */
    @ReactMethod
    public void getConversationName(final String conversationId, final Callback callback) {
        final AVIMConversation conversation = LCChatKit.getInstance().getClient().getConversation(conversationId);
        if (null == conversation.getCreatedAt()) {
            Log.d(TAG, "fetchInfoInBackground " + conversation.getConversationId());
            conversation.fetchInfoInBackground(new AVIMConversationCallback() {
                @Override
                public void done(AVIMException e) {
                    if (e == null) {
                        getName(conversation, callback);
                    } else {
                        Log.e(TAG, "fetchInfoInBackground err" + e.getMessage());
                    }
                }
            });
        } else {
            getName(conversation, callback);
        }
    }

    /**
     * 获取对话对方的头像url
     * @param conversationId
     * @param callback (conversationId, url)
     */
    @ReactMethod
    public void getConversationAvatarUrl(final String conversationId, final Callback callback) {
        final AVIMConversation conversation = LCChatKit.getInstance().getClient().getConversation(conversationId);
        if (null == conversation.getCreatedAt()) {
            Log.d(TAG, "getConversationAvatarUrl " + conversation.getConversationId());
            conversation.fetchInfoInBackground(new AVIMConversationCallback() {
                @Override
                public void done(AVIMException e) {
                    if (e == null) {
                        getAvatarUrl(conversation, callback);
                    } else {
                        Log.e(TAG, "fetchInfoInBackground err" + e.getMessage());
                    }
                }
            });
        } else {
            getAvatarUrl(conversation, callback);
        }
    }

    /**
     * 获取历史聊天列表
     * @param userId 当前用户id
     * @param callback
     * {
     *     conversationId:
     *     lastMessage:
     *     lastMessageTime:
     *     unreadCount:
     * }
     */
    @ReactMethod
    public void getChatLocalList(final String userId, final Callback callback) {
        if (TextUtils.isEmpty(userId) || callback == null) {
            return;
        }

        Log.d(TAG, "getChatLocalList userId=" + userId);

        // 初始化历史聊天数据
        LCChatKit.getInstance().open(userId, new AVIMClientCallback() {
            @Override
            public void done(AVIMClient avimClient, AVIMException e) {
                if (e != null) {
                    Log.e(TAG, "getChatLocalList exp=" + e.getMessage());
                    if (callback != null) {
                        callback.invoke();
                    }
                } else {
                    // 以数组形式返回对话列表
                    WritableNativeArray jsArray = new WritableNativeArray();

                    List<String> convIdList = LCIMConversationItemCache.getInstance().getSortedConversationList();
                    for (String convId : convIdList) {
                        final AVIMConversation conversation = LCChatKit.getInstance().getClient().getConversation(convId);

                        // 每个对话的详细信息
                        WritableNativeMap jsMap = new WritableNativeMap();
                        jsMap.putString("conversationId", conversation.getConversationId());

                        // lastMessage
                        jsMap.putString("lastMessage", getMessageeContent(getReactApplicationContext(), conversation.getLastMessage()));

                        // lastMessageTime
                        Date date = new Date(conversation.getLastMessage().getTimestamp());
                        String lastMessageTime = new SimpleDateFormat("MM-dd HH:mm").format(date);
                        jsMap.putString("lastMessageTime", lastMessageTime);

                        // unreadCount
                        int unreadCount = LCIMConversationItemCache.getInstance().getUnreadCount(conversation.getConversationId());
                        jsMap.putInt("unreadCount", unreadCount);

                        jsArray.pushMap(jsMap);
                    }

                    if (callback != null) {
                        callback.invoke(jsArray);
                    }
                }
            }
        });
    }

    private void getName(final AVIMConversation conversation, final Callback callback) {
        LCIMConversationUtils.getConversationName(conversation, new AVCallback<String>() {
            @Override
            protected void internalDone0(String name, AVException e) {
                if (null == e) {
                    Log.d(TAG, "get name=" + name);
                    callback.invoke(conversation.getConversationId(), name);
                } else {
                    Log.e(TAG, "getName err" + e.getMessage());
                }
            }
        });
    }

    private void getAvatarUrl(final AVIMConversation conversation, final Callback callback) {
        LCIMConversationUtils.getConversationPeerIcon(conversation, new AVCallback<String>() {
            @Override
            protected void internalDone0(String url, AVException e) {
                if (null == e) {
                    Log.d(TAG, "get avatar url=" + url);
                    callback.invoke(conversation.getConversationId(), url);
                } else {
                    Log.e(TAG, "getAvatarUrl err" + e.getMessage());
                }
            }
        });
    }

    private String getMessageeContent(Context context, AVIMMessage message) {
        if (message instanceof AVIMTypedMessage) {
            AVIMReservedMessageType type = AVIMReservedMessageType.getAVIMReservedMessageType(
                    ((AVIMTypedMessage) message).getMessageType());
            switch (type) {
                case TextMessageType:
                    return ((AVIMTextMessage) message).getText();
                case ImageMessageType:
                    return context.getString(R.string.lcim_message_shorthand_image);
                case LocationMessageType:
                    return context.getString(R.string.lcim_message_shorthand_location);
                case AudioMessageType:
                    return context.getString(R.string.lcim_message_shorthand_audio);
                default:
                    return "未知";
            }
        } else {
            return message.getContent();
        }
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
     * 打开历史聊天界面
     * @param conversationId 聊天id
     */
    @ReactMethod
    public void openHistoryChat(final String conversationId) {
        if (conversationId == null) {
            Log.w(TAG, "openChat conversationId is null");
            return;
        }

        Intent intent = new Intent(getCurrentActivity(), LCIMConversationActivity.class);
        intent.putExtra(LCIMConstants.CONVERSATION_ID, conversationId);
        getCurrentActivity().startActivity(intent);
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
