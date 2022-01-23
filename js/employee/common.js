//------------------------------------------------
// シフト申請のメニューなど最初から展開しておく
//------------------------------------------------
$(".dropup .dropdown-menu")
    .removeClass("dropdown-menu")
    .addClass("jim-dropdown-menu")

$(".dropup .list-group-item:not('.active')")
    .css("background-color", "#d3d3d3")

$(".dropup svg.bi").remove()  // グループの右に出てる「>」は邪魔なので消す
$(".dropup > a").css("pointer-events", "none")

//----------------------------------------------
// 申請メニューに新規作成ボタン［＋］を追加する
//----------------------------------------------
$("#menu_order a").wrap(`<div class="jim-dropdown-item-wrapper">`)
$(".jim-dropdown-item-wrapper").append(/*html*/`
  
    <a 
      class="jim-submenu-add-button"
      data-toggle="tooltip"
      data-placement="right"
    >
      <i class="fa fa-plus" aria-hidden="true" style="font-size: 1.2rem;"></i>
    </a>

  `)

$(".jim-submenu-add-button").each(function () {
    var add_href = $(this).prev("a").attr("href") + '/new'
    var 申請タイプ = $(this).prev("a").text()
    $(this).attr({
        href: add_href,
        title: "新規" + 申請タイプ,
    })
})

//----------------------------------------------
// 指定月で前月・翌月を押したとき自動で画面を切り替える
//----------------------------------------------
$("label:contains('指定月')").closest("th").next("td").find(".calendar-arrow-btn").on("click", function(){
    $("label:contains('指定月')").prev("input#search-type-month").prop("checked",true)
    $("input[value=表示]").click()
    $("a.btn").filter((idx,el) => $(el).text() === "表示")[0].click()
})

//----------------------------------------------
// その他、見た目のカスタマイズ
//----------------------------------------------

// カレンダーボタンの大きさ調整
var cal_btn_scale = 1.5
$("svg.bi-calendar-check").css({
    transform: "scale(" + cal_btn_scale + ")",
})

var cal_scale = 1.25
$("span[id^='cal']").css({
    transform: "scale(" + cal_scale + ")",
    "z-index": 9999,
})

// セレクトボックスを小さくさせているclassを取り除く
$("select").removeClass("custom-select-sm")

run_on_page(function(){
    $('[data-toggle="tooltip"]').tooltip()
})
