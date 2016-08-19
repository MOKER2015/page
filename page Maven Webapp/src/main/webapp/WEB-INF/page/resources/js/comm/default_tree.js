(function($) {
	$
			.extend({
				openDialog : function(option) {
					if (!option.id) {
						alert("请指定ID");
						return false;
					}
					if (top.$(option.id).length == 0) {
						top.$("body").append(
								"<div isWfHandlOk='false' id='" + option.id
										+ "'></div>");
					}
					var dom = top.$('#' + option.id);
					if (option.url) {
						var data = option.data ? option.data : {};
						data.dialogId = option.id;

						var url = option.url
						jQuery.each(data, function(key, val) {
							url += (url.indexOf("?") > 0 ? "&" : "?") + key
									+ "=" + val;
						});

						var con = '<iframe style="width:100%;height:100%;border:0;" frameborder="0" src="'
								+ url + '" scrolling="no"></iframe>';
						dom.html(con);
					} else {
						dom.html(option.content);
					}
					var defaultOptions = {
						title : '编辑菜单',
						width : 650,
						height : 350,
						maximizable : true,
						modal : true,
						cache : false
					};
					$.extend(defaultOptions, option, {
						onClose : function() {
							if (option.success) {
								var callback = top.$("body").data(option.id);
								if (typeof (callback) != 'undefined') {
									option.success(callback);
								}
							}
						}
					});

					dom.dialog(defaultOptions);
				}
			});

	$.extend($.fn.pagination.defaults, {
		total : function() {
			return 1;
		},
		pageNumber : function() {
			return 1;
		},
		pageSize : function() {
			return 20;
		},
		pageList : function() {
			return [ 10, 20, 30 ];
		}
	});

	$.extend($.fn.datagrid.defaults, {
		fit : function() {
			return true;
		},
		checkOnSelect : false,//选中框不勾上
		//singleSelect:true,//单选
		fitColumns : function() {
			return true;
		},
		striped : function() {
			return true;
		},
		rownumbers : function() {
			return true;
		},
		pagination : function() {
			return true;
		},
		pageSize : 15,
		pageList : [ 15, 20, 30, 40, 50 ]
	});

	$.extend($.fn.datagrid.methods, {
		getLastSelected : function(grid) {
			var selections = grid.datagrid("getSelectionsAll");
			return selections.length > 0 ? selections[selections.length - 1]
					: null;
		}
	});

	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	}

	$.fn.combobox.defaults.editable = false;
	$.fn.datebox.defaults.editable = false;

	function getSelectRows(obj, flag) {
		var datagrid = $.data(obj, "datagrid");
		var opts = datagrid.options;
		if (opts.idField) {
			var selectedRows = datagrid.selectedRows;
			if (flag) {
				return selectedRows;
			} else {
				var rows = [];
				for ( var i = 0; i < selectedRows.length; i++) {
					var row = selectedRows[i];
					if (!row.disabled) {
						rows.push(row);
					}
				}
				return rows;
			}
		} else {
			var rows = [];
			opts.finder.getTr(obj, "", "selected", 2).each(function() {
				rows.push(opts.finder.getRow(obj, $(this)));
			});
			return rows;
		}
	}
	;
	$.fn.datagrid.defaults.onCheckAll = function(rows) {
		var opts = $(this).datagrid('options');
		for ( var i = 0; i < rows.length; i++) {
			var tr = opts.finder.getTr(this, i);
			if (tr.find('input[type=checkbox]').attr('disabled')) {
				tr.removeClass("datagrid-row-selected datagrid-row-checked");
				tr.find('input[type=checkbox]').removeAttr('checked');
			}
		}
	};
	$.fn.datagrid.defaults.onClickRow = function(rowIndex, rowData) {
		var opts = $(this).datagrid('options');
		var tr = opts.finder.getTr(this, rowIndex);
		if (tr.find('input[type=checkbox]').attr('disabled')) {
			tr.removeClass("datagrid-row-checked");
			tr.find('input[type=checkbox]').removeAttr('checked');
		}
	};
	$.fn.datagrid.methods.getSelections = function(jq) {
		return getSelectRows(jq[0], false);
	};
	$.fn.datagrid.methods.getSelectionsAll = function(jq) {
		return getSelectRows(jq[0], true);
	};
})(jQuery);

formatEnabeld = function(val, row, index) {
	if (val == "1") {
		return "是";
	} else if (val == "0") {
		return "否";
	} else {
		return "";
	}
};
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
	
	$('.treeAdd').click(function() {
		var addParms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			addParms = eval('({' + data + '})');
		}

		addParms = $.extend({
			id : $.getUUID(),
			currentId : $('#currentId').val()
		}, addParms);

		addParms.data = {};
	    addParms.data['pid'] = addParms.currentId;
		addParms.success = function(rs) {
			if (rs.status == 'succ') {
				$('.treeId').tree('reload');
				$('#grid').datagrid("reload");
			}
		};
 		$.openDialog(addParms);
	});

	$('.treeEdit').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}

		parms = $.extend({
			id : $.getUUID(),
			gridId : this.id,
			reload : true
			//currentId : $('#currentId').val()
		}, parms);
		
		var selected = $('#grid').datagrid("getLastSelected");
		if (selected) {
			var data = selected['id'];
			parms.data = {};
			parms.data['gridid'] = data;

		} else {
			$.showMessager.show({
				msg : '请选择一条记录！'
			});
			return;
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
		//$.extend(parms,{width : 500,height : 250});
		
		$.openDialog(parms);
	});

	
	$('.treeDel').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}

		parms = $.extend({
			gridId : this.id,
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
		}  

		$.showMessager.confirm('提示信息', '你确定删除选中记录?', function(r) {
			if (r) {
				$.ajax(parms);
			}
		});
	}); 
	
});