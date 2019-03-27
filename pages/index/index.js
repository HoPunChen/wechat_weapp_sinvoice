require("base64.js"), getApp();

Page({
    onReady: function(t) {
        this.audioCtx = wx.createAudioContext("myAudio");
    },
    data: {
        ssid: "",
        passwd: "",
        show: "password",
        isShow: false,
        array: ['60ms加密', '40ms非加密', '60ms未加密', '40ms蛐蛐声', "60ms 超声波", "60ms超声波合成音"],
        index:1,
        modle: ['NORMAL_ORIGIN', 'NORMAL', 'NORMAL_60', 'QUQU', 'SUPERSONIC','SUPERSONIC_MIX'],
        audioSrc: "",
        iswaveready: !1,
        imagepathdefault: "../image/logo.png",
        imagepathconfig: "../image/cfglogo.gif",
        judgeState: !1,
        random: null,
        getRandomResult: !1
    },
    onLoad: function() {
        var t = this;
        t.InitWifi(), t.setData({
            random: t.getRandom()
        });
    },
    InitWifi: function() {
        var t = this;
        wx.startWifi({
            success: function() {
                t.getWifiInfo();
            }
        });
    },
    getWifiInfo: function() {
        var t = this;
        wx.getConnectedWifi({
            success: function(a) {
                console.log(a), t.setData({
                    ssid: a.wifi.SSID
                });
            },
            fail: function(t) {
                console.log(t);
            },
            complete: function() {}
        });
    },
    ssid: function(t) {
        this.setData({
            ssid: t.detail.value
        });
    },
    passwd: function(t) {
        this.setData({
            passwd: t.detail.value
        });
    },
    switch2Change: function (t) {
        if (this.data.isShow) {   
          this.setData({
            isShow: false,
            show: "password"
          })
        } else {
          this.setData({
            isShow: true,
            show: "text"
          })
        }
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
          this.setData({
            index: e.detail.value
          })
    },
    config: function() {
        var t = this;
        t.setData({
          random: t.getRandom()
        });
        if (console.log("这是随机数", this.data.random), "" !== this.data.passwd) {
            if (1 == this.data.iswaveready) return this.setData({
                iswaveready: !1
            }), void this.audioCtx.pause();
            if (console.log(this.data.iswaveready), this.setData({
                iswaveready: !0
            }), this.data.judgeState) this.audioCtx.play(); else {
                var a = this;
                wx.request({
                   url: "https://wavemessage.api.athenamuses.cn/wavemessage/public/set.do",
                   method: "POST",
                   header: {
                     "content-type": "application/json"
                   },
                   data: {
                     openId: a.data.random,
                     deviceId: a.data.random,
                     ssid: a.data.ssid,
                     password: a.data.passwd,
                     clientId: 'test',
                     modle: a.data.modle[a.data.index]
                   }, 
                   success: function (e) {
                     console.log(e);
                     var o = e.data;
                     t.setData({
                       audioSrc: o,
                       judgeState: !1
                     }), a.audioCtx.setSrc(a.data.audioSrc),a.audioCtx.play(),console.log(a.data.audioSrc);
                   }
                 });  
                    
                   
            }
        } else wx.showModal({
            title: "提示",
            content: "wifi密码不能为空",
            success: function(t) {
                t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
            }
        });
    },
    getRandom: function() {
        for (var t = "", a = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ], e = 0; e < 18; e++) t += a[Math.floor(61 * Math.random())];
        return t;
    }
});