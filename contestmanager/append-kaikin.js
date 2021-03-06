/**
 * append-kaikin.js
 *
 * シーズンが終わるごとに実行する。
 * MySQL の kaikin テーブルに存在する待ちレコードに対して、実際にストアポイントを追加する。
 */

var async = require('async');
var mysql = require('mysql');
var exec = require('child_process').exec;

var Config = require('./config.js');

var contestRef = require('./contestref.js').ref;

var Contests, Events;


var connection = mysql.createConnection({
    host: Config.MYSQL_HOST,
    user: Config.MYSQL_USER,
    password: Config.MYSQL_PASSWORD,
    database: Config.MYSQL_DATABASE
});
connection.connect();

var connectionStore = mysql.createConnection({
    host: Config.MYSQL_STORE_HOST,
    user: Config.MYSQL_STORE_USER,
    password: Config.MYSQL_STORE_PASSWORD,
    database: Config.MYSQL_STORE_DATABASE
});
connectionStore.connect();

// MySQL lottery_log テーブルの待ちレコードを対象にして、抽選ポイント加算
var appendPoints = function() {
    // ポイント加算履歴を検索して、未加算のものを対象とする。
    connection.query('SELECT id, user_id, season, event_id, customer_type, customer_id, point FROM kaikin WHERE appended_at IS NULL', function(error, results, fields) {
        if (error) {
            console.error(error);
        } else {
            console.dir(results);

            // ユーザごと
            var Ready = {};
            async.eachSeries(results, function(result, next) {
                if (!(result.user_id in Ready)) {
                    Ready[result.user_id] = result;
                    Ready[result.user_id]['events'] = [result.event_id];
                    Ready[result.user_id]['events_name'] = [Events[result.event_id].name];
                    Ready[result.user_id]['point_total'] = result.point;
                } else {
                    Ready[result.user_id]['events'].push(result.event_id);
                    Ready[result.user_id]['events_name'].push(Events[result.event_id].name);
                    Ready[result.user_id]['point_total'] += result.point;
                }
                next();
            }, function(err) {
                if (!err) {
                    console.dir(results);
                } else {
                    console.log(err);
                    process.exit(1);
                }
            });
            console.dir(Ready);

            connectionStore.query('SET NAMES utf8', function() {

                var count = 0;
                async.eachSeries(Ready, function(r, next) {
                    // ポイント加算処理・メール送信
                    if (r.customer_type == 0) { // store
                        connectionStore.query('SELECT name01, name02, email FROM dtb_customer WHERE customer_id = ?', [
                            r.customer_id
                        ], function(error, results, fields) {
                            if (error) {
                                console.error(error);
                                console.error('Failed getting email address!');
                                process.exit(1);
                            } else {
                                // ポイント加算顧客情報
                                var name = results[0].name01 + ' ' + results[0].name02;
                                var email = results[0].email;

                                var point_with_upper_limit = r.point_total;
                                if (2000 < point_with_upper_limit) {
                                    point_with_upper_limit = 2000;
                                }

                                console.log('UPDATE (id = ' + r.id + ')');
                                connectionStore.query('UPDATE dtb_customer SET point = point + ? WHERE customer_id = ?', [
                                    point_with_upper_limit, r.customer_id
                                ], function(error, results, fields) {
                                    if (error) {
                                        console.error(error);
                                        console.error('Failed updating point!');
                                        process.exit(1);
                                    } else {
                                        console.log('Succeeded updating point!');
                                        connection.query('UPDATE kaikin SET appended_at = NOW() WHERE appended_at IS NULL AND user_id = ?', [
                                            r.user_id
                                        ], function(error, results, fields) {
                                            if (error) {
                                                console.error(error);
                                                process.exit(1);
                                            } else {
                                                count++;

                                                if (point_with_upper_limit == 2000) {
                                                    point_with_upper_limit = '2000（上限）';
                                                }

                                                // メール送信
                                                console.log(name);
                                                console.log(email);
                                                console.log(r.season);
                                                console.log(r.events_name.join('+'));
                                                console.log(r.point_total);
                                                console.log(point_with_upper_limit);
                                                var command = '/usr/bin/php ' + __dirname + '/send-kaikin.php'
                                                            + ' "' + email + '"'
                                                            + ' "' + name + '"'
                                                            + ' "' + r.season + '"'
                                                            + ' "' + r.events_name.join('+') + '"'
                                                            + ' ' + point_with_upper_limit;
                                                exec(command, function(err, stdout, stderr) {
                                                    if (err) {
                                                        console.error(err);
                                                    } else {
                                                        //console.log(stdout);
                                                        console.error(stderr);
                                                        setTimeout(function() {
                                                            next();
                                                        }, 1000);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        // triboxstickers
                        console.error('Not implemented yet! (triboxstickers)');
                        process.exit(1);
                    }
                }, function(err) {
                    if (!err) {
                        console.log('Completed! (' + count + ' records)');
                        process.exit(0);
                    } else {
                        console.error(err);
                    }
                });
            });
        }
    });
};

var getEventsInfo = function() {
    contestRef.child('events').once('value', function(snapEvents) {
        Events = snapEvents.val();

        appendPoints();
    });
};

var main = function() {
    getEventsInfo();
};
main();
