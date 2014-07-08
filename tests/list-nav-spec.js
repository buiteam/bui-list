var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  List = require('../index').SimpleList;


// describe('list nav', function(){

//   var KeyCode = BUI.KeyCode,
//     items = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},{text:"数字值",value:3}];

//   $('<div class="container"></div>').prependTo('body');

//   describe('list key navigation',function(){

//     describe('single column',function(){
//       var node = $('<section></section>').appendTo('.container'),
//         list = new List({
//           render : node,
//           elCls:'bui-select-list',
//           focusable : true,
//           items : BUI.cloneObject(items)
//         });
//       list.render();

//       describe('no item highlighted',function(){

//         it('get left item',function(){
//           expect(list._getLeftItem()).to.be(null);
//         });
//         it('get right item',function(){
//           expect(list._getRightItem()).to.be(null);
//         });
//         it('get down item',function(){
//           var item = list._getDownItem();
//           expect(item).to.be(list.getFirstItem());
//         });
//         it('get up item',function(){
//           var item = list._getUpperItem();
//           expect(item).to.be(list.getLastItem());
//         });
//       });
//       var el = list.get('el');
//       it('test key left',function(done){
//         list.set('focused', true);
//         el.trigger('keydown', {which: KeyCode.LEFT});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(null);
//           done();
//         }, 200);
//       });
//       it('test key right',function(done){
//         el.trigger('keydown', {which: KeyCode.RIGHT});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(null);
//           done();
//         }, 200);
//       });
//       it('test key down',function(done){
//         el.trigger('keydown',{which : KeyCode.DOWN});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getFirstItem());
//           done()
//         }, 200);
//       });
//       it('test key up',function(done){
//         el.trigger('keydown',{which : KeyCode.UP});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getLastItem());
//           done()
//         }, 200);
//       });
//       it('test key enter',function(done){
  
//         el.trigger('keydown',{which : KeyCode.ENTER});
//         setTimeout(function(){
//           expect(list.getSelected()).to.be(list.getLastItem());
//           done();
//         }, 200);
//       });
//     });

//     describe('multiple columns',function(){

//       var items = [{id : '1',text : '1'},{id : '2',text : '2'},{id : '3',text : '3'},{id : '4',text : '4'},{id : '5',text : '5'},{id : '6',text : '6'},{id : '7',text : '7'}],
//         node = $('<section></section>').appendTo('.container'),
//         list = new List({
//           render : node,
//           idField : 'id',
//           elCls : 'column-3 bui-select-list',
//           focusable : true,
//           items :items
//         });
//       list.render();
//       var el = list.get('el');
//       describe('no item highlighted',function(){

//         it('get left item',function(){
//           list.set('focused',true);
//           expect(list._getLeftItem()).to.be(list.getLastItem());
//         });
//         it('get right item',function(){
//           expect(list._getRightItem()).to.be(list.getFirstItem());
//         });
//         it('get down item',function(){
//           var item = list._getDownItem();
//           expect(item).to.be(list.getFirstItem());
//         });
//         it('get up item',function(){
//           var item = list._getUpperItem();
//           expect(item).to.be(list.getLastItem());
//         });
//       });

//       it('test key down',function(){
//         el.trigger('keydown',{which : KeyCode.DOWN});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getFirstItem());
//         });
//       });

//       it('test key up',function(){
//         el.trigger('keydown',{which : KeyCode.UP});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getLastItem());
//         });
//       });

//       it('test key left',function(){
//         var item = list.getHighlighted(),
//           index = list.indexOfItem(item);
//         el.trigger('keydown',{which : KeyCode.LEFT});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getItemAt(index - 1));
//         });
//       });

//       it('test key left again',function(){
//         var item = list.getHighlighted(),
//           index = list.indexOfItem(item);
//         el.trigger('keydown',{which : KeyCode.LEFT});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getItemAt(index - 1));
//         });
//       });

//       it('test key right',function(){
//         var item = list.getHighlighted(),
//           index = list.indexOfItem(item);
//         el.trigger('keydown',{which : KeyCode.RIGHT});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getItemAt(index + 1));
//         });
        
//       });

//       it('test key right agin',function(){
//         el.trigger('keydown',{which : KeyCode.RIGHT});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getLastItem());
//         });
//       });


//       it('test key enter',function(){
//         el.trigger('keydown',{which : KeyCode.ENTER});
//         setTimeout(function(){
//           expect(list.getSelected()).to.be(list.getLastItem());
//         });
//       });

//       it('test key tab',function(){
//         el.trigger('keydown',{which : KeyCode.TAB});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getFirstItem());
//         });
//       });

//       it('test key down',function(){
//         var item = list.getItem('5');
//         list.setHighlighted(item);
//         expect(list.getHighlighted()).to.be(item);

//         el.trigger('keydown',{which : KeyCode.DOWN});
//         setTimeout(function(){
//           expect(list.getHighlighted()).to.be(list.getItemAt(1));
//         });
//       });
//     })
//     describe('when key nav,selected change',function(){
//       var items = [{id : '1',text : '1'},{id : '2',text : '2'},{id : '3',text : '3'},{id : '4',text : '4'},{id : '5',text : '5'},{id : '6',text : '6'},{id : '7',text : '7'}],
//         node = $('<section></section>').appendTo('.container'),
//         list = new List({
//           render : node,
//           idField : 'id',
//           elCls : 'column-3 bui-select-list',
//           focusable : true,
//           highlightedStatus : 'selected',
//           items :items
//         });
//       list.render();
//       var el = list.get('el');
//       it('test key down',function(){
//         el.trigger('keydown',{which : KeyCode.DOWN});
//         setTimeout(function(){
//           expect(list.getSelected()).to.be(list.getFirstItem());
//         });
//       });

//       it('test key up',function(){
//         el.trigger('keydown',{which : KeyCode.UP});
//         setTimeout(function(){
//           expect(list.getSelected()).to.be(list.getLastItem());
//         });
//       });

//       it('test key left',function(){
//         var item = list.getSelected(),
//           index = list.indexOfItem(item);
//         el.trigger('keydown',{which : KeyCode.LEFT});
//         setTimeout(function(){
//           expect(list.getSelected()).to.be(list.getItemAt(index - 1));
//         });
//       });

//       it('test key left again',function(){
//         var item = list.getSelected(),
//           index = list.indexOfItem(item);
//         el.trigger('keydown',{which : KeyCode.LEFT});
//         setTimeout(function(){
//           expect(list.getSelected()).to.be(list.getItemAt(index - 1));
//         });
//       });

//       it('test key right',function(){
//         var item = list.getSelected(),
//           index = list.indexOfItem(item);
//         el.trigger('keydown',{which : KeyCode.RIGHT});
//         setTimeout(function(){
//           expect(list.getSelected()).to.be(list.getItemAt(index + 1));
//         });
        
//       });

//       it('test key right agin',function(){
//         el.trigger('keydown',{which : KeyCode.RIGHT});
//         setTimeout(function(){
//           expect(list.getSelected()).to.be(list.getLastItem());
//         });
//       });

//       it('test key tab',function(){
//         el.trigger('keydown',{which : KeyCode.TAB});
//         setTimeout(function(){
//           expect(list.getSelected()).to.be(list.getFirstItem());
//         });
//       });
//     });

//   });
// });

describe('测试键盘操作',function(){
  var KeyCode = BUI.KeyCode,
    items = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},
    {text:'选项11',value:'a11'},{text:'选项12',value:'a2'},{text:'选项13',value:'a3'},{text:'选项14',value:'a4'},
    {text:'选项111',value:'a111'},{text:'选项121',value:'a21'},{text:'选项131',value:'a31'},{text:'选项15',value:'a5'}];

  var list = new List({
    render : '#l8',
    height:150,
    elCls:'bui-select-list',
    items : items
  });
  list.render();

  describe('键盘操作，阻止默认窗口滚动',function(){

    it('向上',function(){

    });

    it('向下',function(){

    });
  });

  describe('键盘操作,列表滚动条',function(){

  });
});
