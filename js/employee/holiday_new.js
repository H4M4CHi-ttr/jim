let params = get_param_from_current_url()

setTimeout(function () {
    if (params.year && params.month && params.day) {
        $("#holiday_year , #to_holiday_year ").val(params.year)
        $("#holiday_month, #to_holiday_month").val(params.month)
        $("#holiday_day  , #to_holiday_day  ").val(params.day)
        $("#holiday_day  , #to_holiday_day  ").change()
    }
}, 200)

$("div.card").append("<div class='card-body' id='申請一覧'>")
$.ajax("https://ssl.jobcan.jp/employee/holiday")
    .then(function (r) {
        var $table = $(r).find("table").eq(1)
        $table.find("th:nth-child(5), td:nth-child(5)").remove()
        $table.appendTo("#申請一覧")
    })
