/**
 * Created by Marvin on 21/06/16.
 */
var ProgressBar = require('progress');
var request = require('request');
var utils = require('./utils');

class starRequest {
    constructor(code, stars) {
        this._bar = new ProgressBar(code + ' - generating [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: stars
        });
        this._stars = stars;
        this._redeemed = 0;
        this._code = code;
    }

    start () {
        const self = this;
        request.post({
            url: 'http://game.wordonhd.com/account/guest', form: {
                locale: 'nl',
                deviceId: 'Android Linux',
                deviceToken: utils.randomString(183, '-_'),
                country: 'nl-NL',
                udId: utils.randomString(16),
                version: '1.88'
            }
        }, (err, response, body) => {
            if (err || response.statusCode != 200) {
                console.log('error');
                console.log(err);
                return;
            }
            var json = JSON.parse(body);
            self.redeem(json.user.authToken);
        });
    }

    redeem(authToken) {
        const self = this;
        request.post({
            url: 'http://game.wordonhd.com/account/redeem', form: {
                authToken: authToken,
                code: this._code
            }
        }, (err, response, body) => {
            if (err || response.statusCode != 200) {
                console.log('error');
                console.log(err);
                return;
            }
            var json = JSON.parse(body);
            if (json.result != ':)') {
                console.log('could not redeem!');
                return;
            }
            self._bar.tick(5);

            self._redeemed += 5;
            if(self._redeemed < self._stars) {
                self.start();
            }
        });
    }
}

module.exports = starRequest;