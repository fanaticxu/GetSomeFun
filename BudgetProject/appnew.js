var budgetController = (function() {
    
    var data;

    var Income = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };

    var Expense = function(id, desc, value, perc) {
        this.id = id;
        this.desc = desc;
        this.value = value;
        this.perc = perc;
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
        budget: 0,
        percentages: -1
    };

    Expense.prototype.calcPerc = function() {
        if(data.totals.inc > 0) {
            this.perc = Math.round(this.value / data.totals.inc * 100);            
        } else {
            this.perc = -1;
        }
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItem[type].forEach(function(val){
            sum += parseFloat(val.value);
        });
        data.totals[type] = sum;
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

        calculatePercentages: function() {
            //calc total percentages
            if(data.totals.inc > 0 && data.totals.exp > 0) {
                data.percentages = Math.round(data.totals.exp / data.totals.inc * 100);                
            }

            data.allItem.exp.forEach(function(val){
                val.calcPerc();
            });

        },  

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                totalPerc: data.percentages
            }
        },

        getPercentages: function() {
            var perc = data.allItem.exp.map(function(val){
                return val.perc;
            });
            return perc;
        },

        deleteItem: function(type, delId) {
            //find the deleteID
            var ids, delIndex;

            ids = data.allItem[type].map(function(val){
                return val.id;                
            });
            
            delIndex = ids.indexOf(delId);
            console.log('delIndex: ' + delIndex);
            //delete it in the database
            if(delIndex !== -1) {
                data.allItem[type].splice(delIndex,1);
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
        totalExpensesLabel: '.budget__expenses--value',
        container: '.container',
        totalPercLabel: '.budget__expenses--percentage',
        itemPercLabel: '.item__percentage'
    }
    
    var nodeListForEach = function(val, callback){
        for(var i = 0; i < val.length; i++) {
            callback(val[i], i);
        }
    }
    
    var formatNumber = function(num, type) {
        var newNum, int, dec, commaNum;
        newNum = Math.abs(num);
        newNum = newNum.toFixed(2);
        newNum = newNum.split('.');
        int = newNum[0];
        console.log(int);
        dec = newNum[1];
        commaNum = '';
        while(int.length > 3) {
            commaNum = ',' + int.substr(int.length - 3, 3) + commaNum;
            int = int.substr(0, int.length - 3);
        }
        console.log(commaNum);
        console.log(int);
        return (type === 'exp' ? '-' : '+') + ' ' + int + commaNum + '.' + dec;
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMString.inputType).value,
                description: document.querySelector(DOMString.inputDescription).value,
                value: parseFloat(document.querySelector(DOMString.inputValue).value)
            };
            
        },
        displayBudget: function(budget, totalInc, totalExp, totalPerc) {
            if(budget >= 0) {
                document.querySelector(DOMString.budgetLabel).textContent = formatNumber(budget, 'inc');                 
            } else {
                document.querySelector(DOMString.budgetLabel).textContent = formatNumber(budget, 'exp');
            }
            document.querySelector(DOMString.totalIncomeLabel).textContent = formatNumber(totalInc, 'inc');
            document.querySelector(DOMString.totalExpensesLabel).textContent = formatNumber(totalExp, 'exp');
            if(totalPerc === -1) {
                document.querySelector(DOMString.totalPercLabel).textContent = '---';            
            } else if(totalPerc > 0) {
                document.querySelector(DOMString.totalPercLabel).textContent = totalPerc + '%';                
            }
        },

        displayPerc: function(percs) {
            var elements = document.querySelectorAll(DOMString.itemPercLabel);
            nodeListForEach(elements, function(val, index){
                if(percs[index] > 0){
                    val.textContent = percs[index] + '%';
                } else {
                    val.textContent = '---';
                }
            });
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
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

        deleteListItem: function(selectID) {
            var el = document.getElementById(selectID);
            el.parentNode.removeChild(el);
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
        var budgetObj, percsObj;
        // calculate budget.
        budgetCtrl.calculateBudget();
        // calc percentage
        budgetCtrl.calculatePercentages();
        // return the calculate result.
        budgetObj = budgetCtrl.getBudget();
        // return the percentages results.
        percsObj = budgetCtrl.getPercentages();

        // display the result to the UI.
        UICtrl.displayBudget(budgetObj.budget, budgetObj.totalInc, budgetObj.totalExp, budgetObj.totalPerc);
        // display percentages
        UICtrl.displayPerc(percsObj);
    }
    
    var setupEventListeners = function() {
        // event listener for input button
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(value){
            if(parseInt(value.keyCode) === 13) {
                ctrlAddItem();
            }
        });

        // event listener for del button
        // document.querySelector(DOM.container).addEventListener('click', function(event){
        //     console.log(event.target);
        // });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
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

    var ctrlDeleteItem = function(event) {
        // find the id of the delete item
        var itemID, itemArr;
        // delete it in data obj
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID) {
            itemArr = itemID.split('-');
            console.log(itemArr[0], itemArr[1]);
            budgetCtrl.deleteItem(itemArr[0], parseInt(itemArr[1]));
            //update the budget result
            updateBudget();
            // delete it in ui
            UICtrl.deleteListItem(itemID);
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