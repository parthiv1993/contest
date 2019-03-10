import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            name : ''
        }
    }

    onLoginClick(e){
        this.props.onLogin(this.state.name);
        e.preventDefault();
    }

    onInputChange(e){
        this.setState({
            name:e.target.value
        });
    }

    render(){
        return (
            <div>
                <form>
                    <label>
                        NickName :
                    </label>
                    <input value={this.state.name} onChange={this.onInputChange.bind(this)}/>
                    <button onClick={this.onLoginClick.bind(this)}>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;