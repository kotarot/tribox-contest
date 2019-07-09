/**
 * config.js
 */

// Firebase の設定
exports.CONTESTAPP        = 'xxxxxxxx';
exports.CONTESTAPP_SECRET = 'xxxxxxxx';
exports.TRIBOXAPP         = 'xxxxxxxx';
exports.TRIBOXAPP_SECRET  = 'xxxxxxxx';
exports.WCAAPP            = 'xxxxxxxx';
exports.WCAAPP_SECRET     = 'xxxxxxxx';

// MySQL の設定
exports.MYSQL_HOST     = 'xxxxxxxx';
exports.MYSQL_USER     = 'xxxxxxxx';
exports.MYSQL_PASSWORD = 'xxxxxxxx';
exports.MYSQL_DATABASE = 'xxxxxxxx';

// MySQL の設定 (ストア)
exports.MYSQL_STORE_HOST     = 'xxxxxxxx';
exports.MYSQL_STORE_USER     = 'xxxxxxxx';
exports.MYSQL_STORE_PASSWORD = 'xxxxxxxx';
exports.MYSQL_STORE_DATABASE = 'xxxxxxxx';

// MySQL の設定 (WCA)
exports.MYSQL_WCA_HOST     = 'xxxxxxxx';
exports.MYSQL_WCA_USER     = 'xxxxxxxx';
exports.MYSQL_WCA_PASSWORD = 'xxxxxxxx';
exports.MYSQL_WCA_DATABASE = 'xxxxxxxx';

// Twitter
exports.CONSUMER_KEY        = 'xxxxxxxx';
exports.CONSUMER_SECRET     = 'xxxxxxxx';
exports.ACCESS_TOKEN        = 'xxxxxxxx';
exports.ACCESS_TOKEN_SECRET = 'xxxxxxxx';

// スクランブル用のシード値
exports.SEED = 'xxxxxxxx';

// Sarumawashi のパス (FMC の解答チェック用)
exports.PATH_TO_SARUMAWASHI = '/path/to/Sarumawashi';

// シーズンポイント
exports.SP = {
    1: 20, 2: 15, 3: 12, 4: 10, 5: 8, 6: 7, 7: 6, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1
};
// 当選者数
exports.NUM_LOTTERY = 3;
// 各種目ごとの当選者数
exports.NUM_LOTTERY_EVENT = {
    'e333': 22,
    'e444': 12,
    'e555': 8,
    'e666': 5,
    'e777': 4,
    'e222': 12,
    'e333bf': 4,
    'e333oh': 8,
    'e333fm': 3,
    'eminx': 5,
    'epyram': 8,
    'eskewb': 5,
    'esq1': 4
};
// 抽選ポイント数
exports.LOTTERY_POINT = 100;
// 契約アカウントへ加算するポイント数
exports.TRIBOXTEAM_POINT = TODO;

exports.DUMMY_USERS = [
    'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
];

exports.PATH_TO_CONTEST = '/path/to/contest';
exports.PATH_TO_APPENDLOGS = '/path/to/appendlogs';
