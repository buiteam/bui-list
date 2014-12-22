var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Data = require('bui-data'),
  List = require('../index');

require('bui-dpl/css/bs3/dpl.css');
require('bui-dpl/css/bs3/bui.css');


$('<div class="row"><div  id="list1" class="span8"></div><div  id="list2" class="span8"></div><div  id="list3" class="span8"></div></div>').prependTo('body');

describe('SimpleList', function(){

  var items = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},{text:"数字值",value:3}],
    list = new List.SimpleList({
    elCls:'bui-select-list',
    render : '#list1',

    items : items,
    itemTpl : '<li><a href="#" title="{value}">{text}</a></li>'
  });
  list.render();
  var el = list.get('el');

  describe('测试列表初始化',function(){

    it('测试项的生成',function(){
      expect(el.find('.bui-list-item').length).to.be(items.length);
    });

    it('测试模板',function(){
      expect(el.find('a').length).to.be(items.length);
    });
    
  });

  describe('测试单选',function(){

    it('测试单选选中',function(){
      list.setSelectedByField('a');
      expect(list.getSelectedValue()).to.be('a');
      expect(list.getSelected().value).to.be('a');

      list.setSelectedByField('b');
      expect(list.getSelectedValue()).to.be('b');
      expect(list.getSelected().value).to.be('b');
      expect(list.getSelection().length).to.be(1);
    });
    
    it('测试清理选中',function(){
      list.setSelectedByField('b');
      list.clearSelected();
      expect(list.getSelection().length).to.be(0);
      
      list.setSelectedByField('b');
      list.clearSelection();
      expect(list.getSelection().length).to.be(0);
    });

    it('测试选中数字项',function(){
      list.setSelectedByField(3);
      expect(list.getSelectedValue()).to.be(3);
    });

    it('测试点击',function(){
      var item = null,
        callbackSpy = sinon.spy(),
        callback = function(ev){
          item = ev.item;
          callbackSpy();
        };

      list.on('itemclick', callback);

      var dom = list.findElement(list.getItemAt(0));
      $(dom).trigger('click');

      expect(item).to.be(list.getSelected());
      expect(callbackSpy.called).to.be(true);
    });
  });

  describe('测试多选',function(){
    it('测试多选',function(){
      list.clearSelection();
      list.set('multipleSelect',true);

      list.setSelectedByField('a');
      list.setSelectedByField('b');

      expect(list.getSelection().length).to.be(2);
    });
  });

  describe('更改选项集合',function(){
    var items1 = [{text:'选项1',value:'a'},{text:'选项2',value:'b'}];
    it('测试生成列表项',function(){
      list.setSelectedByField('a');

      list.set('items',items1);
      expect(el.find('.bui-list-item').length).to.be(items1.length);
      expect(list.getSelection().length).to.be(0);
    });

    it('测试更改列表',function(){
      list.setItems(BUI.cloneObject(items));
      expect(list.getItems().length).to.be(items.length);
      list.setItems(items1);
    });
    it('添加列表项',function(){
      var item = {text:'添加项',value:'new'}
      list.addItem(item);
      expect($.inArray(item,items1)).not.to.be(-1);
      expect(el.find('.bui-list-item').length).to.be(items1.length);
    });

    it('添加多项',function(){
      var items = [{text:'添加项',value:'new'},{text:'添加项',value:'new'}],
        count = list.getItemCount();
      list.addItems(items);
      expect(list.getItemCount()).to.be(count + items.length);
      expect(el.find('.bui-list-item').length).to.be(items1.length);

      list.removeItems(items);
      expect(list.getItemCount()).to.be(count);
    });

    it('删除列表项',function(){
      var item = items1[1];
      list.removeItem(item);
      expect($.inArray(item,items1)).to.be(-1);
      expect(el.find('.bui-list-item').length).to.be(items1.length);
    });

  });

  describe('测试事件',function(){
    it('测试选中改变',function(){
      list.clearSelection();

      var selectCallback = sinon.spy();
      list.on('itemselected',selectCallback);
      list.setSelectedByField('a');
      expect(selectCallback.called).to.be(true);
    });
  });

});



describe('List', function(){

  var items = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},{text:"数字值",value:3}],
    list = new List.List({
    elCls:'bui-select-list',
    render : '#list2',
    idField:'value',
    items : items
  });
  list.render();
  var el = list.get('el');

  describe('测试列表初始化',function(){

    it('测试项的生成',function(){
      expect(el.find('.bui-list-item').length).to.be(items.length);
    });
    
  });

  describe('测试单选',function(){

    it('测试单选选中',function(){
      list.setSelectedByField('a');
      expect(list.getSelectedValue()).to.be('a');
      expect(list.getSelected().get('value')).to.be('a');

      list.setSelectedByField('b');
      expect(list.getSelectedValue()).to.be('b');
      expect(list.getSelected().get('value')).to.be('b');
      expect(list.getSelection().length).to.be(1);
    });
    
    it('测试清理选中',function(){
      list.clearSelection();
      expect(list.getSelection().length).to.be(0);
    });

    it('测试选中数字项',function(){
      list.setSelectedByField(3);
      expect(list.getSelectedValue()).to.be(3);
    });

    it('测试点击选项',function(){
      var item = list.getFirstItem();
      item.fire('click');
      expect(list.getSelected()).to.be(item);
      expect(item.get('el').hasClass('bui-list-item-selected')).to.be(true);
    });
  });

  describe('测试多选',function(){
    it('测试多选',function(){
      list.clearSelection();
      list.set('multipleSelect',true);

      list.setSelectedByField('a');
      list.setSelectedByField('b');

      expect(list.getSelection().length).to.be(2);
    });
  });

  describe('更改选项集合',function(){
    var items1 = [{text:'选项1',value:'a'},{text:'选项2',value:'b'}];
    it('测试生成列表项',function(){
      list.setSelectedByField('a');

      list.set('items',items1);
      expect(el.find('.bui-list-item').length).to.be(items1.length);
      expect(list.getSelection().length).to.be(0);
    });


    it('添加列表项',function(){
      var count = list.get('children').length,
        item = {text:'添加项',value:'new'}
      list.addItem(item);
      expect(el.find('.bui-list-item').length).to.be(count+1);
    });

    it('插入列表项',function(){
      var count = list.get('children').length,
        item = {text:'添加项',value:'new',id:'121'}
      list.addItemAt(item,0);
      expect(list.getItems()[0].get('id')).to.be(item.id);
      expect(el.find('.bui-list-item').length).to.be(count+1);
    });

    it('删除列表项',function(){
      var item = list.findItemByField('value','b'),
        count = list.get('children').length;

      list.removeItem(item);
      expect(el.find('.bui-list-item').length).to.be(count - 1);
    });
  });

  describe('测试事件',function(){
    it('测试选中改变',function(){
      list.clearSelection();

      var selectCallback = sinon.spy();
      list.on('itemselected',selectCallback);
      list.setSelectedByField('a');
      expect(selectCallback.called).to.be(true);
    });

  });

});
/**/

$('<div class="row"><div  id="listCheck" class="span8"></div><div  id="lb1" class="span8"></div></div>').prependTo('body');

describe('测试模板', function(){

  var items = [{id:123,text:'选项1',value:'a'},{id:234,tpl:'<span>{text}</span>',text:'选项2',value:'b'},
    {id:455,text:'选项3',tplRender:function(data){return data.value;},value:'c'},
    {id:222,text:"数字值",value:3},{id:125,text:'选项4',value:'d'},{id:128,text:'选项5',value:'d'}],
    list = new List.List({
    elCls:'bui-select-list',
    render : '#listCheck',
    idField:'id',
    itemTpl : '<span class="badge badge-error">{id}</span>  <span>{text}</span>',
    children : BUI.cloneObject(items)
  });
  list.render();

  describe('测试模板',function (){
    var children = list.get('children');
    it('测试初始化模板',function(){
      var 
        firstNode = children[0],
        secondNode = children[1];
      expect(firstNode).not.to.be(undefined);
      expect(firstNode.get('el').find('.badge').length).not.to.be(0);
      expect(firstNode.get('el').find('.badge').text()).to.be(items[0].id.toString());
      expect(secondNode.get('el').find('.badge').length).to.be(0);
    });
    it('更改第一个对象的模板',function(){
      var firstNode = children[0];
      firstNode.set('tpl','<span>{text}</span>');
      expect(firstNode.get('el').find('.badge').length).to.be(0);  
    });
    it('测试模板渲染函数',function(){
      var thirdNode = children[2];
      expect(thirdNode.get('el').text()).to.be(thirdNode.get('value').toString());
    });
  });
});

describe('列表操作', function(){

  var items = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},{text:"数字值",value:3}]
    list = new List.SimpleList({
      elCls:'bui-select-list',
      tpl : '<div class="panel"><h2 class="panel-header">列表</h2><ul></ul></div>',
      items : items,
      cancelSelected : true,
      render : '#list3',
      idField:'value'
    });
  list.render();
  var 
    arr = [{text:'附加1',value:'f1'},{text:'附加2',value:'f2'}];

  describe('测试列表操作',function(){

    it('测试添加选项',function(){
      var count = list.getItemCount();
      list.addItem({text : '选项5',value : '5'});
      expect(list.getItemCount()).to.be(count + 1);
    });
    it('测试删除选项',function(){
      var item = list.getItem('5');
      expect(item).not.to.be(null);
      list.removeItem(item);

      item = list.getItem('5');
      expect(item).to.be(null);

    });

    it('测试更新选项',function(){
      var item = list.getItem('c');
      item.text = "修改";
      list.updateItem(item);
      expect($(list.findElement(item)).text()).to.be(item.text);
    });

    it('批量添加',function(){
      var count = list.getItemCount();
      list.addItems(arr);
      expect(list.getItemCount()).to.be(count + arr.length);

    });
    it('批量删除',function(){
       var count = list.getItemCount();
      list.removeItems(arr);
      expect(list.getItemCount()).to.be(count - arr.length);
    });

  });

  describe('测试列表自定义状态',function(){

    it('设置状态',function(){
      var item = list.getFirstItem();
      list.setItemStatus(item,'active',true);
      var element = list.findElement(item);
      expect($(element).hasClass('bui-list-item-active')).to.be(true);
    });

    it('获取设置了状态的选项',function(){
      var arr = list.getItemsByStatus('active');
      expect(arr.length).not.to.be(0);
    });

    it('取消状态',function(){
       var item = list.getFirstItem();
      list.setItemStatus(item,'active',false);
      var element = list.findElement(item);
      expect($(element).hasClass('bui-list-item-active')).to.be(false);
    });

    it('测试双击事件',function(){
      var item = list.getFirstItem(),
        callback = sinon.spy(),
        element = list.findElement(item);
      list.on('itemdblclick',callback);
      $(element).trigger('dblclick');
      expect(callback.called).to.be(true);
      list.off('itemdblclick',callback);
    });

    it('测试右键',function(){
      list.on('itemcontextmenu',function(ev){
        console.log(ev);
        return false;
      });
    });

    it('测试点击',function(){
      list.clearSelection();
      var item = list.getFirstItem(),
        element = list.findElement(item);
      $(element).trigger('click');
      expect(list.isItemSelected(item)).to.be(true);
      var callback = sinon.spy();
      list.on('selectedchange',callback);

      $(element).trigger('click');
      expect(list.isItemSelected(item)).to.be(false);
      expect(callback.called).to.be(true);
      list.off('selectedchange',callback);

    });
  });
});


describe('列表加载', function(){

  var Store = Data.Store;
    

  var items = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},{text:"数字值",value:3}],
    store = new Store({
      data:items,
      matchFunction:function(obj1,obj2){
        return obj1.value === obj2.value;
      }
    }),
    list = new List.SimpleList({
      elCls:'bui-select-list',
      render : '#list3',
      itemTpl : '<li><span class="x-radio"></span>{text}</li>',
      idField:'value',
      store:store
    });
  list.render();
  store.load();
  var el = list.get('el');

  describe('测试列表跟数据',function(){

    it('测试项的生成',function(){
      expect(el.find('.bui-list-item').length).to.be(items.length);
    });

    it('添加、删除纪录',function(){
      var item = {text:'文本',value:'d'};
      store.add(item);
      expect(el.find('.bui-list-item').length).to.be(store.getCount());
      store.remove(item);
      expect(el.find('.bui-list-item').length).to.be(store.getCount());
    });

    it('更新数据',function(){
      var text = '123';
      store.update({value:'a',text:text},true);
      list.setSelectedByField('a');
      expect(list.getSelectedText()).to.be(text);
    });

    
  });
});


describe('Listbox', function(){


  var items = [{id:1,text:'选项1',value:'a',ischeck:true},{id:4,text:'选项2',value:'b',ischeck:true},{id:2,text:'选项3',value:'c',ischeck:true},{id:3,text:"数字值",value:3}],
    list = new List.Listbox({
    elCls : 'bui-select-list',
    render : '#lb1',
    idField:'id',
    items : items
  });
  list.render();
  $('#clear').on('click',function(){
    list.clearItems();
  });
  var el = list.get('el');


  function testSelected(item,selected){
    var el = $(list.findElement(item));
    expect(el.hasClass('bui-list-item-selected')).to.be(selected);
    //expect(!!el.find('input').attr('checked')).to.be(selected);
  }
  describe('测试listBox 生成',function(){
    it('测试容器生成',function(){
      expect(el.length).not.to.be(0);
      expect(el.hasClass('bui-listbox')).to.be(true);
    });

    it('测试选项的数量',function(){
      var children = list.get('items');
      expect(items.length).to.be(children.length);

    });
    it('测试选项的生成',function(){
      var item = list.getFirstItem(),
        el = $(list.findElement(item));
      expect(item).not.to.be(null);
      expect(el.length).not.to.be(0);
      //expect(el.find('input').length).not.to.be(0);
    });
  });

  describe('测试listBox 选中',function(){
    it('测试选中一项',function(){
      var item = list.getItemAt(1),
        el = list.findElement(item);
      list.setSelected(item);
      expect(list.getSelected()).to.be(item);
      

    });

    it('测试取消选中一项',function(){
      var item = list.getSelected();
      list.clearSelected(item);
      
      expect(list.getSelected()).not.to.be(item);
      testSelected(item,false);
      
    });


    it('测试选中多项',function(){
      var arr = [];
      list.clearSelection();
      $.each(items,function(i,element){
        if(element.ischeck){
          arr.push(list.getItem(element.id));
        }
      });
      list.setSelection(arr);
      expect(list.getSelection().length).to.be(3);
    });

    it('测试清除所有选中',function(){
      list.clearSelection();
      expect(list.getSelected()).to.be(null);
    });
    
  });

  describe('测试listBox事件',function(){

    

  describe('测试listbox禁用',function(){
    it('测试点击项',function(){
      list.set('disabled',false);
      var item = list.getItem(1),
        el = $(list.findElement(item));

      el.trigger('click');
      testSelected(item, true);
      el.trigger('click');

      testSelected(item,false);

    });
    
    it('测试禁用',function(){
      list.set('disabled',true);
      var item = list.getItem(1),
        el = $(list.findElement(item));

      el.trigger('click');
      testSelected(item,false);
      el.trigger('click');
      testSelected(item,false);
    });
  });

    
  });

});/**/

describe('通过srcNode方式', function(){

  describe('list srcNode',function(){
    var node = $('<div><ul><li class="item item-active" data-id="1">1</li><li  class="item" data-id="2">2</li><li  class="item" data-id="3">3</li><li class="item" data-id="4">4</li></ul></div>').prependTo('body'),
      list = new List.SimpleList({
        srcNode : node,
        idField : 'id',
        itemStatusFields : {
          active : 'active'
        },
        itemCls : 'item'
      });
    list.render();

    it('test items',function(){
      expect(list.getCount()).to.be(node.find('.item').length);
    });

    it('test item status', function(){
      var item = list.getItem('1');
      expect(list.hasStatus(item, 'active')).to.be(true);
      expect(item.active).to.be(true);
    });
  });
});

/*
*/

