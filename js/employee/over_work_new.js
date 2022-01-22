console.log('over-work/new')
// テンプレ入れ込み
$("[name='description']").val(localStorage.jim__template残業理由)

// urlパラメータの処理
let params = get_param_from_current_url()

setTimeout(function () {
    if (params.year && params.month && params.day) {
        $("#over_work_year ").val(params.year)
        $("#over_work_month").val(params.month)
        $("#over_work_day  ").val(params.day)
        $("#over_work_day  ").change()
    }
}, 200)


$("form.card").append("<div class='card-body' id='申請一覧'>")
$.ajax("https://ssl.jobcan.jp/employee/over-work")
    .then(function (r) {
        var $table = $(r).find("table").eq(1)
        $table.find("th:nth-child(4), td:nth-child(4)").remove()
        $table.appendTo("#申請一覧")
    })

// 残業時刻のプリセット調整
$("select[name='end[h]']").val(18); // 18は20時のこと

// 分のセレクトボックスを最初から広げておく
$("select[name='end[m]'").attr("size","2")

// 残業理由のプリセット保存ボタン
$("table:nth-child(1) > tbody > tr:nth-child(1) > th").css({ width: "100px" })

let $th残業理由 = $("table:nth-child(1) > tbody > tr:nth-child(3) > th")
$th残業理由
    .append(
        $(`<button>`).attr({
            id           : "jim-残業理由プリセット保存",
            "class"      : "btn jbc-btn-secondary",
            "data-toggle": "tooltip",
            title        : "現在の値：" + localStorage.jim__template残業理由,
            style        : "font-size: 0.8rem; margin: 5px 0",
        }).text("プリセット保存")
    ).promise().done(function () {
        $("#jim-残業理由プリセット保存")
            .on("click", function (event) {
                event.preventDefault();
                localStorage.jim__template残業理由 = $("[name='description']").val()
                $(this).attr("data-original-title", "現在の値：" + $("[name='description']").val())
            })
    })
