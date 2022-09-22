/**
 *
 * ^ 战机对象
 *
 */
class Plane{
    // * 战机
    plane = null;

    // ? 范围限制
    minTop = 0;
    maxTop = 0;
    minLeft = 0;
    maxLeft = 0;

    constructor(wrap,isDang,boom,fireSpeed){
        //  ? 游戏界面
        this.drag = this.drag.bind(this);

        this.wrap = wrap;
        // ! 碰撞检测
        this.isDang = isDang;
        // ! 爆炸 
        this.boom = boom;
 
        // ? 子弹的威力
        this.strong = 1;
        // ? 子弹的数量
        this.count = 1;

        // ? 获取敌机
        this.enePlane = document.getElementsByClassName('enemy');
        // ?  获取技能
        this.skillNode = document.getElementsByClassName('prize');

        // ?  获取界面中的分数
        this.scoreNode = document.getElementsByClassName('score');
    }

    render(){
        this.plane = document.createElement('div');
        this.plane.className = "plane small";
        let img = new Image();
        img.src = './images/plane_0.png';
        img.width = 122;
        img.height = 95;
        this.wrap.appendChild(this.plane).appendChild(img);
        this.plane.model = 'small'

        // ? 范围限制
        this.maxTop = this.wrap.clientHeight - this.plane.clientHeight;
        this.maxLeft = this.wrap.clientWidth - this.plane.clientWidth + this.plane.clientWidth / 2;
        this.minLeft = 0 - this.plane.clientWidth / 2;
    }
 
    // ? 拖拽
    drag(e){
        // 1.获取鼠标位置
        // 1.1 传入参数 e 使用 clientX/Y得到鼠标的位置
        // 1.2 使用offsetLeft offsetTop 得到 wrap 与document 的边界距离
        // 1.3 使用 clientWidth clientHeight 得到元素的宽高 / 2 就到了元素的中心位置
        let left = e.clientX - this.wrap.offsetLeft - this.plane.clientWidth/2;
        let top = e.clientY - this.wrap.offsetTop - this.plane.clientHeight/2;

        // ? 范围限制
        top = Math.max(this.minTop,top); // 限制最小值
        top = Math.min(this.maxTop,top) ;//限制最大值

        left = Math.min(this.maxLeft,left);
        left = Math.max(this.minLeft,left);

        this.plane.style.left = left + 'px';
        this.plane.style.top = top + 'px';

        // ? 吃技能
        for (let i = 0; i < this.skillNode.length; i++) {
            let skill = this.skillNode[i]; 
            if(this.isDang(this.plane,skill)){
                if(skill.model === 'drop_0'){
                    // console.log('ok');
                    
                }else if(skill.model === 'drop_1'){
                    console.log('加数量');
                    if(this.count>2){
                        // console.log('已经吃多了');
                        // e.fireSpeed - 100
                    }else{
                        this.count++
// console.log(this.fireSpeed[i]);
                    }
                }
                skill.remove();
                clearTimeout(skill.timer)
            }
        }
    }

    // ? 生成子弹
    renderBiu(i){
        let biu = new Image;
        biu.className = 'biu strong1';
        biu.src = './images/fire.png';
        this.wrap.appendChild(biu);

        // 子弹的位置
        biu.style.top = this.plane.offsetTop - biu.clientHeight + 'px';

        if(this.count === 1){
            biu.style.left = this.plane.offsetLeft + this.plane.clientWidth / 2  - biu.clientWidth / 2  + 'px';
        }else if(this.count === 2){
            biu.style.left = [this.plane.offsetLeft, this.plane.offsetLeft + this.plane.clientWidth - biu.clientWidth ][i] + 'px';
        }else if(this.count === 3){
            biu.style.left = [this.plane.offsetLeft, this.plane.offsetLeft + this.plane.clientWidth / 2  - biu.clientWidth / 2, this.plane.offsetLeft + this.plane.clientWidth - biu.clientWidth][i]  + 'px';
        }
        // - 发射子弹
        let runBiu =() => {
            

            // clearInterval(biu.timer)
            // biu.timer = setInterval(() => {
            //     runBiu()
            // },16.7);
            // biu.style.top = biu.offsetTop - 50 + 'px';

            // console.log(`6====>>>`,6);

            // ! 战机是否爆炸
            if(!this.plane.parentNode){
                return
            }  

            // ? 超出边界 
            if(biu.offsetTop <= 0){
                biu.remove()
                return
            }

            // ? 子弹和敌机碰撞
            for(let i = 0; i < this.enePlane.length; i++){
                let en = this.enePlane[i]
                if( this.isDang(biu, en) ){
                    // console.log(` ====>>>>`, '撞上了');

                    biu.remove();

                    // ? 击中敌机 改变其血量,并修改血条
                    en.strong -= this.strong;
                    // ? 所剩血量和原本血量的比值 等于 血条与血量的比值
                    en.children[0].children[0].style.width = en.strong / en.tab *  en.children[0].clientWidth + 'px';
                    // ? 爆炸
                    if(en.strong <= 0){
                        this.boom(en);
                        // if(en.model = 'small'){
                        //     this.wrap.score += en.strong
                        // }else{
                        //     this.wrap.score += en.strong
                        // }
                        this.wrap.score += en.tab;
                        // ! 改变分数
                        this.scoreNode[0].innerText = this.wrap.score;
                    }
                   
                    return
                }
            }
           
            requestAnimationFrame(runBiu);
            biu.style.top = biu.offsetTop - 5 + 'px'
        };
        runBiu();
    }
}