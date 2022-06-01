import $ from "jQuery";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

/**
 * 共通処理
 */
export default function common() {
    折りたたみメニューを展開();
    申請メニューに新規作成ボタンを追加();
    listen前月翌月ボタン押下_画面切替();
    styleの調整();
    tooltip表示を設定();
}

/**
 * シフト申請のメニューなど最初から展開しておく
 */
function 折りたたみメニューを展開() {
    $(".dropup .dropdown-menu")
        .removeClass("dropdown-menu")
        .addClass("jim-dropdown-menu")

    $(".dropup .list-group-item:not('.active')")
        .css("background-color", "#d3d3d3")

    $(".dropup svg.bi").remove()  // グループの右に出てる「>」は邪魔なので消す
    $(".dropup > a").css("pointer-events", "none")
}

/**
 * 各新規申請へのショートカットを作成
 */
function 申請メニューに新規作成ボタンを追加() {
    $("#menu_order a").wrap(`<div class="jim-dropdown-item-wrapper">`)
    $(".jim-dropdown-item-wrapper").append(/*html*/`
    
    <a 
        class="jim-submenu-add-button"
        data-tippy-placement="right"
    >
        <i class="fa fa-plus" aria-hidden="true" style="font-size: 1.2rem;"></i>
    </a>

    `)

    $(".jim-submenu-add-button").each(function () {
        var add_href = $(this).prev("a").attr("href") + '/new'
        var 申請タイプ = $(this).prev("a").text()
        $(this).attr({
            href: add_href,
            "data-tippy-content": "新規" + 申請タイプ,
        })
    })
}

/**
 * 月指定で前月・翌月ボタンを押したとき自動で画面を切り替える
 */
function listen前月翌月ボタン押下_画面切替() {
    $("label:contains('指定月')").closest("th").next("td").find(".calendar-arrow-btn")
        .on("click", function () {
            $("label:contains('指定月')").prev("input#search-type-month").prop("checked", true)
            $("input[value=表示]").click()
            $("a.btn").filter((idx, el) => $(el).text() === "表示")[0].click()
        })
}

/**
 * その他、細かなstyleの調整
 */
function styleの調整() {

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
}

/**
 * tooltip表示を設定
 */
function tooltip表示を設定() {
    tippy('[data-tippy-content]', {})
}