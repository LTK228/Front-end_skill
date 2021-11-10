/* 避免 舊瀏覽器不支援 */
document.createElement("form");
document.createElement("fieldset");
document.createElement("legend");



/* innerHTML 優點：效能高 */
// document.querySelector("#checkResult").innerHTML = "✅ 輸入格式正確";
// document.querySelector("#checkResult").innerHTML = "❌ 不可空白";


/* createElement 優點：安全性高、避免 XSS（cross-site scripting）跨站指令攻擊 */
// var checkResult = document.createElement("span") // DOM 建立元素節點： <span></span>
// checkResult.textContent="✅❌";                 // DOM 新增元素節點的內容：<span>✅❌</span>
// checkResult.setAttribute("class","Result");      // DOM 新增元素節點的屬性：<span class="Result">✅❌</span>
// document.querySelector("#checkResult").appendChild(checkResult); // DOM 連結



/* 表格一、姓名 */
// 問題 /'u0000'/ https://blog.miniasp.com/post/2019/01/02/Common-Regex-patterns-for-Unicode-characters

/* 事件監聽 細節，當發生 blur 離開焦點時，執行函式 */
document.getElementById("name").addEventListener("blur", nameCheck,false);
function nameCheck() {
    /* 建立節點的變數，方便後續使用 */
    let nameResult = document.getElementById("nameCheckResult");
    let nameValue = document.getElementById("name").value;
    let nameValueLength = document.getElementById("name").value.length;

    /* 判別內容 */
    if (nameValue.trim() == null || nameValue.trim() == "" || nameValue === " ") {              // 如果內容 沒有輸入
        nameResult.innerHTML = "❌ 內容不能空白";
    } else if (nameValueLength >= 2) {  // 判別內容 的格式
        /* 
        1. 判別輸入的內容，
        2. (p.60) charCodeAt(index)：回傳索引值的 unicode、
        3. 十進位 中文範圍 0x4e00~0x9fff */
        for (let i = 0; i < nameValueLength; i++) {
            let zh = nameValue.charCodeAt(i);
            if(zh>=0x4e00 && zh<=0x9fff){
                nameResult.innerHTML = "✅ 格式正確";
            } else {
                nameResult.innerHTML = "❌ 僅能輸入中文";
            }
        }
    } else {                            // 如果內容 長度 <6
        nameResult.innerHTML = "❌ 必須至少填寫 2 個名字";}
}


/* 表格二、密碼 */

document.querySelector("#pwd").onblur = pwdCheck; /* 事件繫結，焦點離開 */
function pwdCheck() {                             /* 執行以下內容 */
    /* 建立節點的變數 */
    let pwdResult = document.querySelector("#pwdCheckResult");
    let pwdValue = document.querySelector("#pwd").value;
    let pwdValueLength = document.querySelector("#pwd").value.length;

    /* 判別內容 */
    if (pwdValue.trim() == null || pwdValue.trim() == "" || pwdValue === " ") {               // 如果內容 沒有輸入
        pwdResult.innerHTML = "❌ 內容不可空白";
    } else if (pwdValueLength >= 6) {    // 判別內容 的格式
        
        // 用於判別 內容是否 含有英文和數字
        let flag1=false, flag2=false, flag3=false;

        for (let i = 0; i < pwdValueLength; i++) {
            /* 
            1. 判別輸入的內容，
            2. (p.60) charAt(index)：回傳索引值的字元、
            3. toUpperCase()：全部改成大寫以便判別 */
            let nm = pwdValue.charAt(i).toUpperCase();

            if (nm >= "A" && nm <= "Z") {
                flag1 = true; // 如果內容有英文，滿足第一條件
                pwdResult.innerHTML = "❌ 必須含數字";
            } else if (nm >= "0" && nm <= "9"){
                pwdResult.innerHTML = "❌ 必須含英文";
                flag2 = true;} // 如果內容有數字，滿足第二條件
                if (flag1 && flag2) {
                pwdResult.innerHTML = "✅ 格式正確";
                break;}        // 如果滿足內容有數字和英文，跳脫迴圈
        } // end of 迴圈

    } else {    // 如果內容 長度 <6
        pwdResult.innerHTML = "❌ 長度必須大於 6";
    }
}


/* 表格三、日期 */
// http://www.eion.com.tw/Blogger/?Pid=1047


/* RegExp https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions */
/* RegExp https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/RegExp */


document.querySelector("#date").addEventListener("blur",dateCheck, false);      // 如果 從輸入框 離開時，觸發 function

function dateCheck() {  // 檢查 日期格式

    /* 宣告變數：以便後面使用判別 */
    let inputText = document.getElementById("date");                            // 繫結 輸入框
    let inputTextValue = document.getElementById("date").value;                 // 輸入框的值
    let inputTextValueLength = document.getElementById("date").value.length;    // 輸入框 值的長度

    let dateResult = document.getElementById("dateCheckResult");                // 回饋資訊

    /* 判別 日期格式 */
    if (inputTextValue.trim() == null || inputTextValue.trim() == "" || inputTextValue === " ") {                 // 如果 輸入框 空白
        dateResult.innerHTML = "❌ 內容不可空白";

    } else if (inputTextValueLength == "10") {  // 輸入格是必須剛好是 YYYY/MM/DD → 10 個字串 → 才執行判斷
        let textAry = inputTextValue.split("/");      // 根據 / 符號分開，回傳陣列
        let inputDate = new Date (inputTextValue);    // 輸入框內的值，以 new Date 格式 (YYYY/MM/DD) 傳回。

        console.log(textAry[2]);
        console.log(inputDate.getDate());

        if (inputDate.getFullYear() == textAry[0]) {     // 年格式 如果正確 → 判別 月
            if (inputDate.getMonth()+1 == textAry[1]) {  // 月格式 如果正確 → 判別 日
                
                if (inputDate.getDate() == textAry[2]) { // 日格式 如果正確 → 表示格式正確 且 符合正常日期
                    dateResult.innerHTML = `✅ 格式正確，您輸入的內容是 ${inputDate.getFullYear()} 年 ${inputDate.getMonth()+1} 月 ${inputDate.getDate()} 日`;
                }
            } 
        } 
        
    } else {dateResult.innerHTML = "❌ 格是必須是<span style='color:red';>YYYY/MM/DD</span>　※提醒您：如果月份為 5 月，請輸入<span style='color:red';>05</span>。";
    };



    
}








/*
function dateCheck(str) {
    let dateForm = new RegExp("^([0-9]{4}) [./]{1} ([0-9]{1,2}) [./]{1} ([0-9]{1,2}) $");

    console.log(dateForm);

    let dataValue;
    let flag = true;

    if ((dateValue = dateForm.exec(str)) == null) { // 如果內容空白
        document.querySelector("#dateCheckResult").innerHTML = "❌ 內容不可空白";
    } else if ((dateValue = dateForm.exec(str)) != null) {
        let i = parseFloat(dataValue[1]);   // 年
        if (i<=0 || i>9999) {
            flag = false;
        }
        
        i = parseFloat(dataValue[2]);       // 月
        if (i<=0 || i>12) {
            flag = false;
        }
        
        i = parseFloat(dataValue[3]);       // 日
        if (i<=0 || i>31) {
            flag = false;
        }
    } else {
        flag = false;
    } if (!flag) {
        document.querySelector("#dateCheckResult").innerHTML = "❌ 日期格式需為 YYYY/MM/DD ";
    } return flag;
}
*/