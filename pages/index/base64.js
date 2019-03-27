!function() {
    var r = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ], t = function(r) {
        for (var t = new Array(); r > 0; ) {
            var n = r % 2;
            r = Math.floor(r / 2), t.push(n);
        }
        return t.reverse(), t;
    }, n = function(r) {
        for (var t = 0, n = 0, o = r.length - 1; o >= 0; --o) 1 == r[o] && (t += Math.pow(2, n)), 
        ++n;
        return t;
    }, o = function(r, t) {
        for (var n = 8 - (r + 1) + 6 * (r - 1) - t.length; --n >= 0; ) t.unshift(0);
        for (var o = [], a = r; --a >= 0; ) o.push(1);
        o.push(0);
        for (var c = 0, e = 8 - (r + 1); c < e; ++c) o.push(t[c]);
        for (var f = 0; f < r - 1; ++f) {
            o.push(1), o.push(0);
            for (var h = 6; --h >= 0; ) o.push(t[c++]);
        }
        return o;
    }, a = {
        encoder: function(a) {
            for (var c = [], e = [], f = 0, h = a.length; f < h; ++f) {
                var s = a.charCodeAt(f), u = t(s);
                if (s < 128) {
                    for (var v = 8 - u.length; --v >= 0; ) u.unshift(0);
                    e = e.concat(u);
                } else s >= 128 && s <= 2047 ? e = e.concat(o(2, u)) : s >= 2048 && s <= 65535 ? e = e.concat(o(3, u)) : s >= 65536 && s <= 2097151 ? e = e.concat(o(4, u)) : s >= 2097152 && s <= 67108863 ? e = e.concat(o(5, u)) : s >= 4e6 && s <= 2147483647 && (e = e.concat(o(6, u)));
            }
            for (var i = 0, f = 0, h = e.length; f < h; f += 6) {
                var l = f + 6 - h;
                2 == l ? i = 2 : 4 == l && (i = 4);
                for (var g = i; --g >= 0; ) e.push(0);
                c.push(n(e.slice(f, f + 6)));
            }
            for (var p = "", f = 0, h = c.length; f < h; ++f) p += r[c[f]];
            for (var f = 0, h = i / 2; f < h; ++f) p += "=";
            return p;
        },
        decoder: function(o) {
            var a = o.length, c = 0;
            "=" == o.charAt(a - 1) && ("=" == o.charAt(a - 2) ? (c = 4, o = o.substring(0, a - 2)) : (c = 2, 
            o = o.substring(0, a - 1)));
            for (var e = [], f = 0, h = o.length; f < h; ++f) for (var s = o.charAt(f), u = 0, v = r.length; u < v; ++u) if (s == r[u]) {
                var i = t(u), l = i.length;
                if (6 - l > 0) for (var g = 6 - l; g > 0; --g) i.unshift(0);
                e = e.concat(i);
                break;
            }
            c > 0 && (e = e.slice(0, e.length - c));
            for (var p = [], A = [], f = 0, h = e.length; f < h; ) if (0 == e[f]) p = p.concat(n(e.slice(f, f + 8))), 
            f += 8; else {
                for (var d = 0; f < h && 1 == e[f]; ) ++d, ++f;
                for (A = A.concat(e.slice(f + 1, f + 8 - d)), f += 8 - d; d > 1; ) A = A.concat(e.slice(f + 2, f + 8)), 
                f += 8, --d;
                p = p.concat(n(A)), A = [];
            }
            return p;
        }
    };
    module.exports = {
        CusBASE64: a
    };
}();