import React, {Component} from 'react'
import Layout from '../../../components/Layout'
import {Form, Button, Message, Input, Accordion, Label} from 'semantic-ui-react'
import axios from 'axios';
const jwt = require('jsonwebtoken')
const {constants} = require('../../../helper/constants').default;

class Login extends Component{
	state = {
		login: '',
		errorMessage: '',
		password: ''
	};


	static async getInitialProps(props){
		const {type} = props.query;
		
		return {
			type:type
		};
	}

	onSubmit = async event => {
		event.preventDefault();
		this.setState({ errorMessage: '' })
		this.setState({ key: '' })

		if (this.state.login === '') {
			this.setState({ errorMessage: 'Nevyplnený login' })
			return
		}

		if (this.state.password === '') {
			this.setState({ errorMessage: 'Nevyplnene heslo' })
			return
		}

		try{

			let res = await axios.post(constants.ADDRESS + '/authenticate',
			{ 
					username:this.state.login,
					password: this.state.password,
					address:'',
					type:this.props.type
			}).then(res => localStorage.setItem('pef-volby-jwt', res.data))

			/*
			if(res.data.response == 'notAuth'){
				this.setState({errorMessage: 'Nespavne prihlasovacie udaje'})
				return
			} */

      }catch (e){
	  }

	};

	render(){
		return(
			<Layout>
				<h3>Prihlasenie</h3>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.key}>
						<Form.Field required>
							<label>xlogin</label>
							<Input 
								placeholder='Login'
								value={this.state.login}
								onChange={event =>{this.setState({errorMessage:''}), this.setState({login: event.target.value})}}
							/>
						</Form.Field>

						<Form.Field required>
							<label>Heslo</label>
							<Input 
								type="password"
								placeholder='Heslo'
								value={this.state.password}
								onChange={event =>{this.setState({errorMessage:''}), this.setState({password: event.target.value})}}
							/>
						</Form.Field>
						<Button color={constants.COLOR} >Login</Button>	
					</Form>
			</Layout>
			);
	}
}

export default Login;