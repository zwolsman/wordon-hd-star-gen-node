/**
 * Created by fhict on 21/06/16.
 */
class Utils {
    static randomString(len, extra) {
        if (extra === undefined)
            extra = '';
        if (len === undefined)
            len = 5;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + extra;
        var rngString = '';
        for (var i = 0; i < len; i++) {
            rngString += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return rngString;
    }
}

module.exports = Utils;