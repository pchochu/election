import React, {Component} from 'react'
import Layout from '../../../components/Layout'
import {Form, Button, Message, Input} from 'semantic-ui-react'
import axios from 'axios';
const jwt = require('jsonwebtoken')
const {constants} = require('../../../helper/constants').default;
import {Router} from '../../../routes';
import {getJwtAdministration} from '../../../helper/jwtAdministration'
import web3 from '../../../ethereum/web3'

class Login extends Component{
	state = {
		login: '',
		errorMessage: '',
		password: '',
		loading: false,
		showMsgNoMask: false,
	};


	 componentWillMount(){
		this.setState({showMsgNoMask: false})
		this.setState({loading:true})
	}

	async componentDidMount(){
		const accounts = await web3.eth.getAccounts();
		const address = accounts[0]
		var jwt
		if(!address){
			this.setState({showMsgNoMask: true})
			this.setState({loading:false})
		} else{
			jwt = getJwtAdministration()
			if(this.props.type == 1 && jwt){
				await axios.post(constants.ADDRESS +  '/authenticateAdmin', 
				{
					headers: {
						'Content-Type': 'application/json',
						'token': jwt
					},
				}).then( e => {
					Router.pushRoute(`/elections/${address}/administrationElections/`)
				}).catch(error => {
					console.log("Neulozeny token")
					this.setState({loading:false})
				})} else if(this.props.type == 2 && jwt){
					await axios.post(constants.ADDRESS +  '/authenticateFactory', 
					{
						headers: {
							'Content-Type': 'application/json',
							'token': jwt
						},
					}).then( e => {
						Router.pushRoute(`/elections/${address}/administrationFactory/`)
					}).catch(error => {
						console.log("Neulozeny token")
						this.setState({loading:false})
					})
			}
		}
		if(! jwt){
			this.setState({loading:false})
		}
	}

	static async getInitialProps(props){
		const {type} = props.query;
		return {
			type:type
		};
	}

	showMsg() {
			return( <Message negative>
					<Message.Header>Ojoj, nastal nejaký problém</Message.Header>
					<p>Pravdepodobne nemáš nainštalovanú MetaMask</p>
					<p>Skús znovu opakovat akciu po prihlaseni do MetaMask</p>
				</Message>
			)
		}

	onSubmit = async event => {

		event.preventDefault();
		this.setState({ errorMessage: '' })

		if (this.state.login === '') {
			this.setState({ errorMessage: 'Nevyplnený login' })
			return
		}

		if (this.state.password === '') {
			this.setState({ errorMessage: 'Nevyplnene heslo' })
			return
		}

		try{
			// let log = await axios.post(constants.ADDRESS + '/login',
			// { 
			// 		username:this.state.login,
			// 		password: this.state.password,
			// })


			// console.log(log.data.response)
			// if(log.data.response == 'notAuth'){
			// 	this.setState({errorMessage: 'Nespavne prihlasovacie udaje'})
			// 	return
			// } 

			let res = await axios.post(constants.ADDRESS + '/authenticate',
			{ 
					username:this.state.login,
					password: this.state.password,
					address:'',
					type:this.props.type
			}).then(res => localStorage.setItem('pef-volby-jwt', res.data))



			if(this.props.type == 1){
				Router.pushRoute(`/elections/administration/authenticationElection/`)
			} else if(this.props.type == 2){
				Router.pushRoute(`/elections/administration/authentication`)
			} else{
				Router.pushRoute('/')
			}

      }catch (e){
	  }

	};

	render(){
		if (this.state.loading == true){
			return (
				<Layout>
					<div class="ui active dimmer">
						<div class="ui loader"></div>
					</div>
				</Layout>
			)
		}

		if(this.state.showMsgNoMask == true){
			return (
				<Layout>
					{this.showMsg()}
				</Layout>
				)
		}

		if(this.state.loading == false && this.state.showMsgNoMask == false){
			return(
				<Layout>
					<h3>Prihlasenie</h3>
						<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
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
							<Message error header="Ojoj, niečo sa pokazilo!" content={this.state.errorMessage} />
							<Button color={constants.COLOR} >Login</Button>	
						</Form>
				</Layout>
				);
		}
	}
}

export default Login;