
let $申請table = $("main > div > div > div > div.table-responsive.text-nowrap > table");
$申請table.find("tbody tr").each(function () {
    let $self = $(this)
    let 期間 = $(this).find("td:nth-child(6)").text()
    let 内容 = $(this).find("td:nth-child(4)").text()
    let 休暇区分 = extract_休暇区分(内容)
    let 休暇日 = $(this).find("td:nth-child(2)").text()
    let 休暇開始日 = 休暇日
    let 休暇終了日
    let カレンダーボタン追加 = function(){
        let $a = create_link_add_google_calendar(休暇区分, 休暇開始日, 期間, 休暇終了日)
        $a.append('<i class="fa fa-calendar-plus-o" style="font-size: 1.5rem; margin-left: 5px;"></i>')
        $self.find("td:nth-child(2)").append($a)
    }
    if (休暇日.match("～")){
        // 複数日の場合は終了日が不明なのでajaxで詳細ページから終了日を取得する
        let 休暇id = $(this).find("td:nth-child(1)").text()
        let param = {
            applied_id: 休暇id
        }
        $.ajax("https://ssl.jobcan.jp/employee/holiday/info?"+(new URLSearchParams(param)).toString())
            .then(function(r){
                let フル休暇希望日 = $(r).find("th:contains('休暇希望日')").next("td").text()
                    .replace(/年|月/g, '-')
                    .replace(/日|\(.\)/g, '')
                let tmp = フル休暇希望日.split("～")
                休暇開始日 = tmp[0]
                休暇終了日 = tmp[1]

                let $a = create_link_add_google_calendar(休暇区分, 休暇開始日, 期間, 休暇終了日)
                $a.append('<i class="fa fa-calendar-plus-o" style="font-size: 1.5rem; margin-left: 5px;"></i>')
                $self.find("td:nth-child(2)").append($a)
            })
    } else {
        let $a = create_link_add_google_calendar(休暇区分, 休暇開始日, 期間, 休暇終了日)
        $a.append('<i class="fa fa-calendar-plus-o" style="font-size: 1.5rem; margin-left: 5px;"></i>')
        $self.find("td:nth-child(2)").append($a)
    }


})
