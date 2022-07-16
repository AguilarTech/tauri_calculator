class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	clear() {
		this.currentOperand = ''
		this.previousOperand = ''
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	chooseOperations(operation) {
		if (this.currentOperand === '') return
		if (this.previousOperand !== '') {
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	compute() {
		let computation
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		if (isNaN(prev) || isNaN(current)) return
		switch (this.operation) {
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '×':
				computation = prev * current
				break
			case '÷':
				computation = prev / current
				break
			default:
				return
		}

		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}

	updateDisplay() {
		this.currentOperandTextElement.innerText = this.currentOperand
		this.previousOperandTextElement.innerText = this.previousOperand
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationBUtton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector(
	'[data-previous-operand]'
)
const currentOperandTextElement = document.querySelector(
	'[data-current-operand]'
)

previousOperandTextElement.innerHtml = '2222'

const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
)

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationBUtton.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.chooseOperations(button.innerText)
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', () => {
	calculator.compute()
	calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
	calculator.delete()
	calculator.updateDisplay()
})
