// 放大镜开始

function Magnifier(z_index = 0) {
    // 获取需要的元素
    // 小图元素
    this.wrap_small_ele = document.querySelector(".wrap-small-magnifier");
    this.wrap_small_img = document.querySelectorAll(".tong");
    this.wrap_small_img = document.querySelectorAll(".tong");
    // 焦点
    this.focus_ele = document.querySelector(".focus");
    // 大图
    this.wrap_big_ele = document.querySelector(".wrap-big-magnifier");
    //大图big下的所有图
    this.big_img = this.wrap_big_ele.querySelectorAll("img");
    //第一个大图
    this.big_img_one = this.wrap_big_ele.querySelector(".one");
    //第二个大图
    this.big_img_tow = this.wrap_big_ele.querySelector(".tow");
    // 选项图片
    this.btn_eles = document.querySelectorAll(".wrap-choice-magnifier i");
    // 下标
    this.z_index = z_index;
}

// 1.事件绑定；
Magnifier.prototype.bindEvent = function() {
        // 存实例对象；
        var magnifier_instance = this;
        // 鼠标移入事件
        this.wrap_small_ele.onmouseover = function() {
                magnifier_instance.toggle("show");
            }
            // 鼠标移出事件
        this.wrap_small_ele.onmouseout = function() {
                magnifier_instance.toggle("hide");
            }
            // 鼠标移动事件
        this.wrap_small_ele.onmousemove = function(evt) {
                var e = evt || event;
                magnifier_instance.move(e.offsetX, e.offsetY);
            }
            // 选项卡
        for (var j = 0; j < this.btn_eles.length; j++) {
            // 点击事件
            this.btn_eles[j].onclick = function() {
                magnifier_instance.getIndex(this);
                magnifier_instance.changeContent();
            }
        }
    }
    // 2.元素显示隐藏功能；
Magnifier.prototype.toggle = function(type) {
        switch (type) {
            case "show":
                this.focus_ele.style.display = "block";
                this.wrap_big_ele.style.display = "block";
                break;
            case "hide":
                this.focus_ele.style.display = "none";
                this.wrap_big_ele.style.display = "none";
                break;
        }
    }
    // 3.元素跟随移动功能
Magnifier.prototype.move = function(x, y) {
    var _left = x - 150;
    var _top = y - 150;
    // 边界检测：判定数据的极值；
    _left = _left < 0 ? 0 : _left;
    _top = _top < 0 ? 0 : _top;
    _left = _left > 180 ? 180 : _left;
    _top = _top > 180 ? 180 : _top;
    // 给focus定位
    this.focus_ele.style.left = _left + 'px';
    this.focus_ele.style.top = _top + 'px';
    // 大图运动：
    // 先计算小图left值和top的运动比例；
    // left/运动的最大值；
    var _left_prop = _left / 100;
    var _top_prop = _top / 100;

    // 根据比例让大图运动
    this.big_img_one.style.left = -250 * _left_prop + 'px';
    this.big_img_one.style.top = -250 * _top_prop + 'px';

    this.big_img_tow.style.left = -250 * _left_prop + 'px';
    this.big_img_tow.style.top = -250 * _top_prop + 'px';
}

// 4.下标
Magnifier.prototype.getIndex = function(dom) {
        for (var j = 0; j < this.btn_eles.length; j++) {
            if (dom === this.btn_eles[j]) {
                this.z_index = j;
                break;
            }
        }
    }
    //5.清空class 通过下标添加active_m
Magnifier.prototype.changeContent = function() {
    // 先清空再给对应的元素赋值；
    for (var j = 0; j < this.btn_eles.length; j++) {
        this.removeClass(this.btn_eles[j], "active_m");
        this.removeClass(this.wrap_small_img[j], "active_m");

        this.removeClass(this.big_img[j], "active_m");

    }
    this.btn_eles[this.z_index].className += " active_m";
    this.wrap_small_img[this.z_index].className += " active_m";

    this.big_img[this.z_index].className += " active_m";
}

//6. 删除类名
Magnifier.prototype.removeClass = function(dom, className) {
    var reg = new RegExp("\\s?" + className);
    dom.className = dom.className.replace(reg, "");
}

new Magnifier().bindEvent();
// 放大镜结束
// tab栏切、换
$(function() {
        // 绑定点击事件
        $('.btn_lft').find('button').click(function() {
            // 获取索引
            var index_m1 = $(this).index();
            // 给当前触发元素添加color_m 并且删除兄弟级的color_m 
            $(this).addClass('color_m ').siblings().removeClass('color_m ');
            // 设置当前触发元素的显示及兄弟级的隐藏
            $('.bm_mox').find('.box').eq(index_m1).show().siblings().hide();
        })
    })
    // tab栏切、换结束

// 回到顶部
var ding_m = document.querySelector(".ding_m");
ding_m.onclick = function() {
        scrollTo({
            top: 0,
            //    缓慢向上
            behavior: 'smooth'

        })
    }
    // 回到顶部结束