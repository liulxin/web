## call
```
Function.prototype._call = function(targetObject) {
	if (typeof targetObject === 'undefined' || targetObject === null) {
		targetObject = window
	}
	targetObject = new Object(targetObject)

	const targetFnKey = 'targetFnKey'
	targetObject[targetFnKey] = this

	const result = targetObject[targetFnKey](...[...arguments].slice(1))
	delete targetObject[targetFnKey]
	return result
}
```
## apply
```
Function.prototype._apply = function(targetObject, argsArray) {
	if (typeof argsArray === 'undefined' || argsArray === null) {
		argsArray = []
	}
	if (typeof targetObject === 'undefined' || targetObject === null) {
		targetObject = window
	}
	targetObject = new Object(targetObject)

	const targetFnKey = 'targetFnKey'
	targetObject[targetFnKey] = this

	const result = targetObject[targetFnKey](...argsArray)
	delete targetObject[targetFnKey]
	return result
}
```

## bind
```
Function.prototype._bind =
	Function.prototype._bind ||
	function(context) {
		if (typeof this !== 'function') {
			throw new Error('Function.prototype.bind -not function')
		}
		var self = this
		//预设参数
		var args = Array.prototype.slice.call(arguments, 1)
		var F = function() {}
		F.prototype = this.prototype

		var fBind = function() {
			var innerArgs = Array.prototype.slice.call(arguments)
			var finalArgs = args.concat(innerArgs)
			return self.apply(this instanceof F ? this : context, finalArgs)
		}

		fBind.prototype = new F()
		return fBind
	}
```