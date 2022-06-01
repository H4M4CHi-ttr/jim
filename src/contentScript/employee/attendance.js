import $ from "jquery"

import {route} from "../../helper/helper.js";

export default function attendance(){
  route("/employee/attendance", attendance_root);
}

function attendance_root(){
  
  $(function () {
      const $table = $("#search-result > div.table-responsive.text-nowrap > table");
      $table.find("td:contains('法休'), td:contains('公休')").closest("tr").addClass("holiday")

      $table.find("thead tr").prepend(`<th>申請</th>`)
      $table.find("tbody tr").prepend(`<td class="jim-td-申請"></td>`)
      $table.find("tfoot th").attr({ colspan: 3 })

      $table.find("tbody tr").each(function () {
          let $申請td = $(this).find(".jim-td-申請")

          $申請td.append(/*html*/ `
      
        <button class="jim jim-出勤簿-申請追加 btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
        <div class="jim jim-出勤簿-申請メニュー dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item jim-shift-pattern-request">シフト</a>
          <a class="dropdown-item jim-holiday-new not-show-in-holiday">休暇</a>
          <a class="dropdown-item jim-over-work-new not-show-in-holiday">残業</a>
          <a class="dropdown-item jim-holidayworking-new show-in-holiday">休日出勤</a>
        </div>
      
      `)

          const param = $(this)
              .find("a[href*='modify']")
              .attr("href").match(/\?.*/)[0]

          $申請td.find(".jim-shift-pattern-request").attr({ href: "/employee/shift-pattern-request" + param })
          $申請td.find(".jim-holiday-new").attr({ href: "/employee/holiday/new" + param })
          $申請td.find(".jim-over-work-new").attr({ href: "/employee/over-work/new" + param })
          $申請td.find(".jim-holidayworking-new").attr({ href: "/employee/holidayworking/new" + param })
      })

  })
}