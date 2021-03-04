<?php

/**
 * 皆勤賞ポイント (100回記念) 進呈通知メールを送る
 *
 * Usage:
 *   php send-kaikin100.php foo@tribox.jp "名前" "種目名ハイフン区切り" ポイント数
 */

var_dump($argv);
if (count($argv) != 5) {
    exit("Invalid arguments\n");
}

mb_language('ja');
mb_internal_encoding('UTF-8');

$to_email = $argv[1];
$to_name = $argv[2];
$events_name = $argv[3];
$point = $argv[4];


$header = 'From:' . mb_encode_mimeheader('TORIBO Contest') . '<support@tribox.jp>' . "\n"
                  . 'Cc: support@tribox.jp' . "\n"
                  . 'Reply-to: support@tribox.jp';
$subject = '[TORIBO Contest] 通算100節記念皆勤賞ポイント進呈のお知らせ';
$body = $to_name . " 様\n\n"
      . "いつもトリボコンテストにご参加頂き、誠にありがとうございます。\n"
      . "通算100節記念皆勤賞についてのお知らせです。\n\n"
      . "皆勤賞としてTORIBOポイントを進呈させて頂きました。\n"
      . "TORIBOストアのマイページよりご確認ください。\n"
      . "https://store.tribox.com/mypage/\n\n"
      . "進呈ポイント: " . $point . "\n\n"
      . "皆勤賞の条件: 通算100節目 (2018年前半期第21節) 終了時までに3×3×3で90回以上記録を残している方\n"
      . "※非認証アカウント (TORIBOストアと連携していないアカウント) は対象外です。\n\n"
      . "今後ともぜひよろしくお願い致します。\n"
      . "https://contest.tribox.com/\n"
      . "株式会社トライボックス\n";
$res = mb_send_mail($to_email, $subject, $body, $header);
