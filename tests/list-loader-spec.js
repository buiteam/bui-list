var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  List = require('../index');

describe('测试异步加载选项',function(){

  var el = $('<div></div>').prependTo('body'),
    list = new List.List({
      render : el,
      loader : {
        url : 'data/items.json'
      }
    });

  it('测试初始化',function(done){
    expect(list.getItems().length).to.be(0);
    list.render();
    setTimeout(function(){
      expect(list.getItems().length).not.to.be(0);
      done();
    }, 200);
  });
})

describe('测试异步加载选项',function(){

  var el = $('<div></div>').prependTo('body'),
    list = new List.SimpleList({
      render : el,
      loader : {
        url : 'data/items.json'
      }
    });

  it('测试初始化',function(done){
    expect(list.getItems().length).to.be(0);
    list.render();
    setTimeout(function(){
      expect(list.getItems().length).not.to.be(0);
      done();
    }, 200);
  });
})
