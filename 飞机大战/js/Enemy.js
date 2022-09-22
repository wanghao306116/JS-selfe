/**
 *
 *
 *
 */

class Enemy{
    constructor(wrap,isDang,boom,gameOver,randomArea){
        this.wrap = wrap;
        // ! 碰撞检测
        this.isDang = isDang;
        // ! 爆炸
        this.boom = boom;
        // ! 游戏结束
        this.gameOver = gameOver;
        // ! 随机数
        this.randomArea = randomArea;
        // ! 敌机的相关信息
        this.enemyInfo = {
            // ? 大敌机
            big:{
                width:260,
                height:200,
                strong:5 // ! 大敌机的血量
            },
            // ? 小敌机
            small:{
                width:108,
                height:200,
                strong:1 // ! 小敌机的血量
            }
        }

        // ! 控制敌机降落的比例
        this.model = ['small','small','small','big']; // 1:3

        this.plane = document.getElementsByClassName('plane');
    }

    render(){
        let ene = document.createElement('div');
        let bloodBorder = document.createElement('div');
        let blood = document.createElement('p');
        let img = new Image;
        
        let model = this.model[this.randomArea(0,this.model.length-1)];


        ene.className = `enemy ${model}`;
        bloodBorder.className = 'blood';
        img.src = `./images/enemy_${model}.png`;
        img.width = this.enemyInfo[model].width;
        img.height = this.enemyInfo[model].height;

        // * 敌机的信息++++++
        // ! 区分敌机
        ene.model = model;
        // ! 敌机的速度
        ene.speed = this.randomArea(2,4);
        // ! 敌机的血量
        ene.strong = this.enemyInfo[model].strong;
        // ! 原本的血量
        ene.tab = this.enemyInfo[model].strong;

        this.wrap.appendChild(ene).appendChild(bloodBorder).appendChild(blood);
        ene.appendChild(img);

        // ! 随机位置
        ene.style.left = this.randomArea(0,this.wrap.clientWidth - ene.clientWidth) + 'px'
        
        // ! 飞机降落

        let landing = () => {
            // console.log(`11===>>>`,11);
            // console.log('ene.offsetTop',ene.offsetTop);
            // console.log(this.wrap.offsetHeight);

            // ?? 战机爆炸 中断降落
            if(!this.plane[0]){
                return
            }

            // ? 边界判断
            if(ene.offsetTop >= this.wrap.offsetHeight){
                ene.remove();
                return;
            }

            // ? 是否与战机碰撞
            if(this.isDang(ene,this.plane[0])){
                console.log('bbq');
                this.boom(ene);
                this.boom(this.plane[0]);
                // ! 游戏结束
                this.gameOver(ene);

                return
            }

            ene.timer = requestAnimationFrame(landing); 

            ene.style.top = ene.offsetTop + ene.speed + 'px';
            
        }

        landing();
    }
}