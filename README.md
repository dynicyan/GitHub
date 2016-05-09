# 弹出对话框插件及应用demo（check表单计算）
//弹出对话框插件，将几种弹出方式做一个整理归纳及样式整合，有利于网站统一性管理

### 介绍
>dy.dialog.#{弹出方式}
* alert 弹出只带确认按钮对话框 dy.dialog.alert({变量：value，变量2：value2})<br>
dy.dialog.alert({<br>
  &nbsp;&nbsp;&nbsp;&nbsp;title:"标题",<br>
  &nbsp;&nbsp;&nbsp;&nbsp;message:"内容",<br>
  &nbsp;&nbsp;&nbsp;&nbsp;width:XXX,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;height:YYY,<br>
})
* alert 显示可提示用户进行输入的对话框 dy.dialog.prompt({变量：value，变量2：value2})<br>
dy.dialog.prompt({<br>
  &nbsp;&nbsp;&nbsp;&nbsp;title:"标题",<br>
  &nbsp;&nbsp;&nbsp;&nbsp;message:"内容",<br>
  &nbsp;&nbsp;&nbsp;&nbsp;width:XXX,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;height:YYY,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;callback:function(){<br>
}
})
* alert 弹出确认取消对话框 dy.dialog.confirm({变量：value，变量2：value2})<br>
dy.dialog.confirm({<br>
  &nbsp;&nbsp;&nbsp;&nbsp;title:"标题",<br>
  &nbsp;&nbsp;&nbsp;&nbsp;message:"内容",<br>
  &nbsp;&nbsp;&nbsp;&nbsp;width:XXX,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;height:YYY,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;callback:function(){<br>
}
})
* alert 弹出含新页对话框 dy.dialog.open({变量：value，变量2：value2})<br>
dy.dialog.open({<br>
  &nbsp;&nbsp;&nbsp;&nbsp;title:"标题",<br>
  &nbsp;&nbsp;&nbsp;&nbsp;content:$('#' + id),<br>
  &nbsp;&nbsp;&nbsp;&nbsp;width:XXX,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;height:YYY,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;callback:function(){<br>
}
})

###应用实例
http://172.16.13.154:8080/js_demo/dynicyan/GitHub/slideimg/modual-dialog.html
