(function(that){
    function Color(callback){
        this.red = 255
        this.green = 0
        this.blue = 0
        this.gRed = 0
        this.gGreen = 0
        this.gBlue = 0
        this.seven = 1 / 7
        this.pos = 0.5
        this.colorTop = 0
        this.colorLeft = 0
        this.colorSave = new Array(5).fill('')
        this.callback = callback
        this.create()
    }
    Color.prototype.create = function(){
        var out = document.createElement('div'),
        color = document.createElement('canvas'),
        circle = document.createElement('canvas'),
        light = document.createElement('canvas'),
        sure = document.createElement('div'),
        line = document.createElement('div'),
        refuse = document.createElement('div'),
        group = document.createElement('div')
        show = document.createElement('div')

        var ctx = color.getContext('2d'),
        ctx1 = light.getContext('2d'),
        R = circle.getContext('2d'),
        that = this

        out.style.cssText = `position: absolute;
        top:10px;
        left:10px;
        border:2px solid #888;
        border-radius:10px;
        width:560px;
        height:300px;
        background:#eee;
        padding:10px;`
        show.style.cssText = `position:absolute;
        width:50px;
        height:30px;
        top:275px;
        left:260px;`
        line.style.cssText = `position:absolute;
        width:0;
        height:0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 10px solid ;
        left:555px;
        top:132.5px`
        circle.style.cssText = `position:absolute;top:10px;left:10px`
        sure.style.cssText = `border-radius:4px;
        width:100px;
        height:30px;
        border:1px solid #c0c0c0;
        text-align: center;
        line-height:30px;
        position:absolute;
        top:275px;
        right:140px;
        cursor:pointer`
        sure.textContent = '确定'
        refuse.style.cssText = `border-radius:4px;
        width:100px;
        height:30px;
        border:1px solid #c0c0c0;
        text-align: center;
        line-height:30px;
        position:absolute;
        top:275px;
        right:30px;
        cursor:pointer`
        group.style.cssText = `width:200px;
        height:30px;
        position:absolute;
        top:275px;
        left:30px;`
        function a(){
            group.innerHTML = ''
            for(let i = 0; i < 5; i++){
                var child = document.createElement('div')
                child.style.cssText = `width:30px;
                height:30px;
                margin:0 5px 0 5px;
                float:left`
                child.style.background = that.colorSave[i].value || '#fff'
                child.onclick = function(){
                    show.style.background = that.colorSave[i].value
                    var str = that.colorSave[i].value.match(/\((.+?)\)/g)[0]
                    str = str.slice(1, str.length - 1).split(',')
                    that.gRed = ~~str[0]
                    that.gGreen = ~~str[1]
                    that.gBlue = ~~str[2]
                    that.colorTop = that.colorSave[i].pos[0]
                    that.colorLeft = that.colorSave[i].pos[1]
                    ctx1.fillStyle = that.add()
                    ctx1.fillRect(0, 0, 255 * 2, 255)
                    R.clearRect(0, 0, 510, 255)
                    R.strokeStyle = 'black'
                    R.beginPath();
                    R.arc(that.colorLeft, that.colorTop, 5, 0, Math.PI*2, true );
                    R.closePath();
                    R.stroke()
                    ctx1.beginPath();
                    ctx1.moveTo(0, that.colorSave[i].pos[2])
                    ctx1.lineTo(30, that.colorSave[i].pos[2])
                    line.style.top = that.colorSave[i].pos[2] + 5 + 'px'
                    ctx1.closePath();
                    ctx1.stroke()
                }
                group.appendChild(child)
            }
        }
        function repeat(that){
            for(let i in that.colorSave){
                if(!that.colorSave[i]){
                    break
                }
                var str = that.colorSave[i].value.match(/\((.+?)\)/g)[0]
                str = str.slice(1, str.length - 1).split(',')
                if(that.gRed == ~~str[0]&&
                that.gGreen == ~~str[1]&&
                that.gBlue == ~~str[2]){
                    return false
                }
            }
            return true
        }
        a()
        refuse.textContent = '取消'
        color.width = circle.width = 510
        color.height = circle.height = 255
        light.width = 30
        light.height = 255
        out.appendChild(color)
        out.appendChild(circle)
        out.appendChild(light)
        out.appendChild(line)
        out.appendChild(sure)
        out.appendChild(refuse)
        out.appendChild(group)
        out.appendChild(show)
        document.body.appendChild(out)
        var ui=ctx.createImageData(510,255)
        ui.data.set(this.generate())
        ctx.putImageData(ui,0,0)
        ctx1.fillStyle = 'red'
        ctx1.fillRect(0, 0, 510, 255)
        ctx1.beginPath();
        ctx1.strokeStyle = R.strokeStyle = '#000'
        ctx1.moveTo(0, 127.5)
        ctx1.lineTo(30, 127.5)
        ctx1.closePath();
        ctx1.stroke()
        R.beginPath();
        R.arc(0, 127.5, 5, 0, Math.PI*2, true );
        R.closePath();
        R.stroke()
        show.style.background = 'red'
        sure.addEventListener('click', function(){
            if(repeat(that))
            that.colorSave = that.colorSave.unshift({value:that.add(),
            pos:[that.colorTop, that.colorLeft, that.pos * 255]}) > 5? that.colorSave.slice(0, 5): that.colorSave
            document.body.removeChild(out)
            that.__proto__.show = (function(out){
                return function(){
                    a()
                    document.body.appendChild(out)
                }
            })(out)
            that.callback({rgb:that.add(), value:that.hex()})
        })
        refuse.addEventListener('click', function(){
            document.body.removeChild(out)
            that.__proto__.show = (function(out){
                return function(){
                    a()
                    document.body.appendChild(out)
                }
            })(out)
        })
        circle.addEventListener('mousedown',function(){
            circle.onmousemove = (e) => {    
                // ctx.clearRect(0, 0, 510, 255)
                var pos = e.offsetX / 510
                that.pos = e.offsetY / 255
                that.colorTop = e.offsetY
                that.colorLeft = e.offsetX
                that.chooseColor(pos)
                ctx1.fillStyle = that.add()
                ctx1.fillRect(0, 0, 255 * 2, 255)
                R.clearRect(0, 0, 510, 255)
                R.strokeStyle = 'black'
                R.beginPath();
                R.arc(e.offsetX, e.offsetY, 5, 0, Math.PI*2, true );
                R.closePath();
                R.stroke()
                ctx1.beginPath();
                ctx1.moveTo(0, e.offsetY)
                ctx1.lineTo(30, e.offsetY)
                line.style.top = e.offsetY + 5 + 'px'
                ctx1.closePath();
                ctx1.stroke()
                show.style.background = that.add()
            }
        })
        circle.addEventListener('mouseup',function(){
            circle.onmousemove = null
            
        })
        circle.addEventListener('mouseout',function(){
            circle.onmousemove = null
        })
        light.addEventListener('mousedown',function(){
            light.onmousemove = function(e){    
                // ctx.clearRect(0, 0, 510, 255)
                var pos = e.offsetY / 255
                that.chooseGray(pos)
                ctx1.fillStyle = that.add()
                ctx1.fillRect(0, 0, 255 * 2, 255)
                ctx1.strokeStyle = 'black'
                ctx1.beginPath();
                line.style.top = e.offsetY + 5 + 'px'
                ctx1.moveTo(0, e.offsetY)
                ctx1.lineTo(30, e.offsetY)
                ctx1.closePath();
                ctx1.stroke()
                R.clearRect(0, 0, 510, 255)
                R.strokeStyle = 'black'
                R.beginPath();
                R.arc(that.colorLeft, e.offsetY, 5, 0, Math.PI*2, true );
                R.closePath();
                R.stroke()
                show.style.background = that.add()
            }
        })
        light.addEventListener('mouseup',function(){
            light.onmousemove = null
            
        })
        light.addEventListener('mouseout',function(){
            light.onmousemove = null
        })
    }

    Color.prototype.drawColor = function(R,ctx1){
    }

    Color.prototype.show = function(){

    }

    Color.prototype.add = function(){
        return `rgb(${this.gRed},${this.gGreen},${this.gBlue})`
    }

    Color.prototype.hex = function(){
        function check(x){
            if(x == '0') return '00'
            return x
        }
        return '#' + check(this.gRed.toString(16)) + check(this.gGreen.toString(16)) + check(this.gBlue.toString(16))
    }

    Color.prototype.chooseColor = function(pos){
        var seven = this.seven
        var d = (pos % seven) / seven
        var check = ~~(pos / seven)
        if(check == 1){
            this.green = ~~(d * 255)
            this.red = 255
            this.blue = 0
        }else if(check == 4){
            this.green = 255 - ~~(d * 255)
            this.blue = 255
            this.red = 0
        }else if(check == 5){
            this.red = ~~(d * 255)
            this.blue = 255
            this.green = 0
        }else if(check == 2){
            this.red = 255 - ~~(d * 255)
            this.green = 255
            this.blue = 0
        }else if(check == 3){
            this.blue = ~~(d * 255)
            this.green = 255
            this.red = 0
        }else if(check == 6){
            this.blue = 255 - ~~(d * 255)
            this.red = 255
            this.green = 0
        }else{
            this.red = ~~(d * 255)
            this.green = 0
            this.blue = 0
        }
        this.chooseGray(this.pos)
    }

    Color.prototype.generate = function(){
        var result = []
        for(let i = 0; i < 255; i++){
            for(let j = 0; j < 510; j++){
                this.pos = i / 255
                this.chooseColor(j / 510)
                result.push(this.gRed, this.gGreen, this.gBlue,255)
            }
        }
        this.red = 255
        this.green = 0
        this.blue = 0
        this.gRed = 0
        this.gGreen = 0
        this.gBlue = 0
        this.seven = 1 / 7
        this.pos = 0.5
        this.colorTop = 0
        this.colorLeft = 0
        return result
    }
    Color.prototype.checkLow = function(value,percent){
        var d = value - ~~(value * percent)
        return d < 0? 0 : d
    }
    Color.prototype.checkTop = function(value,percent){
        var d = value + ~~((255 - value) * percent)
        return d > 255? 255 : d
    }
    Color.prototype.chooseGray = function(pos = 0.5){
        var check
        this.pos = pos
        if(pos > 0.5){
            pos = pos - 0.5
            check = pos / 0.5
            this.gRed = this.checkLow(this.red, check)
            this.gGreen = this.checkLow(this.green, check)
            this.gBlue = this.checkLow(this.blue, check)
        }else{
            pos = 0.5 - pos
            check = pos / 0.5
            this.gRed = this.checkTop(this.red, check)
            this.gGreen = this.checkTop(this.green, check)
            this.gBlue = this.checkTop(this.blue, check)
        }
    }
    that.Color = Color
})(this)