if(!window.plugin){
    window.plugin = {}
}
/**
 * 克隆
 * @param {*} obj 克隆的对象
 * @param {*} deep 深度克隆
 */
function clone(obj,deep){
    // 判断是否是数组
    if(Array.isArray(obj)){
        // 是否深度克隆
        if(deep){
            const newArr = [];
            for(let i = 0 ; i < obj.length; i++){
                newArr[i].push(clone(obj[i],deep));
            }
            return newArr;
        }else{
            return newArr.slice(); //复制一个数组
        }
    }else if(typeof obj === 'object'){
        const newObj = {}
        for(let prop in obj){
            // 是否深度克隆
            if(deep){
                newObj[prop] = clone(obj[prop],deep);
            }else{
                newObj[prop] = obj[prop];
            }

        }
        return newObj;
    }else{
        return obj; // 原始类型         
    }
}
/**
 * 动画插件
 * @param {*} option 配置对象
 */
plugin.Animate = function(option){
    // 默认配置
    const defaultOption = {
        direction:16, //默认间隔时间
        total:1000, //默认总时间
        begin:{}, //开始初始值
        end:{}, //结束终止值
    }
    // 最终配置
    this.option = Object.assign({},defaultOption,option);
    this.timer = null; // 定时器ID
    // 运动总次数
    this.number = Math.ceil(this.option.total / this.option.direction)
    this.curNumber = 0; //当前运动次数
    // 当前状态
    this.curData = clone(this.option.begin)
    // 所有属性运动的总距离
    this.distance = {};
    // 所有属性每次运动的距离
    this.everyDistance = {}
    for(let prop in this.option.begin){
        this.distance[prop] = this.option.end[prop] - this.option.begin[prop];
        this.everyDistance[prop] = this.distance[prop] / this.number;
    }
}
plugin.Animate.prototype.start = function(){
    if(this.timer || this.curNumber === this.number){
        return ;
    } 
    // 开始
    if(this.option.onStart){
        this.option.onStart.call(this);
    }
    this.timer = setInterval(()=>{
        this.curNumber++;
        for(let prop in this.curData){
            if(this.number === this.curNumber){
                // 最后一次运动
                this.curData[prop] = this.option.end[prop];
            }else{
                this.curData[prop] += this.everyDistance[prop];
            }
        }
        // 移动
        if(this.option.onMove){
            this.option.onMove.call(this);
        }
        // 如果等于了总次数
        if(this.number === this.curNumber){
            this.stop();
            // 结束
            if(this.option.onOver){
                this.option.onOver.call(this);
            }
        }
    },this.option.direction)
}
/**
 * 停止动画
 */
plugin.Animate.prototype.stop = function(){
    clearInterval(this.timer);
    this.timer = null;
}