import React, {Component} from 'react'
import Layout from '../../../components/Layout'
import Election from '../../../ethereum/election'
import {Router} from '../../../routes'
import {Form, Button, Message, TextArea} from 'semantic-ui-react'
import axios from 'axios';
import {getJwtAdministration} from '../../../helper/jwtAdministration'
const {constants} = require('../../../helper/constants').default;

class SubmitResultsProposal extends Component{
	state = {
		rsa: '',
		account:'',
		results: '',
		msg: [],
		errorMessage: '',
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
                Router.pushRoute(`/elections/administration/login/2`);
            })
        } else {
            Router.pushRoute(`/elections/administration/login/2`);
		}
		this.setState({token:jwt})
	}

	static async getInitialProps(props){
		const {address, account, req} = props.query;
		
		return {address, account};
	}

	uploadWinner = async event => {
		try{
			if(this.state.results == '')
			{
				this.setState({ errorMessage: 'Neurceny vitaz' })
				this.setState({ loading: false });
				return
			}
			const election = Election(this.props.address);

			this.setState({loading:true})


			await election.methods
				.setProposalIsSet()
				.send({
					from: this.props.account
				})
			
			await election.methods
			.setResultOfProposal(this.state.results)
			.send({
				from: this.props.account
			})
			
			await axios.put(constants.ADDRESS + '/setFinishedUploadedProposal',
			{ 				headers: {
				'Content-Type': 'application/json',
				'token': this.state.token
			},
                	election_address:this.props.address,
			});

			this.setState({loading:false})

			Router.pushRoute(`/`) 
		} catch (error){
			console.log(error.message)
			this.setState({errorMessage:'Nastal problem pri nahravani hlasov na Ethereum'})
			this.setState({loading:false})
		}
	}
	onSubmit = async event => {
		event.preventDefault();
		this.setState({loading:true, errorMessage: '', msg: ''});
		
		if (this.state.rsa === ''){
			this.setState({errorMessage: 'Nevyplnený parameter RSA'})
			this.setState({loading:false});
			return
		}

		let getResults
		try{
        	getResults = await axios.get(constants.ADDRESS + '/getResultProposal',
			{ 
				headers: {
					'Content-Type': 'application/json',
					'token': this.state.token
				},
				params: {
                	election_address:this.props.address,
                	RSAkey:this.state.rsa,
				}
			});
		} catch (e){
			this.setState({errorMessage:'Nespravny kluc'});
			this.setState({loading:false})
			return
		}
		
		this.setState({results: getResults.data})

		var obj = JSON.parse(getResults.data)

		let resultInMsg = ''
		for (var prop in obj) {
			resultInMsg = resultInMsg + 'Kandidat ' + prop + ': ' + obj[prop] + '\n'
		  }
	
		this.setState({msg: resultInMsg})
		this.setState({loading:false});
	};


	render(){
		return(
			<Layout>
				<Form onSubmit={this.uploadWinner}>
					 <Button color={constants.COLOR} loading={this.state.loading} style={{ marginBottom: '25px' }} >Nahraj vysledok</Button>
				</Form>
				<h3>Nahranie hlasov</h3>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.results}>    
						<Form.Field>
							<label>RSA klúč</label>

							<TextArea 
								autoHeight 
								placeholder=''
								value={this.state.description}
								onChange={event => this.setState({rsa: event.target.value})} />
						</Form.Field>
						
						<Message success header='Výborne!' content={this.state.msg}/> 
						<Message error header="Ojoj, niečo sa pokazilo!" content={this.state.errorMessage} />
						<Button color={constants.COLOR} loading={this.state.loading}>Urci vitaza</Button>
					</Form>
					
			</Layout>
			);
	}
}

export default SubmitResultsProposal;