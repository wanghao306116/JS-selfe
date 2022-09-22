//封装的选项卡
//tabBtn: 选项卡按钮元素
//tabCon: 选项卡的内容
//tab对象

function Tab(tab_dom, con_dom) {
    this.tabBtn = document.querySelectorAll(tab_dom);
    this.tabCon = document.querySelectorAll(con_dom);
    this.index = 0; //当前显示默认
    //实例化对象的时候就执行这个方法
    this.tabClick();
}

//为Tab对象 添加 原型方法 ---> 点击选项卡方法
Tab.prototype.tabClick = function() {
    //console.log(this);
    var that = this; //保存当前this
    this.tabBtn.forEach(function(ele, index) {
        ele.onclick = function() {
            //这里的this代表---按钮
            that.changTab(index)
        }
    })
}

//为 tab 添加一个 改变按钮 和 图片 的方法
Tab.prototype.changTab = function(index) {
    //console.log(this);
    //移除 按钮 和 图片 的 active 
    this.tabBtn[this.index].classList.remove("active");
    this.tabCon[this.index].classList.remove("active");
    this.index = index; //前一个隐藏后一个显示
    //为当前的 按钮 和 图片 添加 active
    this.tabBtn[this.index].classList.add("active");
    this.tabCon[this.index].classList.add("active");
}

/**
 * 封装一个左右切换的对象
 * 特性: 点击下方按钮切换,也可以点击左右按钮进行切换
 * 
 * 左右对象 继承 tab 对象
 */
function TabArraw(tab_dom, con_dom, lr_dom) {
    // 构造函数 继承 属性
    Tab.call(this, tab_dom, con_dom);
    // 保存this的长度
    this.len = this.tabBtn.length;
    // 定义自己的属性
    this.lrBtn = document.querySelectorAll(lr_dom);
    this.lrClick(); //构造函数中手动的方法
}

//继承 原型方法
//TabArraw.prototype = new Tab(); // 这种继承会有 紊乱 问题
//拷贝继承   create 新对象 拷贝TAB的原型属性
TabArraw.prototype = Object.create(Tab.prototype);

// 为左右切换 添加 点击方法
TabArraw.prototype.lrClick = function() {
    var that = this;
    this.lrBtn.forEach(function(ele, i) {
        // console.log(ele, i);
        ele.onclick = function() {
            var index;
            if (i) {
                index = that.index + 1
                if (index >= that.len) index = 0;
            } else {
                index = that.index - 1;
                // <0 就到最后一张
                if (index < 0) index = that.len - 1;
            }
            that.changTab(index);
        }
    })
}


/**
 * 封装一个 自动轮播对象  -->继承左右对象
 * 自己的属性  tab : 父亲的tab --->鼠标在tab上停止伦布哦
 */
function AutoTab(tab_dom, con_dom, lr_dom, tab) {
    TabArraw.call(this, tab_dom, con_dom, lr_dom);
    this.tab = document.querySelector(tab);
    //自动轮播的方法
    this.autoFn();
}

//继承 原型方法
AutoTab.prototype = Object(TabArraw.prototype);

//为自动对象添加方法
AutoTab.prototype.autoFn = function() {
    var that = this;
    var timeId;

    function fn() {
        timeId = setInterval(function() {
            var index = that.index + 1;
            if (index >= that.len) index = 0;
            that.changTab(index);
        }, 2000);
    }
    fn();

    //清除定时器
    that.tab.onmouseenter = function() {
        clearInterval(timeId);
    }

    //开启定时器
    that.tab.onmouseleave = function() {
        fn();
    }
}


var tab1 = new Tab("#tab .tab li", "#tab .content li");
var tab2 = new Tab("#tab2 .tab2 li", "#tab2 .img li");
var tab3 = new TabArraw("#tab3 .tab2 li", "#tab3 .img li", "#tab3 .arrow li");
var tab4 = new AutoTab("#tab4 .tab2 li", "#tab4 .img li", "#tab4 .arrow li", "#tab4");

// console.log(tab1)
// console.log(tab2)