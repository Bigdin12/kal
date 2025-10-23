   let currentOperand = '0';
        let previousOperand = '';
        let operation = null;

        const currentOperandElement = document.getElementById('currentOperand');
        const previousOperandElement = document.getElementById('previousOperand');

        function updateDisplay() {
            currentOperandElement.textContent = currentOperand;
            if (operation != null) {
                previousOperandElement.textContent = `${previousOperand} ${operation}`;
            } else {
                previousOperandElement.textContent = previousOperand;
            }
        }

        function appendNumber(number) {
            // Перетворюємо крапку на кому
            if (number === '.') number = ',';
            
            // Не дозволяємо більше однієї коми
            if (number === ',' && currentOperand.includes(',')) return;
            
            // Якщо поточне число 0 і вводимо не кому, замінюємо 0
            if (currentOperand === '0' && number !== ',') {
                currentOperand = number;
            } else {
                currentOperand += number;
            }
            updateDisplay();
        }

        function chooseOperation(op) {
            if (currentOperand === '') return;
            if (previousOperand !== '') {
                calculate();
            }
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '';
            updateDisplay();
        }

        function calculate() {
            let result;
            // Перетворюємо коми на крапки для обчислень
            const prev = parseFloat(previousOperand.replace(',', '.'));
            const current = parseFloat(currentOperand.replace(',', '.'));
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '×':
                    result = prev * current;
                    break;
                case '÷':
                    if (current === 0) {
                        alert('Ділення на нуль неможливе!');
                        clearAll();
                        return;
                    }
                    result = prev / current;
                    break;
                case '%':
                    result = prev % current;
                    break;
                default:
                    return;
            }
            
            // Перетворюємо результат назад у формат з комою
            currentOperand = result.toString().replace('.', ',');
            operation = null;
            previousOperand = '';
            updateDisplay();
        }

        function clearAll() {
            currentOperand = '0';
            previousOperand = '';
            operation = null;
            updateDisplay();
        }

        function deleteNumber() {
            if (currentOperand.length === 1) {
                currentOperand = '0';
            } else {
                currentOperand = currentOperand.slice(0, -1);
            }
            updateDisplay();
        }

        // Підтримка клавіатури
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
            if (e.key === '.' || e.key === ',') appendNumber(',');
            if (e.key === '+') chooseOperation('+');
            if (e.key === '-') chooseOperation('-');
            if (e.key === '*') chooseOperation('×');
            if (e.key === '/') {
                e.preventDefault();
                chooseOperation('÷');
            }
            if (e.key === '%') chooseOperation('%');
            if (e.key === 'Enter' || e.key === '=') calculate();
            if (e.key === 'Escape') clearAll();
            if (e.key === 'Backspace') deleteNumber();
        });

        updateDisplay();