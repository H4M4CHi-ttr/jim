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

//-----------------------------------------------
// 残業時刻のプリセット調整
//-----------------------------------------------
let now = moment()
let h = now.hour()
let m = now.minute()
if (0 <= h && h < 8) {
    // 深夜の場合は24時～をプリセット
    h += 24
} else if (8 <= h && h <= 17) {
    // 日中の場合は18時をプリセット
    h = 18
    m = 0
}

// 分・時を30分単位で丸める
if (0 <= m && m < 15){
    m = 0
} else if (15 <= m && m < 45){
    m = 30
} else{
    h++
    m = 0
}
// 時刻にマッチするoputionのvalueを探す
let h_val = $("select#end_h option")
    .filter((idx, el) => parseInt($(el).text()) === h)
    .attr("value")
let m_val = $("select#end_m option")
    .filter((idx, el) => parseInt($(el).text()) === m)
    .attr("value")

// プリセット
$("select#end_h").val(h_val);
$("select#end_m").val(m_val);
//-----------------------------------------------

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

//------------------------------------------------------
// 見た目など調整
//------------------------------------------------------
// 分のセレクトボックスを最初から広げておく
$("select[name='end[m]'").attr("size","2")