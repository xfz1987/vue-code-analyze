/**
 * Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
 * 可以译为“代理器”
 * Proxy可以监听对象本身的变化，并在变化后执行相应的操作。可以实现追踪对象，同时在数据绑定方面也很有用处 
 *   var proxy = new Proxy(target, handler);
 *   new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为
 *   注意，要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象进行操作
 */
//定义被侦听的目标对象
var target = { name: 'Joe Sixpack', salary: 50 };
//定义处理程序
var handler = {
	construct (target, args, newTarget) {
		return new target(...args);
	}
  	set: function (receiver, property, value) {
  		//receiver：target
   		console.log(property, 'is changed to', value);
   		receiver[property] = value;//更改target对象
  	},
	get: function(target, property){
		if(property in target){
			return target[property];
		}else{
			throw new ReferenceError('Property \'' + property + '\' does not exist.');
		}
	},
	apply: function(){
		return 'I am the proxy';
	}
};
//创建代理以进行侦听
var proxy = new Proxy(target, handler);
//做一些改动来触发代理
proxy.salary = 60;//控制台输出：salary is changed to 60
console.log(target);// {name: "Joe Sixpack", salary: 60}
proxy.name = 'Rose';
console.log(target);// {name: "Rose", salary: 60}