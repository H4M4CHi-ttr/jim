'use strict';

import "./contentScript/css/style.scss"

import common                 from "./contentScript/employee/common"
import attendance             from "./contentScript/employee/attendance"
import adit_modify            from "./contentScript/employee/adit_modify"
import shift_pattern_request  from "./contentScript/employee/shift_pattern_request"
import holiday                from "./contentScript/employee/holiday";
import over_work              from "./contentScript/employee/over_work"
import holidayworking         from "./contentScript/employee/holidayworking";

import {route} from "./helper/helper.js";

// 出勤簿
route('/employee/attendance(/*)*', attendance)
// 打刻修正
route('/employee/adit/modify(/*)*', adit_modify)
// シフト申請
route('/employee/shift-pattern-request(/*)*', shift_pattern_request)
// 休暇申請
route('/employee/holiday(/*)*', holiday)
// 残業申請
route('/employee/over-work(/*)*', over_work)
// 休日出勤申請
route('/employee/holidayworking(/*)*', holidayworking)

// 共通処理
common()