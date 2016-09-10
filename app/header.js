/**
 * Created by free on 9/7/16.
 */


// pages
import Register from './pages/me/Register';
import Login from './pages/me/Login';
import Feedback from './pages/me/Feedback';
import Location from './pages/Location';
import Publish from './pages/Publish';
import Profile from './pages/me/Profile';

// module
import UserProfile from './module/UserProfile';

// utils
import gstyles from './gstyles';
import DeviceStorage from './utils/Storage';
import {toastShort, toastLong} from './utils/ToastUtil';
import {naviGoBack, getCityList, getCurrentCity} from './utils/common';

// widget
import LoadingView from './widget/LoadingView';
import NavigationBar from './widget/TabNavigator';




export {
    Register,
    Login,
    Feedback,
    Location,
    Publish,
    Profile,

    UserProfile,

    gstyles,
    DeviceStorage,
    toastShort,
    toastLong,
    LoadingView,
    NavigationBar,
    naviGoBack,
    getCityList,
    getCurrentCity,
}