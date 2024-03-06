import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '',
            currCalculation: 0,
            currNum: null,
            currSign: null,
            signClicked: false,
        }
        this.handleNumClicked = this.handleNumClicked.bind(this);
        this.calculate = this.calculate.bind(this);
        this.handleSignClicked = this.handleSignClicked.bind(this);
        this.delete = this.delete.bind(this);
        this.reset = this.reset.bind(this);
    }
    handleNumClicked(e) {
        if (this.state.display === '' && e.target.value === '0') {  // 0 must not be the first digit.
            return;
        }
        if (/\./.test(this.state.display) && e.target.value === '.') {    // allow only 1 dot in each number
            return;
        }
        if (this.state.signClicked) {
            if (!this.state.currSign) {  // in case the number is clicked right after the equal sign is clicked 
                this.reset()
            } else {
                this.setState({
                    display: '',
                    signClicked: false
                })
            }          
        }
        this.setState((state) => ({
            display: state.display + e.target.value
        }))
    }
    calculate() {
        switch(this.state.currSign) {
            case 'plus':
                this.setState((state) => ({
                    currCalculation: ((state.currCalculation + state.currNum) * 1000000000).toFixed() / 1000000000
                }));
                break;
            case 'minus':
                this.setState((state) => ({
                    currCalculation: ((state.currCalculation - state.currNum) * 1000000000).toFixed() / 1000000000
                }));
                break;
            case 'multiply':
                this.setState((state) => ({
                    currCalculation: ((state.currCalculation * state.currNum) * 1000000000).toFixed() / 1000000000
                }));
                break;
            case 'divide':
                this.setState((state) => ({
                    currCalculation: ((state.currCalculation / state.currNum) * 1000000000).toFixed() / 1000000000
                }));
                break;
            default:
                this.setState((state) => ({
                    currCalculation: state.currNum
                }));
                break;
        }
        this.setState((state) => ({
            display: state.currCalculation.toString()
        }))
    }
    handleSignClicked(e) {
        if (this.state.display === '') {
            return;
        }
        if (!this.state.signClicked) {
            this.setState((state) => ({
                signClicked: true,
                currNum: Number(state.display)
            }))
            this.calculate();
        }
        this.setState({
            currSign: e.target.value
        })
    }
    delete() {
        if (!this.state.display) {
            return;
        }
        if (/^-\d$/.test(this.state.display)) {  // 1-digit negative number should be deleted both a number and a negative sign.
            this.setState({
                display: ''
            })
            return;
        }
        if (/\.\d$/.test(this.state.display)) {
            this.setState((state) => ({
                display: state.display.slice(0, -2)
            }))
            return;
        }
        this.setState((state) => ({
            display: state.display.slice(0, -1)
        }))
    }
    reset() {
        this.setState({
            display: '',
            currCalculation: 0,
            currNum: null,
            currSign: null,
            signClicked: false,
        })
    }
    render() {
        return (
            <div>
                <Output display={this.state.display} />
                <Buttons 
                    handleNumClicked={this.handleNumClicked} 
                    handleSignClicked={this.handleSignClicked} 
                    delete={this.delete}
                    reset={this.reset} 
                />
            </div>
        )
    }
}

function Output(props) {
    const addComma = (display) => {
        let startAddingIndex = null;
        if (display.indexOf('.') > 0) {
            startAddingIndex = display.indexOf('.');
        } else {
            startAddingIndex = display.length;
        }
        if (startAddingIndex > 3) {
            let numArr = display.split('');
            let numWithComma = [];
            for (let i = startAddingIndex - 1; i >= 0; i--) {
                let x = startAddingIndex % 3;
                if (i % 3 === x && i !== 0) { 
                    numWithComma.unshift(',', numArr[i]);
                } else {
                    numWithComma.unshift(numArr[i]);
                }
            }
            return numWithComma.concat(display.slice(startAddingIndex, -1)).join('');
        } else {
            return display
        }
    }
    return (
        <div className='Output'>
            <span>{addComma(props.display)}</span>
        </div>
    )
}

class Buttons extends React.Component {
    render() {
        return (
            <div className='Buttons'>
                <button value='7' className='key' onClick={this.props.handleNumClicked}>7</button>
                <button value='8' className='key' onClick={this.props.handleNumClicked}>8</button>
                <button value='9' className='key' onClick={this.props.handleNumClicked}>9</button>
                <button className='del-key' onClick={this.props.delete}>DEL</button>
                <button value='4' className='key' onClick={this.props.handleNumClicked}>4</button>
                <button value='5' className='key' onClick={this.props.handleNumClicked}>5</button>
                <button value='6' className='key' onClick={this.props.handleNumClicked}>6</button>
                <button value='plus' className='key' onClick={this.props.handleSignClicked}>&#43;</button>
                <button value='1' className='key' onClick={this.props.handleNumClicked}>1</button>
                <button value='2' className='key' onClick={this.props.handleNumClicked}>2</button>
                <button value='3' className='key' onClick={this.props.handleNumClicked}>3</button>
                <button value='minus' className='key' onClick={this.props.handleSignClicked}>&minus;</button>
                <button value='.' className='key' onClick={this.props.handleNumClicked}>.</button>
                <button value='0' className='key' onClick={this.props.handleNumClicked}>0</button>
                <button value='divide' className='key' onClick={this.props.handleSignClicked}>&#47;</button>
                <button value='multiply' className='key' onClick={this.props.handleSignClicked}>&times;</button>
                <button className='reset-key' onClick={this.props.reset}>RESET</button>
                <button value={null} className='equal-key' onClick={this.props.handleSignClicked}>&#61;</button>
            </div>
        )
    }
}

export default Calculator;