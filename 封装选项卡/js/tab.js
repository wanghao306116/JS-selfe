//一. 简单选项卡

// 获取tab按钮 和 content
var tab_dom = document.querySelectorAll("#tab .tab li");
var con_dom = document.querySelectorAll("#tab .content li");

//点击tab按钮显示对应的内容
// for (var i = 0; i < tab_dom.length; i++) {
//     (function(i) {
//         tab_dom[i].onclick = function() {
//             console.log(i);
//         }
//     })(i)
// }

//es5 遍历数组方法  foreach
/**
 * foreach:三个参数  有顺序
 * ele: 当前元素   必须有
 * index:当前元素索引
 * arr:正在被遍历的数组
 */

tab_dom.forEach(function(ele, index) {
    //为按钮添加点击时间
    ele.onclick = function() {
        /**
         * 使用排他思想,实现只有一个元素显示
         * 先将所有按钮的 active 去除掉(干掉所有)
         * 再重新给定义的按钮添加 active (留下自己)
         */
        for (let i = 0; i < tab_dom.length; i++) {
            console.log(tab_dom[i]);
            tab_dom[i].classList.remove("active");
            con_dom[i].classList.remove("active");
        }
        this.classList.add("active");
        con_dom[index].classList.add("active")
    }
})