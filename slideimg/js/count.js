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
				if(value<+min && flag) return;
				if(value>=max && !flag) {
					console.log('库存不足');
					return;
				}
				this[''+type+''](parseInt(inputObj.val()),obj);
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
					ob.removeClass('cur');
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
						number = $('#' + id).parents('tr').find('input.writecan').val()||1;
						console.info(number);
					total = total + parseFloat(price)*number;
					scoreTotal = scoreTotal + parseInt(score)*number;
				}
				len = zdata.length;
				this.set(total.toFixed(2),scoreTotal,len);
			},
			set: function (total,score,num) {
				this.price.text(total);
				this.score.text(score);
				this.num.text(num);
			}
		};
		$(function(){
			var goods = $('table.checktable input[name="goods"]'),
				priceall = $('.priceall'),
				scoreall = $('.scoreall'),
				numberall = $('.numberall'),
				setNum = $('.setnum span');

			function setEnd(obj){
				var data = selectCheck.init(goods,obj);
				setTotal.init(data,priceall,scoreall,numberall);
			}
			goods.on('click',function(e){
				console.log(e);
				setEnd($(this));
			})
		});
})(jQuery)