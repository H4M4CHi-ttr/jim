import $ from "jquery"
import { route, get_param_from_current_url } from "../../helper/helper"

export default function holidayworking(){
	route("/employee/holidayworking/new", holidayworking_new)
}

function holidayworking_new(){
	let params = get_param_from_current_url()

	setTimeout(function () {
		if (params.year && params.month && params.day) {
			$("#holidayworking_year ").val(params.year)
			$("#holidayworking_month").val(params.month)
			$("#holidayworking_day  ").val(params.day)
			$("#holidayworking_day  ").change()
		}
	}, 200)


	$("form.card").append("<div class='card-body' id='申請一覧'>")
	$.ajax("https://ssl.jobcan.jp/employee/holidayworking")
		.then(function (r) {
			var $table = $(r).find("table").eq(1)
			$table.find("th:nth-child(6), td:nth-child(6)").remove()
			$table.appendTo("#申請一覧")
		})

}

