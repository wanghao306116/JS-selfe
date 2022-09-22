/**
 *
 * ^ 游戏对象
 *
 */
class Game{
    constructor(Plane,Enemy,wrap,Skill){
        
        this.gameOver = this.gameOver.bind(this);

        // ? 飞机对象
        this.plane = new Plane(wrap,this.isDang,this.boom);

        // ! 敌机对象 
        this.Enemy = new Enemy(wrap,this.isDang,this.boom,this.gameOver,this.randomArea);

        // ? 技能对象
        this.skill = new Skill(wrap,this.randomArea);
        //界面
        this.wrap = wrap;
         
        // ? 生成子弹的cd
        this.fireSpeed = [200,500,800,1000];

        // ? 生成敌机的cd
        this.enemySpeed = 1000; 

        // ? 生成敌机的ID
        this.fireTimerID = null; 

        // 生成子弹的ID
        this.enemyTimerID = null;

        // 生成技能的ID
        this.skillTimerID = null;

        // - 1.初始化页面
        this.init()  
    } 
    init(){
        let opt = ['简单模式','一般模式','困难模式','地狱模式']
        let h1 = document.createElement('h1');
        h1.innerHTML = '飞机大战-基岩版';
        this.wrap.appendChild(h1);

        for(let i = 0; i<opt.length;i++){
            let div = document.createElement('div');
            div.className = 'option';
            div.innerText = opt[i];
            div.addEventListener('click',() => {
                 //  - 2.开始游戏
                this.startGame(i)

                
            },false)
            this.wrap.appendChild(div); 
        }

    }
    // ? 开始游戏
    startGame(dix){
        // - 清理页面
        this.wrap.innerHTML = '';
        // ! 该背景
        this.wrap.className = 'bg'+(dix + 1);

        // ? 生成战机
        this.plane.render();

        // ! 生成敌机
        // this.Enemy.render(this.wrap);
        this.randomEnemy();

        // ? 拖拽战机
        this.runPlane();

        // ? 生成子弹
        this.fire(dix);

        //? 技能
        this.randomSkill();

        //? 分数
        this.showScore();

        //?背景图的移动
        this.moveBackground();
        
        // !! 背景音乐
        let audio = document.createElement('audio');
        audio.src = `./audio/game_music.mp3`;
        audio.autoplay = true; // ? 自动播放
        audio.loop = true;      //? 循环播放 
        audio.volume = 0.3;     //? 音量
        this.wrap.appendChild(audio);


    } 
   
    // ? 飞机移动
    runPlane(){
        document.addEventListener('mousemove',this.plane.drag, false)
    }
 
    //? 生成子弹
    fire(dix){
        let audio = document.createElement('audio');
        audio.autoplay = true;
        audio.volume = audio.srt = `./audio/bullet.mp3` ? 0.5 : 1; 
        audio.loop = false;
        this.wrap.appendChild(audio);
        
        this.fireTimerID = setInterval(() => {


            audio.src = this.plane.count > 1 ? `./audio/enemy2_out.mp3` :  `./audio/bullet.mp3`;

            for (let i = 0; i < this.plane.count; i++) {
                this.plane.renderBiu(i)
            }

        }, this.fireSpeed[dix]);
    }

    // ? 随机生成敌机
    randomEnemy(){
        this.enemyTimerID = setInterval(() => {
            this.Enemy.render()
        }, this.enemySpeed);
    }

    //?随机生成能
    randomSkill(){
        this.skillTimerID = setInterval(() => {
            this.skill.render()
        }, 6000);
    }

    // ? 背景图移动
    moveBackground(){
        let count = 0;
        let move = () => {
            count += 0.4;
            this.wrap.style.backgroundPositionY = count + 'px';
            requestAnimationFrame(move);
        }
        move()
    }

    // !! 碰撞检测 
    isDang(origin,target){

        let originLeft = origin.offsetLeft,
            originRight = originLeft + origin.clientWidth,
            originTop = origin.offsetTop,
            originBotton = originTop+origin.clientHeight;

        let targetLeft = target.offsetLeft,
            targetRight = targetLeft + target.clientWidth,
            targetTop = target.offsetTop,
            targetBotton = targetTop+target.clientHeight;

        // ! 但凡碰撞了 以下语句都会返回false
        return !(originRight < targetLeft || originLeft >targetRight || 
        originBotton < targetTop || originTop > targetBotton)
    
      
  
    }

    // ! 爆炸
    boom(obj){
        let img = new Image();
        img.className = 'boom';
        img.src = `./images/boom_${obj.model}.png`;
        img.width = obj.clientWidth;
        img.height = obj.clientHeight;
        img.style.left = obj.offsetLeft + 'px';
        img.style.top = obj.offsetTop + 'px';

        //结束 爆炸对象的动画
        cancelAnimationFrame(obj.timer);

        obj.remove();

        this.wrap.appendChild(img);

        img.addEventListener('webkitAnimationEnd',()=>{
            img.remove()
        },false);
        // ! 爆炸音效
        let audio = document.createElement('audio');
        audio.autoplay = true;
        audio.loop = false;
        audio.volume = 0.3;
        audio.src = './audio/enemy3_down.mp3';
        // ? 删除爆炸音效
        audio.addEventListener('ended',() => {
            audio.remove();
        },false)
        this.wrap.appendChild(audio);
    }

    //? 分数
    showScore(){
        let span = document.createElement('span');
        span.innerText = this.wrap.score = 0;
        span.className = 'score';
        this.wrap.appendChild(span)
    }
    


    // ! 游戏结束
    gameOver(){
        //清除生成子弹的定时器
        clearInterval(this.fireTimerID);
        //清除生成敌机的定时器
        clearInterval(this.enemyTimerID);
        //清除生成技能的定时器
        clearInterval(this.skillTimerID);


        // ! 游戏结束音效
        let audio = document.createElement('audio');
        audio.autoplay = true;
        audio.loop = false;
        audio.src = './audio/game_over.mp3';
        audio.volume = 0.5;
        audio.addEventListener('ended',() => {
            audio.remove();
        },false)
        this.wrap.appendChild(audio);

        setTimeout(() => {
            this.gameOverView()
        }, 2000);

    }

    // ? 游戏结束界面
    gameOverView(){
        this.wrap.innerHTML = '';

        let div = document.createElement('div');
        let div2 = document.createElement('div');

        div.className = 'record';
        div.innerHTML = "最终得分:<p>" + this.wrap.score + "</p>";
        div2.className = 'btn';
        div2.innerHTML = '再来一次';

        div2.addEventListener('click', ()=>{
            this.wrap.innerHTML = '';
            this.init()
        },false);

        this.wrap.appendChild(div);
        this.wrap.appendChild(div2);
    }


    // ! 随机
    randomArea(a,b){
        return Math.floor(Math.random() *(b + 1 - a) + a);
    }

}

