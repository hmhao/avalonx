var localStorage=localStorage||new function(){
  var that=this,prefix="localStorage";
  //创建并初始化用于存储元素
  var element=document.createElement(prefix);
  element.addBehavior("#default#userData");
  var head=document.documentElement.children[0];
  head.insertBefore(element,head.firstChild);
  //加载储存的键名
  element.load(prefix);
  var map={},keys=element.getAttribute("data-value");
  keys=new Function("return "+keys+"||[];")();
  for(var i=0;i<keys.length;i++)map[keys[i]]=0;
  this.length=i;
  //添加接口方法
  this.getItem=function(key){
    if(!(key in map))return null;
    element.load(prefix+"-"+key);
    return element.getAttribute("data-value");
  };
  this.setItem=function(key,value){
    element.setAttribute("data-value",value||"");
    element.save(prefix+"-"+key);
    key in map||updateKeys(map[key]=0);
  };
  this.removeItem=function(key){
    element.setAttribute("data-value","");
    element.save(prefix+"-"+key);
    key in map&&updateKeys(delete map[key]);
  };
  this.clear=function(key,value){
    for(var i in map)this.setItem(i,"");
    updateKeys(map={});
  };
  this.key=function(i){ return keys[i]; };
  //当键名列表改变时储存更新
  function updateKeys(){
    var result=[],key;
    keys=[];
    for(key in map)result.push(
      '"'+key.replace(/[^a-z0-9 ]/ig,function(e){
        var e=e.charCodeAt(0).toString(16);
        if(e.length%2)e="0"+e;
        return (e.length>2?"\\u":"\\x")+e;
      })+'"'
    ),keys.push(key);
    that.length=keys.length;
    element.setAttribute("data-value","["+result+"]");
    element.save(prefix);
  };
};