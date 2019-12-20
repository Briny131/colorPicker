# colorPicker
模拟取色板

```javascript
var btn = document.getElementById('btn')
    var color = new Color(function(e){
        btn.style.background = e.rgb
    })
    btn.onclick = function(){
        color.show()
    }
```

Color对象接受回调函数，使用show方法唤出取色板
子模块测试

![展示图](https://github.com/Briny131/colorPicker/blob/master/img/2019-06-10_174525.png?raw=true)
