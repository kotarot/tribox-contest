<?php

/**
 * 皆勤賞ポイント進呈通知メールを送る
 *
 * Usage:
 *   php send-kaikin.php foo@tribox.jp "名前" "シーズン名" "種目名ハイフン区切り" ポイント数
 */

var_dump($argv);
if (count($argv) != 6) {
    exit("Invalid arguments\n");
}

mb_language('ja');
mb_internal_encoding('UTF-8');

$to_email = $argv[1];
$to_name = $argv[2];
$season = $argv[3];
$events_name = $argv[4];
$point = $argv[5];

$seasonstr = substr($season, 0, 4) . '年';
if (substr($season, 4, 1) === '1') {
    $seasonstr .= '前半期';
} else if (substr($season, 4, 1) === '2') {
    $seasonstr .= '後半期';
}

$header = 'From:' . mb_encode_mimeheader('TORIBO Contest') . '<support@tribox.jp>' . "\n"
                  . 'Cc: support@tribox.jp' . "\n"
                  . 'Reply-to: support@tribox.jp';
$subject = '[TORIBO Contest] 皆勤賞ポイント進呈のお知らせ';
$body = $to_name . " 様\n\n"
      . "トリボコンテストにご参加頂き、誠にありがとうございます。\n"
      . $seasonstr . "の皆勤賞についてのお知らせです。\n\n"
      . "ささやかではありますが、皆勤賞としてTORIBOポイントを進呈させて頂きました。\n"
      . "TORIBOストアのマイページよりご確認ください。\n"
      . "https://store.tribox.com/mypage/\n\n"
      . "なお皆勤賞は種目ごとに設定されており、1種目につき500ポイント（上限2000ポイント）を進呈しています。\n\n"
      . $to_name . " 様が皆勤賞を受賞された種目\n"
      . str_replace('+', "\n", $events_name)
      . "\n"
      . "合計進呈ポイント: " . $point . "\n\n"
      . "皆勤賞の条件: 対象の種目において全ての節に何らかの記録を残している かつ DNFが3回以下\n"
      . "※非認証アカウント (TORIBOストアと連携していないアカウント) は対象外です。\n\n"
      . "今シーズンもぜひよろしくお願い致します。\n"
      . "https://contest.tribox.com/\n"
      . "株式会社トライボックス\n";
$res = mb_send_mail($to_email, $subject, $body, $header);
