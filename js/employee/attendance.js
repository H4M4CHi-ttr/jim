$(function () {
    const $table = $("#search-result > div.table-responsive.text-nowrap > table");
    $table.find("td:contains('法休'), td:contains('公休')").closest("tr").addClass("holiday")

    $table.find("thead tr").prepend(`<th>申請</th>`)
    $table.find("tbody tr").prepend(`<td class="bim-td-申請"></td>`)
    $table.find("tfoot th").attr({ colspan: 3 })

    $table.find("tbody tr").each(function () {
        let is_holiday = $(this).hasClass("holiday")
        let $申請td = $(this).find(".bim-td-申請")

        $申請td.append(/*html*/ `
    
      <button class="bim bim-出勤簿-申請追加 btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
      <div class="bim bim-出勤簿-申請メニュー dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item bim-shift-pattern-request">シフト</a>
        <a class="dropdown-item bim-holiday-new not-show-in-holiday">休暇</a>
        <a class="dropdown-item bim-over-work-new not-show-in-holiday">残業</a>
        <a class="dropdown-item bim-holidayworking-new show-in-holiday">休日出勤</a>
      </div>
    
    `)

        const param = $(this)
            .find("a[href*='modify']")
            .attr("href").match(/\?.*/)[0]

        $申請td.find(".bim-shift-pattern-request").attr({ href: "/employee/shift-pattern-request" + param })
        $申請td.find(".bim-holiday-new").attr({ href: "/employee/holiday/new" + param })
        $申請td.find(".bim-over-work-new").attr({ href: "/employee/over-work/new" + param })
        $申請td.find(".bim-holidayworking-new").attr({ href: "/employee/holidayworking/new" + param })
    })

})