App({
    onLaunch: function() {
        var t = this, n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n), this.globalData.sysinfo = wx.getSystemInfoSync(), 
        wx.login({
            success: function(t) {
                console.log(t);
            }
        }), wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(n) {
                        t.globalData.userInfo = n.userInfo, t.userInfoReadyCallback && t.userInfoReadyCallback(n);
                    }
                });
            }
        });
    },
    getModel: function() {
        return this.globalData.sysinfo.model;
    },
    getVersion: function() {
        return this.globalData.sysinfo.version;
    },
    getSystem: function() {
        return this.globalData.sysinfo.system;
    },
    getPlatform: function() {
        return this.globalData.sysinfo.platform;
    },
    getSDKVersion: function() {
        return this.globalData.sysinfo.SDKVersion;
    },
    globalData: {
        userInfo: null,
        sysinfo: ""
    }
});