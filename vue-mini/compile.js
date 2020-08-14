// 编译器：遍历DOM结构， 解析指令和插值表达式
class Compile {
  // el模板、vm是KVue实例
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.getElementById(el);
    console.log(this.$el);
    
    // 把模板中的内容移动到片段中
    this.$fragment = this.node2Fragment(this.$el);
    // 编译片段
    this.compile(this.$fragment);
    // 放回编译后的片段
    this.$el.appendChild(this.$fragment);
  }

  // 获取模板内容
  node2Fragment(el) {
    const fragment = document.createDocumentFragment();

    let child;
    // 循环将el内的dom元素移动到fragment中
    while(child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  // 片段编译
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      // hconsole.log(node);
      
      if (node.nodeType === 1) {
        // node类型是dom元素
        console.log('编译Node元素' + node.nodeName);
        this.complieElement(node);
        
      } else if (this.isInter(node)) {
        console.log('编译text'+ node.textContent);
        this.compileText(node);
      }
      // 递归遍历子节点
      if (node.children && node.childNodes.length) {
        this.compile(node)
      }
    });
  }
  
  // 判断是否是text元素
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  // 替换text
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];
    const exp = RegExp.$1;
    this.update(node, exp, 'text')
  }

  // 更新函数
  update(node, exp, dir) {
    const updator = this[dir + 'Updator'];
    // 初始化更新
    updator && updator(node, this.$vm[exp]);

    new Watcher(this.$vm, exp, function(value) {
      // console.log('this is cb', updator);
      
      updator && updator(node, value);
    })
  }

  // text更新方法
  textUpdator(node, value) {
    node.textContent = value;
  }

  // dom元素编译
  complieElement(node) {
    const nodeAttrs = node.attributes;
    Array.from (nodeAttrs).forEach(attr => {
      const attrName = attr.name;
      const exp = attr.value;
      if (attrName.indexOf('k-') === 0) {

        const dir = attrName.substring(2);
        this[dir] && this[dir](node, exp)
      }
    })
  }
   // 处理k-text指令
   text(node, exp) {
     this.update(node, exp, 'text')
   }
}