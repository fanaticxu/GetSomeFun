var budgetController = (function() {
    
    var data;

    var Income = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };

    var Expense = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };


    data = {
        allItem: {
            inc: [],
            exp: []        
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItem[type].forEach(function(val){
            sum += parseFloat(val.value);
        });
        data.totals[type] = sum;
        console.log(data.totals[type]);
    }

    return {
        addItem: function(type, desc, value) {
            var id, newItem;
            if(data.allItem[type].length > 0) {
                id = data.allItem[type][data.allItem[type].length - 1].id + 1;
            } else {
                id = 0;
            }
            
            if(type === 'inc') {
                newItem = new Income(id, desc, value);
            } else if (type === 'exp') {
                newItem = new Expense(id, desc, value);
            }
            data.allItem[type].push(newItem);
            return newItem;
        },

        calculateBudget: function() {
            calculateTotal('inc');
            calculateTotal('exp');
            data.budget = data.totals.inc - data.totals.exp;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
                

        testing: function() {
            return console.log(data);
        } 
    } 
})();


var UIController = (function() {
    var DOMString = {
        inputButton : '.add__btn',
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        incomeList: '.income__list',
        expenseList: '.expenses__list',
        budgetLabel: '.budget__value',
        totalIncomeLabel: '.budget__income--value',
        totalExpensesLabel: '.budget__expenses--value'
    }
    
    
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMString.inputType).value,
                description: document.querySelector(DOMString.inputDescription).value,
                value: parseFloat(document.querySelector(DOMString.inputValue).value)
            };
            
        },
        displayBudget: function(budget, totalInc, totalExp) {
            document.querySelector(DOMString.budgetLabel).textContent = budget; 
            document.querySelector(DOMString.totalIncomeLabel).textContent = totalInc;
            document.querySelector(DOMString.totalExpensesLabel).textContent = totalExp;
        },

        addListItem: function(obj, type) {
            var html, element, newHtml;
            if(type === 'inc') {
                element = DOMString.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>' 
            } else if(type === 'exp') {
                element = DOMString.expenseList;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.desc);
            newHtml = newHtml.replace('%value%', obj.value);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },

        clearField: function() {

            // solution 1
            // document.querySelector(DOMString.inputDescription).value = '';
            // document.querySelector(DOMString.inputValue).value = '';
            // document.querySelector(DOMString.inputDescription).focus();

            // solution 2
            var fields, fieldsArr;
			// Use querySelectorALl to get a NodeList containing all of the matching Element nodes within the node’s subtrees, in document order. 
			fields = document.querySelectorAll(DOMString.inputDescription + ', ' + DOMString.inputValue);
			//convert fileds(NodeList to an array),
			// fieldsArr = Array.prototype.slice.call(fields);
			// console.log(fields);
			// console.log(fieldsArr);
			// console.log(fields === fieldsArr);
			fields.forEach(function(arr) {
				arr.value = '';
			});

			fields[0].focus();
        },

        getDOMString: function() {
            return DOMString;
        },

        testing: function() {
            return 'UIController'
        }
    } 
})();


var controller = (function(budgetCtrl, UICtrl) {
    var DOM, input; 
    DOM= UICtrl.getDOMString();

    var updateBudget = function() {
        var budgetObj;
        // calculate budget.
        budgetCtrl.calculateBudget();
        // return the calculate result.
        budgetObj = budgetCtrl.getBudget();
        // display the result to the UI.
        UICtrl.displayBudget(budgetObj.budget, budgetObj.totalInc, budgetObj.totalExp);
    }
    
    var setupEventListeners = function() {
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(value){
            if(parseInt(value.keyCode) === 13) {
                ctrlAddItem();
            }
        });
    }


    var ctrlAddItem = function() {
        // console.log('clicked');
        var newItem;
        //1. get input value
        input = UICtrl.getInput();
        if(input.description !== '' && input.value > 0) {
            //2. save the input value
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            console.log(newItem);
            //3. print on the screen
            UICtrl.addListItem(newItem, input.type);
            //4. clear the input box
            UICtrl.clearField();
            //5. calculate and update budget.
            updateBudget();
            
        }


    }
    
    return {
        init: function() {
            console.log('app started.');
            setupEventListeners();
            //init budget income and outcome label to 0
            updateBudget();
        }
    }
})(budgetController, UIController);

controller.init();