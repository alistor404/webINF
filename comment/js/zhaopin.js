new Vue({
  el: '#tuijian',
  data: {
    todos: [
	    { title: 'web前端',money:'8k-16k',localtion:'上海',years:'3-4',school:'本科以上',qiyemsg1:'jack | 腾讯 | hr',qiyemsg2:'2000-10000',date:'1h',img:'./img-zhaopin/qiye.jpg'},
	    { title: 'php后端程序员',money:'10k-16k',localtion:'上海',years:'1-3',school:'本科以上',qiyemsg1:'jack | 腾讯 | hr',qiyemsg2:'4000-10000',date:'1h',img:'./img-zhaopin/qiye.jpg'},
		{ title: 'web前端',money:'8k-16k',localtion:'上海',years:'3-4',school:'本科以上',qiyemsg1:'jack | 腾讯 | hr',qiyemsg2:'2000-10000',date:'1h',img:'./img-zhaopin/qiye.jpg'},
		{ title: 'web前端',money:'8k-16k',localtion:'上海',years:'3-4',school:'本科以上',qiyemsg1:'jack | 腾讯 | hr',qiyemsg2:'2000-10000',date:'1h',img:'./img-zhaopin/qiye.jpg'},
		{ title: 'web前端',money:'8k-16k',localtion:'上海',years:'3-4',school:'本科以上',qiyemsg1:'jack | 腾讯 | hr',qiyemsg2:'2000-10000',date:'1h',img:'./img-zhaopin/qiye.jpg'},
		{ title: 'web前端',money:'8k-16k',localtion:'上海',years:'3-4',school:'本科以上',qiyemsg1:'jack | 腾讯 | hr',qiyemsg2:'2000-10000',date:'1h',img:'./img-zhaopin/qiye.jpg'},
		{ title: 'web前端',money:'8k-16k',localtion:'上海',years:'3-4',school:'本科以上',qiyemsg1:'jack | 腾讯 | hr',qiyemsg2:'2000-10000',date:'1h',img:'./img-zhaopin/qiye.jpg'},
		{ title: 'web前端',money:'8k-16k',localtion:'上海',years:'3-4',school:'本科以上',qiyemsg1:'jack | 腾讯 | hr',qiyemsg2:'2000-10000',date:'1h',img:'./img-zhaopin/qiye.jpg'},
		{ title: 'web前端',money:'8k-16k',localtion:'上海',years:'3-4',school:'本科以上',qiyemsg1:'jack | 腾讯 | hr',qiyemsg2:'2000-10000',date:'1h',img:'./img-zhaopin/qiye.jpg'}
    ]
  }
})
var mySwiper = new Swiper ('.swiper-container', {
	direction: 'horizontal',
	loop: true,
	autoplay : 1000,
	speed:300,
	pagination: '.swiper-pagination'

})