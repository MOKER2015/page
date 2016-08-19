	
$(function($){
// 左树导航
	$('.treeId').tree({
		onClick : function(node) {
			$('#currentId').val(node.id);
			var id = $("#currentId").val();
			$('#grid').datagrid('load', {
				id : id
			});
		},
		onContextMenu : function(e, node) {
			e.preventDefault();
			$(this).tree('select', node.target);
			$('#currentId').val(node.id);
			$('#tabsMenu').menu('show', {
				left : e.pageX,
				top : e.pageY
			});
		}
	});
	
	$('.treeCgAdd').click(function() {
		var addParms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			addParms = eval('({' + data + '})');
		}

		addParms = $.extend({
			id : $.getUUID(),
			categoryId : $('#currentId').val()
		}, addParms);

		addParms.data = {};
		if (addParms.type == "grid") {
			var selected = $('#grid').datagrid("getLastSelected");
			if (selected) {
				var data = selected['id'];
				addParms.data['categoryId'] = data;
			} else {
				$.showMessager.show({
					msg : '请选择一条记录！'
				});
				return;
			}
		} else if (addParms.type == "tree") {
			if (addParms.categoryId == null || addParms.categoryId < 0) {
				$.showMessager.show({
					msg : '请选择要添加的树节点！'
				});
				return;
			}
			addParms.data['categoryId'] = addParms.categoryId;
		}
		
		addParms.success = function(rs) {
			if (rs.status == 'succ') {
				$('.treeId').tree('reload');
				$('#grid').datagrid("reload");
			}
		};
		$.extend(addParms,{width : 500,height : 250});
		$.openDialog(addParms);
	});

	$('.treeCgEdit').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}

		parms = $.extend({
			id : $.getUUID(),
			gridId : this.id,
			reload : true,
			categoryId : $('#currentId').val()
		}, parms);

		if (parms.type == "grid") {
			var selected = $('#grid').datagrid("getLastSelected");
			if (selected) {
				var data = selected['id'];
				parms.data = {};
				parms.data['categoryId'] = data;

			} else {
				$.showMessager.show({
					msg : '请选择一条记录！'
				});
				return;
			}
		} else if (parms.type == "tree") {
			if (parms.categoryId == null || parms.categoryId < 0) {
				$.showMessager.show({
					msg : '请选择要修改的树节点！'
				});
				return;
			}
			parms.data = {};
			parms.data['categoryId'] = parms.categoryId;
		}

		if (parms.reload) {
			parms.success = function(rs) {
				if (rs.status == 'succ') {
					$('.treeId').tree('reload');
					$('#grid').datagrid("reload");
				} else {
					$.showMessager.show({
						title : '提示信息',
						msg : rs.message
					});
				}
			};
		}
		$.extend(parms,{width : 500,height : 250});
		
		$.openDialog(parms);
	});

	
	$('.treeCgDel').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}

		parms = $.extend({
			gridId : this.id,
			categoryId : $('#currentId').val(),
			type : "POST",
			dataType : 'json',
			reload : true,
			beforeSend : function() {
				$.showMessager.progress({
					msg : '正在删除数据，请等待...'
				});
			},
			success : function(json) {
				$.showMessager.progress('close');
				$.showMessager.show({
					msg : json.message
				});
				if (parms.reload) {
					$('.treeId').tree('reload');
					$('#grid').datagrid("reload");
				}
			}
		}, parms);

		var ids = [];
		if (parms.delType == "grid") {
			var selected = $('#grid').datagrid("getSelections");
			if (selected.length > 0) {
				var ids = [];
				for ( var i = 0; i < selected.length; i++) {
					ids.push(Number(selected[i]['id']));
				}
				parms.data = {};
				parms.data['ids'] = ids;
			} else {
				$.showMessager.show({
					msg : '请选择要删除的记录！'
				});
				return;
			}
		} else if (parms.delType == "tree") {
			if (parms.categoryId == null || parms.categoryId < 1) {
				$.showMessager.show({
					msg : '请选择要修改的树节点！'
				});
				return;
			}
			ids.push(Number(parms.categoryId));
			parms.data = {};
			parms.data['ids'] = ids;
		}

		$.showMessager.confirm('提示信息', '你确定删除选中记录?', function(r) {
			if (r) {
				$.ajax(parms);
			}
		});
	}); 
	
});