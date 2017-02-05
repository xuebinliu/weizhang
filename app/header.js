/**
 * Created by free on 9/7/16.
 */


// pages
import Register from './pages/me/Register';
import Login from './pages/me/Login';
import Feedback from './pages/me/Feedback';
import About from './pages/me/About';
import UserInfo from './pages/me/UserInfo';
import Location from './pages/hall/Location';
import Publish from './pages/Publish';
import Profile from './pages/me/Profile';
import AlbumContainer from './pages/album/AlbumContainer';

// utils
import gstyles from './gstyles';
import DeviceStorage from './utils/Storage';
import {toastShort, toastLong} from './utils/ToastUtil';
import {naviGoBack, getCityList, getCurrentCity} from './utils/common';

// widget
import LoadingView from './widget/LoadingView';
import NavigationBar from './widget/TabNavigator';
import BusyIndicator from './widget/BusyIndicator';
import loaderHandler from './widget/LoaderHandler';

export {
    Register,
    Login,
    About,
    Feedback,
    Location,
    Publish,
    Profile,
    AlbumContainer,
    UserInfo,

    gstyles,
    DeviceStorage,
    toastShort,
    toastLong,

    LoadingView,
    NavigationBar,
    BusyIndicator,
    loaderHandler,

    naviGoBack,
    getCityList,
    getCurrentCity,
}