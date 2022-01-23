localStorage.jim__tmp休暇申請_カレンダー登録ボタンhtml = ""

let 休暇名     = $("th:contains('休暇名')").next("td").text()
let 休暇区分   = extract_休暇区分(休暇名)
let 休暇希望日 = $("th:contains('休暇希望日')").next("td").text().replace(/年|月|日/g, "-")

let 休暇開始日 = 休暇希望日
let 休暇終了日 = null
if (休暇希望日.match("～")){
	[休暇開始日, 休暇終了日] = 休暇希望日.split("～")
}

let 期間 = $("th:contains('休暇時間')").next("td").text()

// カレンダー登録ボタンを作成
let $a = create_link_add_google_calendar(休暇区分, 休暇開始日, 期間, 休暇終了日)
$a.append('<i class="fa fa-calendar-plus-o" style="font-size: 1.5rem; margin-left: 5px;"></i> <span>Googleカレンダーに登録</span>')
// 完了画面のために登録ボタンのHTMLを保存しておく
localStorage.jim__tmp休暇申請_カレンダー登録ボタンhtml = $a[0].outerHTML

//// ひとまず確認画面には出さない
// let $申請内容table = $("h2:contains('新規休暇申請')").next("div").find("table")
// $tr = $("<tr><th></th><td></td></tr>")
// $tr.find("td").append(localStorage.jim__tmp休暇申請_カレンダー登録ボタンhtml)
// $申請内容table.append($tr)
