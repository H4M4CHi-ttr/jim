import $ from "jquery"
import axios from "axios"
import moment from "moment"

import { create_link_add_google_calendar, extract_休暇区分, get_param_from_current_url, route } from "../../helper/helper"

export default function holiday(){
	console.log("holi")
	route("/employee/holiday", holiday_root)
	route("/employee/holiday/new", holiday_new)
	route("/employee/holiday/confirm", holiday_confirm)
	route("/employee/holiday/finish", holiday_finish)
}

function holiday_root(){
	
	// Googleカレンダーに追加ボタンを挿入
	const $申請table = $("main > div > div > div > div.table-responsive.text-nowrap > table");
	$申請table.find("tbody tr").each(async function () {
		const $self    = $(this)
		const 期間     = $(this).find("td:nth-child(6)").text()
		const 内容     = $(this).find("td:nth-child(4)").text()
		const 休暇区分 = extract_休暇区分(内容)
		const 休暇日   = $(this).find("td:nth-child(2)").text()
		let 休暇開始日 = 休暇日
		let 休暇終了日
		if (休暇日.match("～")){
			// 複数日の場合は終了日が不明なのでajaxで詳細ページから終了日を取得する
			let 休暇id = $(this).find("td:nth-child(1)").text()
			let params = {
				applied_id: 休暇id
			}
			const r = await axios.get("https://ssl.jobcan.jp/employee/holiday/info", {params: params})
	
			let フル休暇希望日 = $(r.data).find("th:contains('休暇希望日')").next("td").text()
				.replace(/年|月/g, '-')
				.replace(/日|\(.\)/g, '')
			let tmp = フル休暇希望日.split("～")
			休暇開始日 = tmp[0]
			休暇終了日 = tmp[1]
		} 
		// Googleカレンダーに追加ボタンを挿入
		const $a = create_link_add_google_calendar(休暇区分, 休暇開始日, 期間, 休暇終了日)
		$a.append('<i class="fa fa-calendar-plus-o" style="font-size: 1.5rem; margin-left: 5px;"></i>')
		$self.find("td:nth-child(2)").append($a)
	
	})
	
}

async function holiday_new(){
	const params = get_param_from_current_url()

	
	setTimeout(function () {
		if (params.year && params.month && params.day) {
			$("#holiday_year , #to_holiday_year ").val(params.year)
			$("#holiday_month, #to_holiday_month").val(params.month)
			$("#holiday_day  , #to_holiday_day  ").val(params.day)
			$("#holiday_day  , #to_holiday_day  ").trigger("change")
		}
	}, 200)

	$("div.card").append("<div class='card-body' id='申請一覧'>")

	const from_days = 14
	const to_days = 30
	const moment_now  = moment()
	const moment_from = moment_now.clone().subtract(from_days, 'days')
	const moment_to   = moment_now.clone().add(to_days, 'days')

	const res = await axios.get("https://ssl.jobcan.jp/employee/holiday", {
		params: {
			"search_type": "term",
			"from[y]": moment_from.year(),
			"from[m]": moment_from.month()+1, // 月は1小さいのに注意
			"from[d]": moment_from.date(),
			"to[y]": moment_to.year(),
			"to[m]": moment_to.month()+1, // 月は1小さいのに注意
			"to[d]": moment_to.date(),
		}
	})
	console.log(res)
	const $table = $(res.data).find("table").eq(1)
	// 幅削減のため申請日の列を削除
	$table.find("th:nth-child(5), td:nth-child(5)").remove()
	$("#申請一覧")
		.append(`<p>${moment_from.format('YYYY/MM/DD')} ～ ${moment_to.format('YYYY/MM/DD')}の休暇申請一覧</p>`)
		.append($table)

}

function holiday_confirm(){
	localStorage.jim__tmp休暇申請_カレンダー登録ボタンhtml = ""

	const 休暇名     = $("th:contains('休暇名')").next("td").text()
	const 休暇区分   = extract_休暇区分(休暇名)
	const 休暇希望日 = $("th:contains('休暇希望日')").next("td").text().replace(/年|月|日/g, "-")

	let 休暇開始日 = 休暇希望日
	let 休暇終了日 = null
	if (休暇希望日.match("～")){
		[休暇開始日, 休暇終了日] = 休暇希望日.split("～")
	}

	const 期間 = $("th:contains('休暇時間')").next("td").text()

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

}

function holiday_finish(){
	const $div = $('<div class="card-text" style="padding:10px">')
	$div.append(localStorage.jim__tmp休暇申請_カレンダー登録ボタンhtml)
	$(".card-text").after($div)
}