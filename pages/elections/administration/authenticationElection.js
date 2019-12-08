import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Router} from '../../../routes';
import web3 from '../../../ethereum/web3'
import {Message} from 'semantic-ui-react'
import factory from '../../../ethereum/factory'


class Authentication extends Component{

        static async getInitialProps(){
				const accounts = await web3.eth.getAccounts();

				const address = accounts[0]
            return {address};
		}
		
        pushForward() {
			if(this.props.address == undefined){
				return <Message negative>
						<Message.Header>Ojoj, nastal nejaký problém</Message.Header>
                        <p>Pravdepodobne nemáš nainštalovanú MetaMask</p>
						<p>Skús znovu kliknúť na tlačítko Administrácia volieb</p>
					</Message>
			} else{
				Router.pushRoute(`/elections/${this.props.address}/administrationElections/`)
			}
    }

	render(){
		return(	
			<Layout>
				<div>
					{this.pushForward()}
				</div>
			</Layout>
	)};
}

export default Authentication;