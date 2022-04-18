import $ from "jquery"
import { route } from "../../helper/helper"

export default function shift_pattern_request(){
    console.log("shif")
    route("/employee/shift-pattern-request", shift_pattern_request_root)
}

function shift_pattern_request_root(){
    setTimeout(function () {
        let scroll_to = null
        let $target_a = $("a[href*='" + location.search + "']")
        if ($target_a) {
            scroll_to = $target_a.offset().top - 200
        }
        if (scroll_to) {
            $("html").animate({ scrollTop: scroll_to }, 'fast')
        }
    }, 300)
}
