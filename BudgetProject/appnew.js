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
        }
    };


    
    
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
        incomeList: '.income__list'
    }
    
    
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMString.inputType).value,
                description: document.querySelector(DOMString.inputDescription).value,
                value: parseFloat(document.querySelector(DOMString.inputValue).value)
            };
            
        },

        addListItem: function(obj) {
            var HTML;
            // put it into UI controller

            
            document.querySelector(DOMString.incomeList).insertAdjacentHTML('beforeend', HTML);


            // if(obj.type === 'inc' && obj.description !== '' && obj.value > 0) {
            // } else if(obj.type == 'exp' && obj.description !== '' && obj.value > 0) {
                
            // }
            
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
        //1. get input value
        input = UICtrl.getInput();
        //2. save the input value
        budgetCtrl.addItem(input.type, input.description, input.value);
        //3. print on the screen
    }
    
    return {
        init: function() {
            console.log('app started.');
            setupEventListeners();
        
        }
    }
})(budgetController, UIController);

controller.init();