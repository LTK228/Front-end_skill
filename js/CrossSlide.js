
/* 下面的滑動鍵 */

    /* 預設 第一格白色 */
    $(".dot li").eq(0).css("background-color","white")
    
    
    /* 滑鼠經過時 特效 */
    $(".dot li").mouseenter(function () {
        
        // 自己背景變白色、其他兄弟恢復透明
        $(this).css("background","white")
        .siblings().css("background","transparent");

        // 預設 0
        let slideNumber = 0
        // p53  選擇器.index() ：回傳同級(sibling)的索引數
        slideNumber = $(".dot li").index( $(this) );
        console.log(slideNumber);
        
        // 當滑鼠移過時， slideNumber 就 -900
        let slideMove = 0-900 * slideNumber;
        // ul 的幻燈片，left 屬性 調成 slideMove
        $("ul.slides").css("left",slideMove);
    })