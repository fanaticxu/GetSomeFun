var budgetController = (function() {
	var x =1;
	var add = function(a) {
		return x + a;
	}

	return {
		publicTest: function(b) {
			console.log(add(b));
		}
	}
})();


