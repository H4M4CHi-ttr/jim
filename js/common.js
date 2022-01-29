function run_on_page(callback) {
    code = '(' + callback + ')()'
    $("body").append(
        $('<script type="text/javascript">').text(code)
    )
}

function url_match(url_pattern) {
    var current = window.location.href
    return (current.match(new RegExp(url_pattern)) != null)
}

function get_param_from_current_url() {
    let url = new URLSearchParams(window.location.search)
    return Object.fromEntries(url)
}

function create_link_add_google_calendar(区分, 開始日, 期間, 終了日 = null) {
    return $("<a>")
        .attr({
            href: generate_url_add_google_calendar(区分, 開始日, 期間, 終了日),
            target: "_blank",
            "data-tippy-content": "Googleカレンダーに登録",
        })
}

function generate_url_add_google_calendar(区分, 開始日, 期間, 終了日) {
    let 件名 = get_苗字() + '　' + 区分;
    let m_開始日 = moment(new Date(開始日))
    let m_終了日
    if (終了日 == null){
        // パラメータとして渡す終了日は+1日する必要あり
        m_終了日 = moment(new Date(開始日)).add(1, 'days')
    } else {
        // パラメータとして渡す終了日は+1日する必要あり
        m_終了日 = moment(new Date(終了日)).add(1, 'days')
    }
    if ( ! 期間.match(/(\d+)日/)) {
        件名 += ' (' + 期間 + ')'
    }

    url_param = {
        //https://www.google.com/calendar/render?action=TEMPLATE&text=ほげ 有休&dates=20200501T120000/20200501T140000&location=東京都千代田区霞ヶ関1-1-1&trp=true&trp=undefined&trp=true&sprop=
        action: "TEMPLATE",
        text: 件名,
        dates: m_開始日.format("YYYYMMDD") + '/' + m_終了日.format("YYYYMMDD"),
    }
    return "https://www.google.com/calendar/render?" + (new URLSearchParams(url_param)).toString()
}

function extract_休暇区分(休暇名){
    let grp = 休暇名.match(/有休|振休|夏季休暇|育児参加特別|欠勤|忌引休暇|慶事休暇|看護休暇/)
    if (grp) {
        return grp[0]
    } else {
        return 休暇名 
    }
}

function get_苗字() {
    return $("#rollover-menu-link").text().match(/^(.*?)[ ]/)[1] // 最初のスペースまでが苗字
}