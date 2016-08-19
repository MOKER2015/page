
/***
 * 合同 
 */
(function($) {
	$.extend({
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
								+ url + '" scrolling="auto"></iframe>';
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

/* format 公共方法 */
formatDate = function(value, row, index) {
	var unixTimestamp = new Date(value);
	return unixTimestamp.format("yyyy-MM-dd");
};

formatTime = function(value, row, index) {
	var unixTimestamp = new Date(value);
	return unixTimestamp.format("yyyy-MM-dd HH:mm:ss");
};

formatEnabeld = function(val, row, index) {
	if (val == "1") {
		return "是";
	} else if (val == "0") {
		return "<font color='red'>否</font>";
	} else {
		return "";
	}
};

formatType = function(val, row, index) {
	if (val == "1") {
		return "广告";
	} else if (val == "2") {
		return "增值/线下";
	} else {
		return "";
	}
};

accountType = function(val, row, index) {
	if (val == "1") {
		return "职位扣点";
	} else if (val == "2") {
		return "简历扣点";
	} else if (val == "3") {
		return "合同金额/变更";
	} else {
		return "";
	}
};

function DefaultGrid() {
	this.id = 'grid';
};

DefaultGrid.prototype = {
	setId : function(id) {
		this.id = id;
	},
	getId : function() {
		return this.id;
	},
	openDialog : function(parms) {
		parms = $.extend({
			id : $.getUUID(),
			reload : true
		}, parms);

		if (parms.reload) {
			var id = this.id;
			parms.success = function(rs) {
				if (rs.status == 'succ') {
					$('#' + id).datagrid("reload");
				} else {
					$.showMessager.show({
						title : '提示信息',
						msg : rs.message
					});
				}
			}
		}
		$.openDialog(parms);
	},
	delData : function(parms) {
		parms = $.extend({
			gridId : this.id,
			key : 'id',
			keyname : 'ids',
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
					$('#' + parms.gridId).datagrid("reload");
				}
			}
		}, parms);

		var selected = $('#' + parms.gridId).datagrid("getSelections");
		if (selected.length > 0) {
			var ids = [];
			for ( var i = 0; i < selected.length; i++) {
				ids.push(Number(selected[i][parms.key]));
			}
			$.showMessager.confirm('提示信息', '你确定删除选中记录?', function(r) {
				if (r) {
					parms.data = {};
					parms.data[parms.keyname] = ids;
					$.ajax(parms);
				}
			});
		} else {
			$.showMessager.show({
				msg : '请选择要删除的记录！'
			});
		}
	},
	openUpDialog : function(parms) {
		parms = $.extend({
			id : $.getUUID(),
			gridId : this.id,
			key : 'id',
			keyname : 'id',
			reload : true
		}, parms);

		var selected = $('#' + parms.gridId).datagrid("getLastSelected");
		if (selected) {
			var data = selected[parms.key];
			parms.data = {};
			parms.data[parms.keyname] = data;
			if (parms.reload) {
				parms.success = function(rs) {
					if (rs.status == 'succ') {
						$('#' + parms.gridId).datagrid("reload");
					} else {
						$.showMessager.show({
							title : '提示信息',
							msg : rs.message
						});
					}
				}
			}
			$.openDialog(parms);
		} else {
			$.showMessager.show({
				msg : '请选择一条记录！'
			});
		}
	},
	query : function(parms) {
		parms = $.extend({
			gridId : this.id,
			formId : 'parms'
		}, parms);
		var data = $("#" + parms.formId) == null ? {} : $("#" + parms.formId)
				.serializeObject();
		$('#' + parms.gridId).datagrid('load', data);
	}
};

var defaultGrid = null;
$(function() {
	defaultGrid = new DefaultGrid();

	
	$('.delData').click(function() {
		var delParms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			delParms = eval('({' + data + '})');
		}
		defaultGrid.delData(delParms);
	});

	$('.addDialog').click(function() {
		var addParms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			addParms = eval('({' + data + '})');
		}
		defaultGrid.openDialog(addParms);
	});

	$('.upDialog').click(function() {
		var upParms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			upParms = eval('({' + data + '})');
		}
		defaultGrid.openUpDialog(upParms);
	});
	
	$('.query').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}
		defaultGrid.query(parms);
	});
	
	$('.addTr').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}
		parms = $.extend({
			type : "POST",
			dataType : 'json',
			reload : true,
			beforeSend : function() {
				
			},
			success : function(json) {
				$.showMessager.progress('close');
				$.showMessager.show({
					msg : json.message
				});
				if (parms.reload) {
					alert(json);
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
			if (parms.funcId == null || parms.funcId < 1) {
				$.showMessager.show({
					msg : '请选择要修改的树节点！'
				});
				return;
			}
			ids.push(Number(parms.funcId));
			parms.data = {};
			parms.data['ids'] = ids;
		}

		$.showMessager.confirm('提示信息', '你确定删除选中记录?', function(r) {
			if (r) {
				$.ajax(parms);
			}
		});
	});
	
	$('.dicAdd').click(function() {
		var addParms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			addParms = eval('({' + data + '})');
		}

		addParms = $.extend({
			id : $.getUUID(),
			funType : $('#type').val()
		}, addParms);

		addParms.data = {};
		addParms.data['type'] = addParms.funType;
		
		addParms.success = function(rs) {
			
		};
		$.openDialog(addParms);
	});
	
	$('.dicEdit').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}

		parms = $.extend({
			id : $.getUUID(),
			gridId : this.id,
			reload : true,
			funType : $('#type').val()
		}, parms);

		
		var selected = $('#grid').datagrid("getLastSelected");
		if (selected) {
			var data = selected['id'];
			parms.data = {};
			parms.data['type'] = parms.funType;
			parms.data['id'] = data;
		} else {
			$.showMessager.show({
				msg : '请选择一条记录！'
			});
			return;
		}
		

		if (parms.reload) {
			parms.success = function(rs) {
				if (rs.status == 'succ') {
					$('#grid').datagrid("reload");
				} else {
					$.showMessager.show({
						title : '提示信息',
						msg : rs.message
					});
				}
			};
		}
		$.openDialog(parms);
	});

	$('.dicDel').click(function() {
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
			funType : $('#type').val(),
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
					$('#grid').datagrid("reload");
				}
			}
		}, parms);

		var ids = [];
		
		var selected = $('#grid').datagrid("getSelections");
		if (selected.length > 0) {
			var ids = [];
			for ( var i = 0; i < selected.length; i++) {
				ids.push(Number(selected[i]['id']));
			}
			parms.data = {};
			parms.data['ids'] = ids;
			parms.data['type'] = parms.funType;
		} else {
			$.showMessager.show({
				msg : '请选择要删除的记录！'
			});
			return;
		}


		$.showMessager.confirm('提示信息', '你确定删除选中记录?', function(r) {
			if (r) {
				$.ajax(parms);
			}
		});
	});
	
	$('.upContract').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}

		parms = $.extend({
			id : $.getUUID(),
			gridId : this.id,
			key : 'pactId',
			keyname : 'pactId',
			reload : true,
			success : function(rs) {
				if (rs.status == 'succ') {
						if (this.reload){
							$('#grid').datagrid("reload");
						}
				} else {
						$.messager.alert('提示信息',rs.message);
						
					}
			  }
		}, parms);
		var selected = $('#grid').datagrid("getLastSelected");
		if(selected.pactStatus==3){
			$.showMessager.show({
				msg : '已过期的无法修改！'
			});
			return ;
		}
		if (selected) {
			var data = selected[parms.key];
			parms.data = {};
			parms.data[parms.keyname] = data;
			$.openDialog(parms);
		} else {
			$.showMessager.show({
				msg : '请选择一条记录！'
			});
		}
	});
	
	$('.delContract').click(function() {
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
					$('#grid').datagrid("reload");
				}
			}
		}, parms);

		var ids = [];
		
		var selected = $('#grid').datagrid("getSelections");
		if (selected.length > 0) {
			var ids = [];
			for ( var i = 0; i < selected.length; i++) {
				ids.push(selected[i]['pactId']);
			}
			parms.data = {};
			parms.data['pactIds'] = ids;
		} else {
			$.showMessager.show({
				msg : '请选择要删除的记录！'
			});
			return;
		}
		$.showMessager.confirm('提示信息', '你确定删除选中记录?', function(r) {
			if (r) {
				$.ajax(parms);
			}
		});
	});
	
	$('.reAward').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}

		parms = $.extend({
			id : $.getUUID(),
			gridId : this.id,
			key : 'pactId',
			keyname : 'pactId',
			reload : true,
			success : function(rs) {
				if (rs.status == 'succ') {
						if (this.reload){
							$('#grid').datagrid("reload");
						}
				} else {
						$.messager.alert('提示信息',rs.message);
						
					}
			  }
		}, parms);
		var selected = $('#grid').datagrid("getLastSelected");
		if (selected) {
			var data = selected[parms.key];
			parms.data = {};
			parms.data[parms.keyname] = data;
			$.openDialog(parms);
		} else {
			$.showMessager.show({
				msg : '请选择一条记录！'
			});
		}
	});
	
	$('.addIncrement').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}

		parms = $.extend({
			id : $.getUUID(),
			gridId : this.id,
			key : 'pactId',
			keyname : 'pactId'
		}, parms);
		var selected = $('#grid').datagrid("getLastSelected");
		if (selected) {
			var data = selected[parms.key];
			parms.data = {};
			parms.data[parms.keyname] = data;
			$.openDialog(parms);
		} else {
			$.showMessager.show({
				msg : '请选择一条记录！'
			});
		}
	});
	
	$('.entFind').click(function() {
		var addParms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			addParms = eval('({' + data + '})');
		}

		addParms = $.extend({
			id : $.getUUID()
		}, addParms);
		
		closeDialog(dialogId);
		
		$.openDialog(addParms);
	});
	
	$('.contractAdd').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}

		parms = $.extend({
			id : $.getUUID(),
			gridId : this.id
		}, parms);
		
		var selected = $('#grid').datagrid("getLastSelected");
		if (selected) {
			var entId = selected['entCode'];
			var entName=selected['entName'];
			parms.data = {};
			parms.data['entId'] = entId;
			parms.data['entName'] = entName;
			closeDialog(dialogId);
			$.openDialog(parms);
		} else {
			$.showMessager.show({
				msg : '请选择一条记录！'
			});
		}
	});
	$('.reSet').click(function() {
		var Parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			Parms = eval('({' + data + '})');
		}
		document.getElementById(Parms.formId).reset(); 	 
	});
});

