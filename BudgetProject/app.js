// budgetController module
var budgetController = (function() {

	var Expense = function(id, description, value, percentage) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function(totalIncome) {
		if(totalIncome > 0) {
			this.percentage = Math.round(this.value / totalIncome * 100);
		} else {
			this.percentage = -1;
		}
		
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage;

	}
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};


	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(function(arr){
			sum += arr.value;
		});
		data.totals[type] = sum;
	}

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	return {
		addItem: function(type, des, val) {
			var newItem, ID;
			//Create new ID
			//[1,2,4,6,8] next should be 9
			
			if(data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			

			//Create new Item based on exp or inc
			if(type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}
			
			//add new data to our data object.
			data.allItems[type].push(newItem);

			//return the new Item
			return newItem; 
		},

		calculateBudget: function() {
			// calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');
			// Calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;
			// Claculate the percentage of income that we spent
			if(data.totals.inc > 0) {
				data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
			} else {
				data.percentage = -1;
			}
			

		},

		calculatePercentages: function() {
			/*
			a = 20
			b = 10
			c = 40
			income = 100
			a% = 20/100
			*/
			data.allItems.exp.forEach(function(arr){
				arr.calcPercentage(data.totals.inc);
			});
		},

		getPercentage: function() {
			var allPerc = data.allItems.exp.map(function(arr){
				return arr.getPercentage();
			});
			return allPerc;
		},

		deleteItem: function(type, id) {
			var ids, index;

			ids = data.allItems[type].map(function(arr) {
				return arr.id;
			});

			index = ids.indexOf(id);

			if (index !== -1) {
				//splice(index we want to del, how many we want to del)
				data.allItems[type].splice(index, 1);
			}
		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
		},

		testing: function() {
			console.log(data);
		}
	}; 

})();



// UI controller module
var UIController = (function() {

	var DOMString = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage'

	}

	return {
		getinput: function(){
			return {
				type: document.querySelector(DOMString.inputType).value,
				description: document.querySelector(DOMString.inputDescription).value,
				// convert the data type of value to number
				value: parseFloat(document.querySelector(DOMString.inputValue).value)
				};  
		},

		addListItem: function(obj, type) {
			var html, newHtml, element;
			// Create HTML string with placeholder text
			if (type === 'inc') {
				element = DOMString.incomeContainer;
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMString.expensesContainer;
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}
			
			
			// Replace the placeholder text with some actual data			
			newHtml = html.replace('%id%', obj.id);
			// rewrite newHtml with html
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%',  obj.value);

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);



		},

		deleteListItem: function(selectorID) {
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},

		clearFields: function() {
			var fields, fieldsArr;
			// Use querySelectorALl to get a NodeList containing all of the matching Element nodes within the node’s subtrees, in document order. 
			fields = document.querySelectorAll(DOMString.inputDescription + ', ' + DOMString.inputValue);
			//convert fileds(NodeList to an array),
			fieldsArr = Array.prototype.slice.call(fields);
			// console.log(fields);
			// console.log(fieldsArr);
			// console.log(fields === fieldsArr);
			fieldsArr.forEach(function(arr) {
				arr.value = '';
			});

			fieldsArr[0].focus();
		},

		displayBudget: function(obj) {

			document.querySelector(DOMString.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMString.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMString.expensesLabel).textContent = obj.totalExp;
			
			if(obj.percentage > 0) {
				document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMString.percentageLabel).textContent = '---';
			}

		},

		displayPercentages: function(percentages) {
			var fields = document.querySelectorAll(DOMString.expensesPercLabel);

			var nodeListForEach = function(list, callback) {
				for (var i = 0; i < list.length;  i++) {
					callback(list[i], i);
				}
			}


			nodeListForEach(fields, function(current, index){
				if (percentages[index] > 0) {
					current.textContent = percentages[index] + '%';	
				} else {
					current.textContent = '---';
				}
				

			});

		},



		getDOMstrings: function(){
			return DOMString;
		}
}

})();



// App controller
var controller = (function(budgetCtrl, UICtrl){

	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event){

			// to show the event object of a key. 
			// console.log(event);
			if (event.keyCode === 13 || event.which === 13) {

				ctrlAddItem();
			}

		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
	};

	var updateBudget = function() {
		// 1. Calculate the budget
		budgetCtrl.calculateBudget();

		// 2. return the budget
	    var budget = budgetCtrl.getBudget();
	    	
		// 5. Display the budget on the UI
		UICtrl.displayBudget(budget);
	};

	var updatePercentages = function() {
		// 1. Calculate the percentages
		budgetCtrl.calculatePercentages();
		// 2. Read percentages from the budget controller
		var percentages = budgetCtrl.getPercentage();
		// 3. Updat the UI with the new percentages
		UICtrl.displayPercentages(percentages);

	};

	var ctrlAddItem = function() {
		var input, newItem;

		// 1. Get the field input data
		input = UICtrl.getinput();
		// console.log('In ctrlAddItem' + input);
		// if(obj.description && obj.value) {
		if(input.description !== '' && !isNaN(input.value) && input.value > 0 ) {
			// 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);
			// 3. Add the item to the UT
			UICtrl.addListItem(newItem, input.type);

			// 4. Clear the field
			UICtrl.clearFields();

			// 5. Calculate and update budget
			updateBudget();

			// 6. Calculate and update percentages
			updatePercentages();
		}


	};

	var ctrlDeleteItem = function(event) {


		// print the actual html parts we clicked
		// console.log(event.target);
		// print the parent node
		// console.log(event.target.parentNode);
		// print the 4 x parent node 
		// console.log(event.target.parentNode.parentNode.parentNode.parentNode);
		// print the id of 4 x parent node 
		var itemID, splitID, type, ID;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if(itemID) {
			//
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);
		}
		
		//1. Delete the item from the data structure
		budgetCtrl.deleteItem(type, ID);
		//2. Delete the item from UI
		UICtrl.deleteListItem(itemID);
		//3. Update and show the new budget
		updateBudget()

		//4. Calculate and update percentages
		updatePercentages();		
	};

	return {
		init: function() {
			console.log('Application has started.');
			//  reset display to 0
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setupEventListeners();
		}
	}


})(budgetController, UIController);


controller.init();



