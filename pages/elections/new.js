import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message, TextArea, Accordion, Label, Checkbox } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Election from '../../ethereum/election'
import web3 from '../../ethereum/web3';
import axios from 'axios';
const {constants} = require('../../helper/constants').default;
import {getJwtAdministration} from '../../helper/jwtAdministration'
import { Router } from '../../routes'


class ElectionNew extends React.Component {
	state = {
		RSAPubKey: '',
		RSAPrivKey: '',
		activeIndex: -1,
		nameOfTheElection: '',
		descriptionOfElection: '',
		errorMessage: '',
		loading: false,
		address: '',
		admin: true,
		address1: '',
		address2: '',
		address3: '',
		selectedFile: null,
		msg: '',
		checked: false,
		token: ''
	};

    async componentDidMount(){
		const jwt = await getJwtAdministration()
        if(jwt){
            await axios.post(constants.ADDRESS +  '/authenticateFactory', 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': jwt
                },
            }).then( e => {
                
            }).catch(error => {
                console.log("Neulozeny token")
                Router.pushRoute(`/elections/administration/login/2`);
            })
        } else {
            Router.pushRoute(`/elections/administration/login/2`);
        }
	}

	downloadTxtFile = () => {
		const element = document.createElement("a");
		const file = new Blob([this.state.RSAPrivKey], {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = "privateKeyForElection.txt";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	}

	getLastElection = async (event) => { 
		try {
			const accounts = await web3.eth.getAccounts();
			const addressEl = await factory.methods
			.getLastElectionAddress()
			.call({
				from: accounts[0]
		})
			this.setState({address:addressEl})
		} catch (e) {
			throw e.message
		}
	};

	createElectionETH = async (event) => { 
		if(web3.utils.isAddress(this.state.address1)){
			try{
				const accounts = await web3.eth.getAccounts();
				var isProposalRound = (this.state.checked)? 1:0
				await factory.methods
					.createElection(this.state.nameOfTheElection, this.state.address1, isProposalRound, isProposalRound)
					.send({
						from: accounts[0]
					});
			} catch (e) {
				console.log(e.message)
			}
		} else {
			this.setState({ errorMessage: 'Adresa člana dozornej rady nie je ethereova' })
			throw new Error('Adresa člana dozornej rady nie je ethereova');
		}
	}

	createElectionDB = async (event) => { 
		const election = await Election(this.state.address)
		const summary = await election.methods.getSummary().call()
		let numberOfAdmins = summary[4]

		axios.put(constants.ADDRESS + '/newElection',
		{
			headers: {
				'Content-Type': 'application/json',
				'token': this.state.token
			},
			nameOfTheElection: this.state.nameOfTheElection,
			descriptionOfElection: this.state.descriptionOfElection,
			address: this.state.address,
			numberOfAdministrators: numberOfAdmins
		}).catch(function (e) {
			console.log(e.message)
		});
	};

	saveKeys = async (event) => { 
		try{

			await this.createRSAKeys()

			if(this.state.RSAPubKey === ''){
				this.setState({ errorMessage: 'Volby neboli uspesne zalozene. Nevygenerovali sa kluce' })
			}else {
				try{	
					const accounts = await web3.eth.getAccounts()
					const election = Election(this.state.address);

					await election.methods
						.setRSAPubKey(this.state.RSAPubKey)
						.send({
							from: accounts[0]
						}).then(function(result){             
							alert('Volby boli uspesne zalozene. Nezabudni stiahnut kluc!')}).catch(function(e){
								alert('Volby neboli uspesne zalozene. Nevygenerovali sa kluce') 
								this.setState({ errorMessage: 'Volby neboli uspesne zalozene. Nevygenerovali sa kluce' })
								this.setState({RSAPubKey: 'Nepodarilo sa vygenerovat verejny kluc'});
								this.setState({RSAPrivKey: 'Nepodarilo sa vygenerovat privatny kluc'});                                         
					  		})                         
					
							  
					axios.put(constants.ADDRESS + '/saveRSAPublicKey', {
						headers: {
							'Content-Type': 'application/json',
							'token': this.state.token
						},
						address: this.state.address,
						RSAPubKey: this.state.RSAPubKey
					});
				} catch (e) {
					alert('Volby neboli uspesne zalozene. Nevygenerovali sa kluce') 
					this.setState({ errorMessage: 'Volby neboli uspesne zalozene. Nevygenerovali sa kluce' })
					this.setState({RSAPubKey: 'Nepodarilo sa vygenerovat verejny kluc'});
					this.setState({RSAPrivKey: 'Nepodarilo sa vygenerovat privatny kluc'});
					console.log(e.message)
				} 
			}	
		} catch (e) {
			this.setState({RSAPubKey: 'Nepodarilo sa vygenerovat verejny kluc'});
			this.setState({RSAPrivKey: 'Nepodarilo sa vygenerovat privatny kluc'});
			console.log(e.message)
		}
	}	

	electionCreated = async (event) => { 
		try{	

			const accounts = await web3.eth.getAccounts()
			const election = Election(this.state.address);
			var isProposalRound = (this.state.checked)? 1:0

			let rsaKeyEth = ''

			rsaKeyEth = await election.methods
			   .RSA_pub_key()
			   .call({
				   from: accounts[0]
			   })

			if(rsaKeyEth != ''){
				axios.put(constants.ADDRESS + '/setElectionAsCreatedWithKeys', {
					headers: {
						'Content-Type': 'application/json',
						'token': this.state.token
					},
					address: this.state.address,
					proposal: isProposalRound
				});
		}
		} catch (e) {
			console.log(e.message)
			throw e.message
		}			
	}

	async createAdministrator(election, address, accounts) {

		await election.methods
			.createAdministrator(address)
			.send({
				from: accounts[0]
			})
	}

	createAdministrators = async () => {
		const election = Election(this.state.address);
		const accounts = await web3.eth.getAccounts();

		if (web3.utils.isAddress(this.state.address1)) {
			this.createAdministrator(election, this.state.address1, accounts)
		}
	}

	createRSAKeys = async () => {
		// returns [publicRSAPemKey, privateRSAPemKey]
		try{
			const response = await axios.get(constants.ADDRESS + '/newRSAKeys');
			this.setState({RSAPubKey: response.data.publicPem});
			this.setState({RSAPrivKey: response.data.privatePem});
		} catch (error) {
			console.log(error)
		}
	}


	onSubmit = async (event) => {
		event.preventDefault();

		if (this.state.admin) {
			this.setState({ loading: true, errorMessage: '' });
		}

		this.setState({ loading: true, errorMessage: '' });

		if (this.state.nameOfTheElection === '') {
			this.setState({ errorMessage: 'Nevyplnený názov volieb' })
			this.setState({ loading: false });
			return
		}

		if (this.state.address1 === '') {
			this.setState({ errorMessage: 'Nezadaná adresa administrátora volieb' })
			this.setState({ loading: false });
			return
		}

		if (this.state.selectedFile === null) {
			this.setState({ errorMessage: 'Prazdny subor volicov' })
			this.setState({ loading: false });
			return
		}

		try {
			this.setState({msg: 'Ukladam volby na blockchain. Nezabudni potvrdit v MetaMask'})
			alert('Ukladam volby na blockchain. Nezabudni potvrdit v MetaMask');
			await this.createElectionETH();
			this.setState({msg: 'Ziskavam informacie o ulozenych volbach'})
			await this.getLastElection();
			// await this.createAdministrators()
			this.setState({msg: 'Ukladam volby do databazy'})
			await this.createElectionDB()
			this.setState({msg: 'Vytvaram a ukladam kluce do databazy a na blockchain. Nezabudni potvrdi v MetaMask'})
			alert('Vytvaram a ukladam kluce do databazy a na blockchain. Nezabudni potvrdi v MetaMask');
			await this.saveKeys()
			await this.electionCreated();
			this.setState({msg: '\n' + 'Nezabudni si skopirovat privatny klúč !' + '\n'
			+ 'Nájdeš ho nižšie.'})
			this.setState({ loading: false });
			await this.onClickHandler();

		} catch (e){
			this.setState({ errorMessage: e.message });
			this.setState({ loading: false });
		}

		this.setState({ loading: false });
	};

	onChangeHandler = event => {
		this.setState({
			selectedFile: event.target.files[0],
			loaded: 0,
		})
	}

	onClickHandler = async () => {
		const data = new FormData()
		data.append('file', this.state.selectedFile)
		
		const response = await axios.post(constants.ADDRESS + "/upload", data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			params:{
				address: this.state.address
			}
		})
	}

	toggle = () => {
		this.setState({checked: !this.state.checked})
	}
	
	render() {
		const { activeIndex } = this.state
		return (
			<Layout>
				<h3> Vytvor nové voľby </h3>
				<div>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.msg}>
						<Form.Field required>
							<label>Názov volieb</label>
							<Input
								placeholder='Prezidentské voľby, Káčerovo 2020'
								value={this.state.nameOfTheElection}
								onChange={event => this.setState({ nameOfTheElection: event.target.value })}
							/>
						</Form.Field>

						<Form.Field>
							<label>Popis</label>
							<TextArea
								autoHeight
								placeholder='Popis volieb'
								value={this.state.description}
								onChange={event => this.setState({ descriptionOfElection: event.target.value })} />
						</Form.Field>

						<Form.Field required>
							<label>Adresa člena dozornej rady</label>
							<Input
								value={this.state.address1}
								onChange={event => this.setState({ address1: event.target.value })}
							/>
						</Form.Field>

						<Form.Field>
						<div>
							<Checkbox
							toggle
							label='Navrhove kolo'
							onChange={this.toggle}
							checked={this.state.checked}
							/>
						</div>							
						</Form.Field>

						<Form.Field>
							<label>Zoznam voličov</label>
							<input type="file" name="file" onChange={this.onChangeHandler} />	
						</Form.Field>

						<Message error header="Ojoj, niečo sa pokazilo!" content={this.state.errorMessage} />
						<Message success header='Výborne!' content={this.state.msg}/>

						<Button loading={this.state.loading} color={constants.COLOR}>Vytvor!</Button>                        
					</Form>
				</div>

				<Accordion style={{ marginTop: '50px', marginBottom: '50px' }}> 
						<Label color={constants.COLOR} size={'medium'}>
                            Privátny RSA klúč
                        </Label> 
						<Button color={constants.COLOR} onClick={this.downloadTxtFile }>Stiahni</Button>
				</Accordion>

			</Layout>
		);
	}
}

export default ElectionNew;