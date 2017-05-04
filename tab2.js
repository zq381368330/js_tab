;(function($){
	
	var Tab=function(tab){
		var _this_=this;
		//���浥��tab���
		this.tab=tab;
		//Ĭ�����ò���
		this.config={
			//�����������Ĵ�������
			  "triggerType":"click",
			  //�������������л�Ч����ֱ�ӻ��ǵ��뵭��
	          "effect":"fade",
			  //Ĭ����ʾ�ڼ���tab
	          "invoke":2,
			  //���������Ƿ��Զ��л������ƶ���ʱ�������ͱ�ʾ�Զ��л�
	          "auto":false
			
		
			
			
		};
		//������ò������ڣ�����չ��Ĭ�ϵ����ò���
		if(this.getConfig()){
			
			$.extend(this.config,this.getConfig());
		};
		//����tab��ǩ�б���Ӧ�������б�
    this.tabItems=this.tab.find("ul.tab-nav li");
this.contentItems=this.tab.find("div.content-wrap div.content-item");
        //�������ò���
		var config=this.config;
		if(config.triggerType==="click"){
			this.tabItems.bind(config.triggerType,function(){
			  _this_.invoke($(this));
			});
			
			
			
		}
		else if(config.triggerType==="mouseover"||config.triggerType!="click"){
			this.tabItems.mouseover(function(){
				var self=$(this);
				this.timer=window.setTimeout(function(){
					
					
					_this_.invoke(self);
					},300);
			}).mouseout(function(){
				
				window.clearTimeout(this.timer);
				
			});
		};
		//�Զ��л����ܣ���������ʱ�䣬���Ǿ͸���ʱ���������л�
		
			if(config.auto){
				//����ȫ�ֵĶ�ʱ��
				this.timer=null;
				//���������
				this.loop=0;
				this.autoPlay();
				this.tab.hover(function(){
					window.clearInterval(_this_.timer);
				},function(){
					
					
					_this_.autoPlay();
				});
				
				
				
			};
			//����Ĭ����ʾ�ڼ���tab
			if(config.invoke>1){
				this.invoke(this.tabItems.eq(config.invoke-1));
				
				
				
				
			};
	};
	Tab.prototype={
		
		
		//�Զ����ʱ���л�
		autoPlay:function(){
			var _this_=this,
			tabItems=this.tabItems,//��ʱ����tab�б�
			tabLength=tabItems.length,//tab����
			config=this.config;
			this.timer=window.setInterval(function(){
				_this_.loop++;
				if(_this_.loop>=tabLength){
					
					_this_.loop=0;
				};
				tabItems.eq(_this_.loop).trigger(config.triggerType);
				
				
				
				
				
			},config.auto);
			
			
			
		},
		//�¼���������
		invoke:function(currentTab){
			var _this_=this;
			/***
			*Ҫִ��Tab��ѡ��״̬,��ǰѡ�еļ���actived(���Ϊ�׵�)
			  *�л���Ӧ��tab���ݣ�Ҫ�������ò�����effect��default����fade
			***/
			var index=currentTab.index();
			//tabѡ��״̬
			currentTab.addClass("actived").siblings().removeClass("actived");
			//�л���Ӧ����������
			var effect=this.config.effect;
			var conItems=this.contentItems;
			if(effect==="default"){
				conItems.eq(index).addClass("current").siblings().removeClass("current");
			}
			else if(effect==="fade"){
				conItems.eq(index).fadeIn().siblings().fadeOut();
				
				
				
			};
			//ע��:����������Զ��л����ǵðѵ�ǰ��loop��ֵ���óɵ�ǰ��tab��index
			if(this.config.auto){
				this.loop=index;
				
				
			};
			
			
		},
		//��ȡ���ò���
		getConfig:function(){
			//��һ��tab elem�ڵ��ϵ�data-config
			var config=this.tab.attr("data-config");
			
			//ȷ�������ò���
			if(config&&config!=""){
				return $.parseJSON(config);
				}
				else{
					return null;
				}
			
		}
		
	};
	Tab.init=function(tabs){
		var _this_=this;
		tabs.each(function(){
			new _this_($(this));
			
			
			
		});
		
		
		
	};
	//ע���jquery����
	$.fn.extend({
		tab:function(){
			this.each(function(){
				new Tab($(this));
			});
		}
		
		
		
	});
	
	
	
	window.Tab=Tab;
	
	
	
	
})(jQuery);