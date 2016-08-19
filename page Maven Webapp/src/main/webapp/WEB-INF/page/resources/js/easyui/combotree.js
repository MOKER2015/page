function onCombotreeShowPanel(){
      // 显示下拉框, 展开到当前节点
      var t = $(this).combotree('tree');
      var node = t.tree('getSelected');
      if (node){
         t.tree('expandTo', node.target);
         }
   }
   


(function($){
   // 实现下拉树的本地检索功能
   $.fn.combotree.defaults.editable = true;
   
   $.extend($.fn.combotree.methods,{
      nav:function(jq, dir){
         return jq.each(function(){
            var opts = $(this).combotree('options');
            var t = $(this).combotree('tree');
            var nodes = t.tree('getChildren');
            if (!nodes.length) {return;}
            
            var node = t.tree('getSelected');
            if (!node){
               t.tree('select', dir>0 ? nodes[0].target : nodes[nodes.length-1].target);
            } else {
               var index = 0;
               for(var i=0; i<nodes.length; i++){
                  if (nodes.target == node.target){
                     index = i;
                     break;
                  }
               }
               
               if (dir>0){
                  while (index < nodes.length-1){
                     index++;
                     if ($(nodes[index].target).is(':visible')){break;}
                  }
               } else {
                  while (index > 0){
                     index--;
                     if ($(nodes[index].target).is(':visible')){break;}
                  }
               }
               t.tree('select',nodes[index].target);
               t.tree('scrollTo',nodes[index].target);
               
            }

            if (opts.selectOnNavigation){
               var node = t.tree('getSelected');
               $(this).combotree("setValue", node.id);
//               $(node.target).trigger('click');
//               $(this).combotree('showPanel');
            }
         });
      }
   });
   
   // 检测当前能否编辑
   function checkEditable(el){
      var opt = el.combo("options");                  
      if (opt.readonly || opt.disabled) {
         return false;
      }
      return opt.editable;
   }
   
   $.extend($.fn.combotree.defaults.keyHandler,{
      up:function(){
         var el = $(this);
         if (!checkEditable(el)) return;
         
         // 当前 panel 已展开, 则处理nav, 否则先显示 panel
         var p = el.combotree('panel');
         if (p.is(':visible')){
            el.combotree('nav', -1);
         }else{
            el.combotree('showPanel');   
         }
      },
      down:function(){
         var el = $(this);
         if (!checkEditable(el)) return;
         
         // 当前 panel 已展开, 则处理nav, 否则先显示 panel
         var p = el.combotree('panel');
         if (p.is(':visible')){
            el.combotree('nav', 1);
         }else{
            el.combotree('showPanel');   
         }
      },
      right:function(){
         var el = $(this);
         if (!checkEditable(el)) return;
         
         var p = el.combotree('panel');
         if (!p.is(':visible')){return;}
         
         // 展开当前节点的分支
         var t = el.combotree('tree');
         var node = t.tree('getSelected');
         if (node){
            t.tree('expand', node.target);
         }
      },
      left:function(){
         var el = $(this);
         if (!checkEditable(el)) return;
         
         var p = el.combotree('panel');
         if (!p.is(':visible')){return;}
         
         var t = el.combotree('tree');
         var node = t.tree('getSelected');
         if (node){
            var isLeaf = t.tree('isLeaf', node.target);
            if (!isLeaf && node.state == "open"){
               // 如果不是叶子节点, 并且当前是展开状态, 则收缩当前分支
               t.tree('collapse', node.target);
            }else{
               // 如果有父节点, 则收缩父节点, 并且选中父节点
               var parent = t.tree('getParent', node.target);
               if (parent){
                  t.tree('collapse', parent.target);
                  t.tree('select', parent.target);
                  
                  // 需要时, 更新textbox的值
                  var opts = el.combo("options");   
                  if (opts.selectOnNavigation){
                     el.combotree("setValue", parent.id);                        
                  }
               }
            }
         }
      },
      enter:function(){
         var el = $(this);
         if (!checkEditable(el)) return;
         
         var p = el.combotree('panel');
         if (!p.is(':visible')){return;}
         
         var t = el.combotree('tree');
         var node = t.tree('getSelected');
         if (node){
            $(node.target).trigger('click');
         }
         $(this).combotree('hidePanel');
      }
   });
   
   $.extend($.fn.combotree.defaults.keyHandler,{
      query:function(q){
         if (q == "") {
            // 用于触发 onchange 
            $(this).combotree('setValue', '');
            return;
         }
         
         var opts = $(this).combotree('options');
         
         var t = $(this).combotree('tree');
         var nodes = t.tree('getChildren');
         for(var i=0; i<nodes.length; i++){
            var node = nodes;
            
            if (node.text.indexOf(q) >= 0){
//         if (opts.filter && opts.filter(q, node)){
               if (q != ""){
                  // 必须展开, 否则显示不出来
                  t.tree('expandTo', node.target);
               }
               $(node.target).show();
            } else {
               $(node.target).hide();
            }
         }
         
         // 点击下拉, 则恢复显示
         if (!opts.hasSetEvents){
            opts.hasSetEvents = true;
            var onShowPanel = opts.onShowPanel;
            opts.onShowPanel = function(){
               // 恢复显示
               var nodes = t.tree('getChildren');
               for(var i=0; i<nodes.length; i++){
                  $(nodes.target).show();
               }
               onShowPanel.call(this);
            };
            
            $(this).combo('options').onShowPanel = opts.onShowPanel;
         }
      }
   });
})(jQuery);

//实现下拉树的本地检索功能
$.fn.combotree.defaults.editable = true;
$.extend($.fn.combotree.defaults.keyHandler,{
   query:function(q){
      if (q == "") {
         $(this).combotree('clear');
         return;
      }
      var t = $(this).combotree('tree');
      var nodes = t.tree('getChildren');
      for(var i=0; i<nodes.length; i++){
          var node = nodes[i];
	         if (node.text.indexOf(q) >= 0){
	               if (q != ""){
	                  // 必须展开, 否则显示不出来
	                  t.tree('expandTo', node.target);
	               }
	               t.tree('select', node.target);
	            }  
	         }
      }
});
$.extend($.fn.combogrid.defaults.keyHandler,{
	      query:function(q){
	         if (q == "") {
	            $(this).combogrid('clear');
	            return;
	         }
	         var options = $(this).combogrid('grid').datagrid("options");
	         
	         var param={};
	         param[options.textField]="%"+q+"%";
	         
	         var params=$.extend(options.queryParams,param);
	         $(this).combogrid("grid").datagrid("load",params);
	       }
	   });

})(jQuery);