# textarea高度自适应插件

textarea默认是无法高度自适应的，css解决不了的问题，就靠js来解决了。此插件支持textarea的自适应高度，可设置最大高度，内容超出后显示滚动条。


## 使用方法

e.g.
```
$('textarea').tah(200);   // textarea的最大高度
```

在使用的页面中引入jQuery和此插件，对要使用的textarea调用tah方法，传入参数，设置属性值maxHeight(textarea最大高度)即可。
