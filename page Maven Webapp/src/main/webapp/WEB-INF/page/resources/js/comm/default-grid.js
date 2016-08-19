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
								+ url + '" scrolling="no"></iframe>';
						dom.html(con);
					} else {
						dom.html(option.content);
					}
					
					if(typeof(option.open)=='undefined'||option.open){
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
				},
			});


/*	$.extend($.fn.pagination.defaults, {
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
	});*/

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

/* format 公共方法 */
formatDate = function(value, row, index) {
	var unixTimestamp = new Date(value);
	return unixTimestamp.format("yyyy-MM-dd");
};

formatTime = function(value, row, index) {
	var unixTimestamp = new Date(value);
	return unixTimestamp.format("yyyy-MM-dd HH:mm:ss");
};
//10位时间戳转 yyyy-mm-dd hh:mi:ss
formatDateStrTime = function(val, row, index) {
    var ts =val;  
    if (val==""||val==undefined||val==null){
        return "";
    }
    var t,y,m,d,h,i,s;  
    t = ts ? new Date(ts*1000) : new Date();  
    y = t.getFullYear();  
    m = t.getMonth()+1;  
    d = t.getDate();  
    h = t.getHours();  
    i = t.getMinutes();  
    s = t.getSeconds();  
    // 可根据需要在这里定义时间格式  
    return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(i<10?'0'+i:i)+':'+(s<10?'0'+s:s);  
};

formatEnabeld = function(val, row, index) {
	if (val == "1") {
		return "是";
	} else if (val == "0") {
		return "否";
	} else {
		return "";
	}
};

formatSex = function(val, row, index) {
	if (val == "1") {
		return "男";
	} else if (val == "2"){
		return "女";
	} else if (val == "3") {
		return "不限";
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
			gridId:this.id,
			reload : true,
			success : function(rs) {
				if (rs.status == 'succ') {
					$('#' + this.gridId).datagrid("reload");
				} else {
					$.messager.alert('提示信息',rs.message);
					/*$.showMessager.show({
						title : '提示信息',
						msg : rs.message
					});*/
				}
				
			}
		}, parms);

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
			reload : true,
			success : function(rs) {
				if (rs.status == 'succ') {
					if (this.reload){
						$('#' + this.gridId).datagrid("reload");
					}
				} else {
					$.messager.alert('提示信息',rs.message);
					/*$.showMessager.show({
						title : '提示信息',
						msg : rs.message
					});*/
				}
			}
		}, parms);

		var selected = $('#' + parms.gridId).datagrid("getLastSelected");
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
	},
	query : function(parms) {
		parms = $.extend({
			gridId : this.id,
			formId : 'parms'
		}, parms);
		var data = $("#" + parms.formId) == null ? {} : $("#" + parms.formId)
				.serializeObject();
		
		if(typeof(parms.url) != 'undefined'){
		    var options = $('#' + parms.gridId).datagrid('options');
		    options.url = parms.url;
	    }
		$('#' + parms.gridId).datagrid('load', data);
	},
	
	//多加了几个参数
	listDialog : function(parms) {
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
			//url 参数
			parms.data["urlsel"] = parms.urlsel;
			parms.data["urlL"] = parms.urlL;
			parms.data["urlR"] = parms.urlR;		 
			parms.data["urlsave"] = parms.urlsave;
			 	
			if (parms.reload) {
				parms.success = function(rs) {
					if (rs.status == 'succ') {
						$('#' + parms.gridId).datagrid("reload");
					} else {
						$.messager.alert('提示信息',rs.message);
						/*$.showMessager.show({
							title : '提示信息',
							msg : rs.message
						});*/
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
	//提示框操作
	msgoper : function(parms) {
		parms = $.extend({
			gridId : this.id,
			key : 'id',
			keyname : 'ids',
			type : "POST",
			dataType : 'json',
			reload : true,
			beforeSend : function() {
				$.showMessager.progress({
					msg : '正在操作，请等待...'
				});
			},
			success : function(rs) {
				if(rs.status=="fault"){
					$.showMessager.progress('close');
					$.showMessager.show({
					    msg : rs.message
					}); 
				}else{
					$.showMessager.progress('close');
					$.showMessager.show({
						msg : rs.message
					});
					if (parms.reload) {
						$('#' + parms.gridId).datagrid("reload");
					}
				}
				
				
			}
		}, parms);

		var selected = $('#' + parms.gridId).datagrid("getSelections");
		if (selected.length > 0) {
			var ids = [];
			for ( var i = 0; i < selected.length; i++) {
				ids.push(Number(selected[i][parms.key]));
			}
			$.showMessager.confirm('提示信息', parms.msg==undefined?"":parms.msg, function(r) {
				if (r) {
					parms.data = {};
					parms.data[parms.keyname] = ids;
					$.ajax(parms);
				}
			});
		} else {
			$.showMessager.show({
				msg : '请选择要操作的记录！'
			});
		}
	}
};

var defaultGrid = null;
$(function() {
	defaultGrid = new DefaultGrid();

	$('.flR').click(
			function() {
				var id = "queryparms";
				if (typeof $(this).attr('data-options') != 'undefined') {
					var data = $(this).attr('data-options');
					var jsData = eval('({' + data + '})');
					id = typeof jsData.hideId == 'undefined' ? "queryparms"
							: jsData.hideId;
				}

				if ($(this).hasClass('flR_XX')) {
					$('#' + id).hide();
					$(this).removeClass('flR_XX');
					$(this).addClass('flR_SS');
				} else {
					$('#' + id).show();
					$(this).removeClass('flR_SS');
					$(this).addClass('flR_XX');
				}
				$('#' + defaultGrid.getId()).datagrid("resize");
			});

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
	// 模块
	$('.funTree').tree({
		onClick : function(node) {
			$('#funcId').val(node.id);
			var id = $("#funcId").val();
			$('#grid').datagrid('load', {
				funcId : id
			});
		},
		onContextMenu : function(e, node) {
			e.preventDefault();
			$(this).tree('select', node.target);
			$('#funcId').val(node.id);
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
			funcId : $('#funcId').val()
		}, addParms);

		addParms.data = {};
		addParms.data['funcId'] = addParms.funcId;
		
		addParms.success = function(rs) {
			if (rs.status == 'succ') {
				$('.funTree').tree('reload');
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
			reload : true,
			funcId : $('#funcId').val()
		}, parms);

		if (parms.type == "grid") {
			var selected = $('#grid').datagrid("getLastSelected");
			if (selected) {
				var data = selected['id'];
				parms.data = {};
				parms.data['funcId'] = data;

			} else {
				$.showMessager.show({
					msg : '请选择一条记录！'
				});
				return;
			}
		} else if (parms.type == "tree") {
			if (parms.funcId == null || parms.funcId < 1) {
				$.showMessager.show({
					msg : '请选择要修改的树节点！'
				});
				return;
			}
			parms.data = {};
			parms.data['funcId'] = parms.funcId;
		}

		if (parms.reload) {
			parms.success = function(rs) {
				if (rs.status == 'succ') {
					$('.funTree').tree('reload');
					$('#grid').datagrid("reload");
				} else {
					$.messager.alert('提示信息',rs.message);
					/*$.showMessager.show({
						title : '提示信息',
						msg : rs.message
					});*/
				}
			};
		}

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
			funcId : $('#funcId').val(),
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
					$('.funTree').tree('reload');
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
	/*******************add cc 20150906****************************/
	//左右列表 窗口 点击左边窗口移动到右边
	$('.listDialog').click(function() {
		var upParms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			upParms = eval('({' + data + '})');
		}
		
		defaultGrid.listDialog(upParms);
	});
	/*******************end cc 20150906****************************/
	//add cc 20151109   form重置
	$('.reSet').click(function() {
		var Parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data = $(this).attr('mydata-options');
			Parms = eval('({' + data + '})');
		}
		document.getElementById(Parms.formId).reset(); 	 
	});
	
});
//添加表格回车查询事件
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
               
     if(e && e.keyCode==13){ // enter 键
         $(".query").click();             
    }
};
