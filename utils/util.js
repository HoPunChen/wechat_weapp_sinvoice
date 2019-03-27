var r = function(r) {
    return (r = r.toString())[1] ? r : "0" + r;
};

module.exports = {
    formatTime: function(t) {
        var e = t.getFullYear(), o = t.getMonth() + 1, n = t.getDate(), a = t.getHours(), c = t.getMinutes(), d = t.getSeconds();
        return [ e, o, n ].map(r).join("/") + " " + [ a, c, d ].map(r).join(":");
    },
    Base64: function() {
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", this.encode = function(r) {
            var t, e, o, n, a, c, d, h = "", i = 0;
            for (r = _utf8_encode(r); i < r.length; ) n = (t = r.charCodeAt(i++)) >> 2, a = (3 & t) << 4 | (e = r.charCodeAt(i++)) >> 4, 
            c = (15 & e) << 2 | (o = r.charCodeAt(i++)) >> 6, d = 63 & o, isNaN(e) ? c = d = 64 : isNaN(o) && (d = 64), 
            h = h + _keyStr.charAt(n) + _keyStr.charAt(a) + _keyStr.charAt(c) + _keyStr.charAt(d);
            return h;
        }, this.decode = function(r) {
            var t, e, o, n, a, c, d = "", h = 0;
            for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < r.length; ) t = _keyStr.indexOf(r.charAt(h++)) << 2 | (n = _keyStr.indexOf(r.charAt(h++))) >> 4, 
            e = (15 & n) << 4 | (a = _keyStr.indexOf(r.charAt(h++))) >> 2, o = (3 & a) << 6 | (c = _keyStr.indexOf(r.charAt(h++))), 
            d += String.fromCharCode(t), 64 != a && (d += String.fromCharCode(e)), 64 != c && (d += String.fromCharCode(o));
            return d = _utf8_decode(d);
        }, _utf8_encode = function(r) {
            r = r.replace(/\r\n/g, "\n");
            for (var t = "", e = 0; e < r.length; e++) {
                var o = r.charCodeAt(e);
                o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), 
                t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), 
                t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
            }
            return t;
        }, _utf8_decode = function(r) {
            for (var t = "", e = 0, o = c1 = c2 = 0; e < r.length; ) (o = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(o), 
            e++) : o > 191 && o < 224 ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), 
            e += 2) : (c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), 
            e += 3);
            return t;
        };
    }
};