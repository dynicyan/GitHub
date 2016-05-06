/*计算表单计算*/
(function($){
	var selectCheck = (function(){
		var _data=[],_checkBox;
		function getCheckboxType(all,obj){
			_data.length = 0;
			_checkBox = all;
			var SelectAllFlag = obj.hasClass('selectAll')?true:false;
			var checkFlag = obj.attr('checked')?true:false;
			setCheckBox(SelectAllFlag,checkFlag);
			return _data.length>0?_data:'';
		};

		function setCheckBox(SelectAllFlag,checkFlag){
			if(SelectAllFlag){
				if(checkFlag){
					_checkBox.attr('checked',true);
				}else{
					_checkBox.attr('checked',false);
				}
			}
			getData();
		};

		function getData(){
			for(var i = 0 ,len = _checkBox.length;i<len;i++){
				var that = _checkBox.eq(i),
					id = that.attr('id'),
					checked=that.attr('checked'),
					value = that.val();
				if(id != 'selectAll' && checked){
					_data.push([id,value]);
				}
			}
		}

		return {
			init:getCheckboxType
		}
	})();
	//设置商品数量
		var setNumber = {
			init: function(Obj,inputObj,max,min,stock){
				var type = Obj.attr('rel-type'),
					flag = type == 'down'?true:false,
					value = parseInt(inputObj.val()),
					max = max > stock?stock:max;
				this.inputObj = inputObj;
				this.max = max;
				this.min = min;
				if(!type) return;
				if(value<=min && flag) return;
				if(value>=max && !flag) {
					dy.dialog.alert({
						title:"信息提示",
						message:"库存不足"
					});
					return;
				}
				this[''+type+''](parseInt(inputObj.val()),Obj);
			},
			add:function(value,obj){
				value++;
				if(value >= this.max){
					obj.removeClass('cur');
				}
				var siblings = obj.siblings('span');
				if(siblings.hasClass('cur') && value > this.max){
					siblings.addClass('cur');
				}
				this.inputObj.val(value);
			},
			down:function(value,obj){
				value--;
				if(value<=this.min){
					obj.removeClass('cur');
				}
				var siblings = obj.siblings('span');
				if(siblings.hasClass('cur') && value > this.min){
					siblings.addClass('cur');
				}
				this.inputObj.val(value);
			}
		};
		//商品价格与积分
		var setTotal = {
			init: function(zdata,price,score,num){
				this.price = price;
				this.score = score;
				this.num = num;
				if(!zdata) this.set(0,0);
				var total = 0,scoreTotal = 0,len = 0;
				for(var i = 0;i < zdata.length;i++){
					var obj = zdata[i],
						id = obj[0],
						value = obj[1].split(','),
						price = value[0],
						score = value[1],
						number = parseInt($('#' + id).parents('tr').find('input.writecan').val())||1;
					total = total + parseFloat(price)*number;
					scoreTotal = scoreTotal + parseInt(score)*number;
				}
				// console.log(zdata);
				len = zdata.length;
				this.set(total.toFixed(2),scoreTotal,len);
			},
			set: function (total,score,num) {
				this.price.text(total);
				this.score.text(score);
				this.num.text(num);
				console.log(this.price.text());
			}
		};
		//删除后重新计算商品价格
		var resetTotal = {
			init:function(del,subprice,subscore,subnum){
				this.subprice = subprice;
				this.subscore = subscore;
				this.subnum = subnum;
				var sprice = this.subprice.text(),
					sscore = this.subscore.text(),
					snum = this.subnum.text();
				var len,obj = del.parents('tr').find('input[name=goods]'),
					id = obj.attr('id'),
					value = obj.val().split(',');
					price = value[0],
					score = value[1],
					number = parseInt($('#' + id).parents('tr').find('input.writecan').val())||1;
				sprice = (sprice - parseFloat(price)*number) < 0?0:sprice - parseFloat(price)*number;
				sscore = (sscore - parseInt(score)*number) < 0?0:sscore - parseInt(score)*number;
				len = snum - 1  < 0?0:snum -1;
				obj.attr('checked',false);
				console.log(value,price,score,number);
				this.set(sprice.toFixed(2),sscore,len);
			},
			set:function(sprice,sscore,snum){
				this.subprice.text(sprice);
				this.subscore.text(sscore);
				this.subnum.text(snum);
			}
		};
		//删除列表中商品
		// var delrecord = function (obj1){
		// 	var Flagcheck = obj1.attr('checked')?true:false,
		// 		id = obj1.attr('id');
		// 	var sdata = $('#'+id).parents('tr'),
		// 		sinput = sdata.find('input.writecan');
		// 		// svalue = sdata.find('input.writecan').val();
		// 	if(!Flagcheck){
		// 		dy.dialog.alert({
		// 			title:"消息提示",
		// 			message:"要删除指定行，需选中要删除的行！"
		// 		});
		// 	}else{
		// 		dy.dialog.confirm({
		// 			title:"消息提示",
		// 			message:"确定要删除么",
		// 			callback:function(){
		// 				sdata.remove();
		// 			}
		// 		});
		// 		// obj1.attr('checked',false);
		// 	}
		// };
		//调用
		$(function(){
			var goods = $('table.checktable input[name="goods"]'),
				priceall = $('.priceall'),
				scoreall = $('.scoreall'),
				numberall = $('.numberall'),
				setNum = $('.setnum span'),
				inputfocus = $('input.writecan'),
				del = $('.delete');

			function setEnd(obj){
				var data = selectCheck.init(goods,obj);
				setTotal.init(data,priceall,scoreall,numberall);
			};
			goods.on('click',function(e){
				// console.log(e);
				setEnd($(this));
			});
			setNum.on('click',function(){
				var $this = $(this),
					setInput = $(this).parent().find('input.writecan');
				var checkObj=$this.parents('tr').find('input[type="checkbox"]');
				setNumber.init($this,setInput,99,1,10);
				setEnd(checkObj);
			});
			del.on('click',function(){
				var $this = $(this),
					sdata = $(this).parents('tr'),
					checkObj = sdata.find('input[name="goods"]'),
					sInput = sdata.find('input.writecan'),
					setN = sdata.find('.setnum span'),
					cflag = checkObj.attr('checked')?true:false;
					if(!cflag){
						dy.dialog.alert({
							title:"消息提示",
							message:"要删除指定行，需选中要删除的行！"
						});
					}else{
						dy.dialog.confirm({
							title:"消息提示",
							message:"确定要删除么",
							callback:function(){
								resetTotal.init($this,priceall,scoreall,numberall)
								sdata.remove();
							}
						});
					}
			})
			inputfocus.on({
				'keyup':function(){
					var $this = $(this),
					setInput = $(this).parent().find('input.writecan');
					var checkObj=$this.parents('tr').find('input[type="checkbox"]');
					setNumber.init($this,setInput,99,1,10);
					setEnd(checkObj);
					console.log($this.val())
				},'blur':function(){
				}
			})
		});
})(jQuery)