/**
 *  
 *  ^技能
 *
 */

class Skill{
    constructor(wrap,randomArea){
        //? 界面
        this.wrap  = wrap;
        
        //? 随机
        this.randomArea = randomArea;
        this.skill_img = ['drop_0','drop_1'];
    }
    render(){
        let skill = this.skill_img[this.randomArea(0,this.skill_img.length-1)];
        let div = document.createElement('div');
        div.className = 'prize';
        div.style.background = `url(./images/${skill}.png)center/ contain no-repeat`;

        // ?区分技能
        div.model = skill;


        // ? 技能随机位置
        div.style.left= this.randomArea(0,this.wrap.clientWidth - 50) + 'px';
        div.style.top= this.randomArea(0,this.wrap.clientHeight - 50) + 'px';

        this.wrap.appendChild(div)

        div.timer = setTimeout(() => {
            div.remove();
        }, 3000);
    }  
}