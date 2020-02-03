import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message, TextArea, Accordion, Label, Checkbox, Icon } from 'semantic-ui-react';
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
		token: '',
      	admins: [{ name: "" }]
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
		this.setState({token:jwt})
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
		const {admins} = this.state;
		let result = admins.map(a => a.name);
		if(web3.utils.isAddress(result[0])){
			try{
				const accounts = await web3.eth.getAccounts();
				var isProposalRound = (this.state.checked)? 1:0
				await factory.methods
					.createElection(this.state.nameOfTheElection, result[0], isProposalRound, isProposalRound)
					.send({
						from: accounts[0]
					});
			} catch (e) {
				throw new Error('Problem pri ukladani volieb na Ethereum');
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
			throw new Error('Problem pri ukladani volieb do DB');
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
					throw new Error('Nepodarilo sa ulozit kluce na Ethereum');
				} 
			}	
		} catch (e) {
			this.setState({RSAPubKey: 'Nepodarilo sa vygenerovat verejny kluc'});
			this.setState({RSAPrivKey: 'Nepodarilo sa vygenerovat privatny kluc'});
			throw new Error('Nepodarilo sa vygenerovat kluc');
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
		try{
		await election.methods
			.createAdministrator(address)
			.send({
				from: accounts[0]
			})
		}catch (e){
			throw new Error('Nepodarilo sa ulozit administratora na Ethereum');
		}
	}

	createAdministrators = async () => {
		const election = Election(this.state.address);
		const accounts = await web3.eth.getAccounts();

		const {admins} = this.state;
		let result = admins.map(a => a.name);

		for(var i = 0; i < result.length; i++){
			if(web3.utils.isAddress(result[i])){
				this.createAdministrator(election, result[i], accounts)
			} 
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

		if (this.state.selectedFile === null) {
			this.setState({ errorMessage: 'Prazdny subor volicov' })
			this.setState({ loading: false });
			return
		}


		const {admins} = this.state;
		let result = admins.map(a => a.name);
		
		if(result.length == 0){
			this.setState({ errorMessage: 'Prazdny zoznam ethereum adries pre adminov' })
			this.setState({ loading: false });
		}

		var correctEthAdresses = true
		for(var i = 0; i < result.length; i++){
			if(result[i] != ''){
				if(!web3.utils.isAddress(result[i])){
					correctEthAdresses = false
				}	
			} else{
				correctEthAdresses = false
			}
		}
		
		if(!correctEthAdresses){
			this.setState({ errorMessage: 'Nevalidne adresy adminov. Nemas prazdne okno?' })
			this.setState({ loading: false });
		}
	

		try {
			this.setState({msg: 'Ukladam volby na blockchain. Nezabudni potvrdit v MetaMask'})
			alert('Ukladam volby na blockchain. Nezabudni potvrdit v MetaMask');
			await this.createElectionETH();
			this.setState({msg: 'Ziskavam informacie o ulozenych volbach'})
			await this.getLastElection();
			this.setState({msg: 'Ukladam administratorov na blockchain'})
			alert('Ukladam administratorov na blockchain, nezabudni potvrdit v MetaMask');
			await this.createAdministrators()
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

	
		handleNameChange = evt => {
			this.setState({ name: evt.target.value });
		};
	
	  handleAdminNameChange = idx => evt => {
		const newAdmin = this.state.admins.map((admin, sidx) => {
		  if (idx !== sidx) return admin;
		  return { ...admin, name: evt.target.value };
		});
	
		this.setState({ admins: newAdmin });
	  };
	
	  handleSubmit = evt => {
		const {admins} = this.state;
		let result = admins.map(a => a.name);
		console.log(result)
	  };
	
	  handleAddAdmin = () => {
		this.setState({
		  admins: this.state.admins.concat([{ name: "" }])
		});
	  };
	
	  handleRemoveAdmin = idx => () => {
		this.setState({
		  admins: this.state.admins.filter((s, sidx) => idx !== sidx)
		});
	  };

	
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

						

						{/* <Form.Field required>
							<label>Adresa člena dozornej rady</label>
							<Input
								value={this.state.address1}
								onChange={event => this.setState({ address1: event.target.value })}
							/>
						</Form.Field> */}

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
						
						<Form.Field required>
						<label>Adresy clenov dozornej rady</label>
							{this.state.admins.map((admin, idx) => (

							
							<div class="ui form" style={{marginBottom: '10px' }}>
							<div class="required eight wide field">
								<div class="ui action input">
								<input
								type="text"
								placeholder={`Ethereum adresa ${idx + 1}. admina`}
								value={admin.name}
								onChange={this.handleAdminNameChange(idx)}
								/>
								<Button icon color='red' onClick={this.handleRemoveAdmin(idx)} className="small"><Icon name='remove' /> </Button>
								</div>  
							</div>
							</div>))}
							
							<br></br>
							<Button color={constants.COLOR} type="button" onClick={this.handleAddAdmin} className="small">+</Button>
							{/* <Button color={constants.COLOR} type="button" onClick={ () => this.handleSubmit() }>Submit</Button> */}
						</Form.Field>
						<br></br>
						<br></br>


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