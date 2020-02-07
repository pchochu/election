import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Form, Button, TextArea, Label, Accordion, Icon, Message} from 'semantic-ui-react';
import axios from 'axios';
import Election from '../../../ethereum/election';
import web3 from '../../../ethereum/web3';
const {constants} = require('../../../helper/constants').default;
import {Router} from '../../../routes'

class GenerateKeys extends Component{
	state = {
        RSAPubKey: '',
		RSAPrivKey: '',
        back: false,
        activeIndex: -1,
        loading: false,
        errorMessage: '',
        infoMessage: '',
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
	}

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
	}

    static async getInitialProps(props){
        const election = Election(props.query.address);
        const address = props.query.address
        const jwt = getJwtAdministration()
    return {address, election, jwt};
    }

    downloadTxtFile = () => {
		const element = document.createElement("a");
		const file = new Blob([this.state.RSAPrivKey], {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = "myFile.txt";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	}
    
    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
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

        electionCreated = async (event) => { 
            try{	

                const accounts = await web3.eth.getAccounts()
                const election = Election(this.props.address);
                const propRunning = await election.methods.proposalIsRunning().call();

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
                            'token': this.props.jwt
                        },
                        address: this.props.address,
                        proposal: propRunning
                    });
                }

            } catch (e) {
                console.log(e.message)
                throw e.message
            }			
        }

    onSubmit = async (event) => {

        event.preventDefault();
        this.setState({errorMessage: ''})
        this.setState({infoMessage: ''})
        this.setState({loading: true})

        try{
            await this.createRSAKeys()
        } catch (err) {
            this.setState({ errorMessage: 'Neboli spravne vygenerovane kluce' })
            console.log(err.message)
            return
        }

        try{
            const accounts = await web3.eth.getAccounts()

            this.setState({msg: 'Vytvaram a ukladam kluce do databazy a na blockchain. Nezabudni potvrdi v MetaMask'})

            const election = Election(this.props.address);
            await election.methods
            .setRSAPubKey(this.state.RSAPubKey)
            .send({
                from: accounts[0]
            }).then(function(result){             
                alert('Uspesne si ulozil kluc na ETH!')}).catch(() => {
                    alert('RSA kluc nebol uspesne ulozeny na ETH') 
                    this.setState({ errorMessage: 'Nastal problem pri ukladani kluca na ETH' })
                    this.setState({RSAPubKey: 'Nepodarilo sa vygenerovat verejny kluc'});
                    this.setState({RSAPrivKey: 'Nepodarilo sa vygenerovat privatny kluc'});                                         
                    })        


            axios.put(constants.ADDRESS + '/saveRSAPublicKey', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': this.props.jwt
                },
                    address: this.props.address,
                    RSAPubKey: this.state.RSAPubKey
                }).catch(() => {
                    this.setState({ errorMessage: 'Nebol spravne ulozeny RSA kluc do DB. Zaloz ine volby' })
                    return
                });
            
            await this.electionCreated()

            this.downloadTxtFile()
        } catch (e) {
            console.log(e.message)
        }
        
        this.setState({ loading: false })
    }


	render() {
		return(
			<Layout>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.msg}>               
                    <Accordion style={{ marginTop: '50px', marginBottom: '50px' }}> 
                            <Label color={constants.COLOR} size={'medium'}>
                                Privátny RSA klúč
                            </Label> 
                            <Button color={constants.COLOR } loading={this.state.loading}>Vytvor a stiahni RSA kluc</Button>
                    </Accordion>
                    <Message error header="Ojoj, niečo sa pokazilo!" content={this.state.errorMessage} />
					<Message success header='Výborne!' content={this.state.msg}/>
                </Form>
			</Layout>
		);
	}
}

export default GenerateKeys;