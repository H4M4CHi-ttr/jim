let $申請table = $("main > div > div > div > div.table-responsive.text-nowrap > table");
$申請table.find("tbody tr").each(function () {
    let 休暇日 = $(this).find("td:nth-child(2)").text()
    let 期間 = $(this).find("td:nth-child(6)").text()
    let 内容 = $(this).find("td:nth-child(4)").text()
    let grp = 内容.match(/有休|振休|夏季休暇|育児参加特別|欠勤|忌引休暇|慶事休暇|看護休暇/)
    if (grp) {
        休暇区分 = grp[0]
    } else {
        休暇区分 = 内容
    }

    let $a = create_link_add_google_calendar(休暇区分, 休暇日, 期間)
    $a.append('<i class="fa fa-calendar-plus-o" style="font-size: 1.5rem; margin-left: 5px;"></i>')

    $(this).find("td:nth-child(2)").append($a)

})