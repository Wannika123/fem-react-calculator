import React from 'react';

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            togClass: null
        }
        this.setTheme = this.setTheme.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }
    setTheme(theme) {
        localStorage.setItem("theme", theme);
        document.documentElement.className = theme;
        this.setState({
            togClass: theme
        })
    }
    handleChange(e) {
        if (e.target.checked) {
            this.setTheme(e.target.value);
        }
    }
    componentDidMount() {
        if (localStorage.getItem("theme")) {
            const theme = localStorage.getItem("theme");
            this.setTheme(theme);
            document.getElementById(theme).checked = true;
        } else {
            this.setTheme('theme-1')
        }
    }
    shouldComponentUpdate(nextState) {
        return this.state.togClass !== nextState.togClass;
    }
    render() {
        return (
            <div className='Toggle'>
                <h1>calc</h1>
                <fieldset className='toggle-btns-container'>
                    <legend>THEME</legend>
                    <label htmlFor='theme-1'>1</label>
                    <label htmlFor='theme-2'>2</label>
                    <label htmlFor='theme-3'>3</label>
                    <div className='radio-btns'>
                        <input type='radio' onChange={this.handleChange} name='toggle-btns' id='theme-1' value='theme-1' />
                        <input type='radio' onChange={this.handleChange} name='toggle-btns' id='theme-2' value='theme-2' />
                        <input type='radio' onChange={this.handleChange} name='toggle-btns' id='theme-3' value='theme-3' />
                        <div className='switcher'></div>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default Toggle