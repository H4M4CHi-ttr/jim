$(function () {
    // 時刻入力で「:」を入れた場合に自動で除去する
    $("#ter_time").change(function () {
        $(this).val($(this).val().replace(":", ""))
    })
    // // 時刻入力にシンプルなピッカーを追加
    // $("#ter_time").timepicker({
    //   scrollDefault: "now",
    //   show2400: true,
    //   timeFormat: "H:i",
    // })
})