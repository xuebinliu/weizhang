package com.weizhang.util;

import android.util.Log;
import cn.leancloud.chatkit.LCChatKitUser;
import cn.leancloud.chatkit.LCChatProfileProvider;
import cn.leancloud.chatkit.LCChatProfilesCallBack;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by free on 16/02/2017.
 */
public class ChatKitUserProvider implements LCChatProfileProvider {

    private HashMap<String, LCChatKitUser> userInfoCache;

    private static ChatKitUserProvider instance;

    private ChatKitUserProvider(){
    }

    public static ChatKitUserProvider getInstance() {
        if (instance == null) {
            instance = new ChatKitUserProvider();
        }
        return instance;
    }

    public void addUserInfo(ReadableMap user) {
        if (user == null) {
            return;
        }

        if (userInfoCache == null) {
            userInfoCache = new HashMap<>();
        }

        final LCChatKitUser userInfo = new LCChatKitUser(
                user.getString("userId"),
                user.getString("name"),
                user.getString("avatar_url")
        );

        userInfoCache.put(userInfo.getUserId(), userInfo);

        Log.d("ChatKitUserProvider","addUserInfo userId=" + userInfo.getUserId()
            + ", url=" + userInfo.getAvatarUrl() + ", name=" + userInfo.getUserName());
    }

    @Override
    public void fetchProfiles(List<String> list, LCChatProfilesCallBack lcChatProfilesCallBack) {

        List<LCChatKitUser> userList = new ArrayList<>();
        for (String userId : list) {
            LCChatKitUser user = userInfoCache.get(userId);
            if (user != null) {
                userList.add(user);
            }
        }

        lcChatProfilesCallBack.done(userList, null);
    }
}
