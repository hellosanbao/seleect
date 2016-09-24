/*
*模拟下拉列表
*版本：xzQselect 1.0.0
*基本使用方法，将select标签用一个带有data-select属性的div包裹即可
*可以传入样式作为参数。例：$(selecter).xzQselect({
    Pcss:{样式对象}, 当前选项样式
    ULcss:{样式对象}, 选择列表样式
    SELcss:{样式对象} 外部盒子样式
*一般可以不传，通过css自定义即可   
});
*/


(function(win,doc,$){
    var xzQselect=(function(){
    	function xzQselect(ele,options){
    	   this.settings=$.extend(true, $.fn.xzQselect.option, options||{});
    	   this.warp=$(ele);
           this.init()
    	}
    	xzQselect.prototype={
    		//初始化dom结构
    		init:function(){
    			this.selDom=this.warp.find("select");
    	   		this.optDom=this.warp.find("option");
    			this.optLength=this.optDom.length;
    			this.ind=0; 
    			this.warp.find('select').hide();
               	this.bournDom();
               	this.cloneClass();
               	this.ul.css(this.settings.ULcss);
                this.p.css(this.settings.Pcss);
                this.div.css(this.settings.SELcss);
               	this.selectActive();
    		},
    		//克隆select和option的class（为用户设置样式提供方便）
    		cloneClass:function(){
    			this.slectClass=this.selDom.attr("class");
    			this.optionClass=this.optDom.attr("class");
    			this.div=this.warp.find('div');
    			this.ul=this.warp.find('ul');
    			this.li=this.warp.find('li');
    			this.p=this.warp.find('.p');
    			this.div.attr('class',this.slectClass);
    			this.li.attr('class',this.optionClass);
    		},
    		//生成模拟dom元素
    		bournDom:function(){
    			this.warp.append("<div></div>");
    			this.warp.find('div').append("<p class='p'>"+this.currentText()+"</p>");
    			this.warp.find('div').append("<ul></ul>");
    			for (var i = 0; i < this.optLength; i++) {
    				this.warp.find('div').find("ul").append('<li>'+this.optDom.eq(i).text()+'</li>')
    			};
    		},
    		//默认选项
    		currentText:function(){
    			for (var i = 0; i < this.optDom.length; i++) {
    				if($(this.optDom[i]).attr("selected")){
    					this.currtx=$(this.optDom[i]).text();
    					return this.currtx;
    				}
    				this.currtx=$(this.optDom[0]).text();
    			};
    			return this.currtx;
    		},
    		//选择操作模拟
    		selectActive:function(){
    			var self=this;
    			self.li.click(function(){
    				self.ind=$(this).index();
    				self.currtx=self.optDom.eq(self.ind).text();
    				self.optDom.eq(self.ind).attr('selected','selected').siblings('option').removeAttr('selected')
    				self.p.text(self.currtx);
    			});

    			self.div.click(function(){
    				self.isShow()?self.ul.slideDown(200):self.ul.slideUp(200);
    			})

    			$('body').click(function(event){
    				 if(event.target==this & !self.isShow()){
    					self.ul.slideUp(200);
    				 }
    			})
    		},
    		isShow:function(){
    			if(this.ul.css('display')=='block'){
    				return false;
    			}
    			return true
    		},

    	}
    	return xzQselect;
    })()

    $.fn.xzQselect=function(options){
    	return this.each(function() {
    		var self=$(this);
    		insetance=self.data('xzQselect');
    		if(!insetance){
    			self.data('xzQselect',insetance=new xzQselect(self,options));
    		}
    	});
    }

    $.fn.xzQselect.option={
        Pcss:{},
        ULcss:{
            'position':'absolute',
            'left':0,
            'top':$(this).find(".p").height()+'px',
            'display':'none',
            'width':'100%',
            'border':'1px solid #d7d7d7',
            'border-radius':'5px',
            'box-sizing':'border-box',
        },
        SELcss:{
            'position':'relative'
        }
    }
   $(function(){
   	$("[data-select]").xzQselect();
   })
}(window,document,jQuery))









