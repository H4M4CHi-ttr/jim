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

function create_link_add_google_calendar(区分, 開始日, 期間) {
    return $("<a>")
        .attr({
            href: generate_url_add_google_calendar(区分, 開始日, 期間),
            target: "_blank",
            "data-toggle": "tooltip",
            title: "Googleカレンダーに登録",
        })
}

function generate_url_add_google_calendar(区分, 開始日, 期間) {
    let 件名 = get_苗字() + '　' + 区分;
    let m_開始日 = moment(new Date(開始日))
    let m_終了日 = null
    let 期間_日 = null
    let grp = null
    if (grp = 期間.match(/(\d+)日/)) {
        期間_日 = parseInt(grp[1])
    } else {
        期間_日 = 1;
        件名 += ' (' + 期間 + ')'
    }
    m_終了日 = moment(new Date(開始日)).add(期間_日, 'days')

    url_param = {
        //https://www.google.com/calendar/render?action=TEMPLATE&text=ほげ 有休&dates=20200501T120000/20200501T140000&location=東京都千代田区霞ヶ関1-1-1&trp=true&trp=undefined&trp=true&sprop=
        action: "TEMPLATE",
        text: 件名,
        dates: m_開始日.format("YYYYMMDD") + '/' + m_終了日.format("YYYYMMDD"),
    }
    return "https://www.google.com/calendar/render?" + (new URLSearchParams(url_param)).toString()
}

function get_苗字() {
    return $("#rollover-menu-link").text().match(/^(.*?)[ ]/)[1] // 最初のスペースまでが苗字
}