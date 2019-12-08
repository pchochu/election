import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Router} from '../../../routes';
import web3 from '../../../ethereum/web3'
import {Message} from 'semantic-ui-react'
import factory from '../../../ethereum/factory'


class Authentication extends Component{

        static async getInitialProps(){
				const accounts = await web3.eth.getAccounts();
				console.log(accounts[0])
				let isFactory;
				if (accounts.length > 0){
					isFactory = await factory.methods.administrators(accounts[0]).call();
				}
                
				const address = accounts[0]
            return {address, isFactory};
		}
		
	static async componentDidMount() {
			const accounts = await web3.eth.getAccounts();
			console.log(accounts[0])
		  }

        pushForward() {
			if(this.props.address == undefined){
				return <Message negative>
						<Message.Header>Ojoj, nastal nejaký problém</Message.Header>
						<p>Pravdepodobne nemáš nainštalovanú MetaMask</p>
						<p>Skús znovu kliknúť na tlačítko Administrácia volieb</p>
					</Message>
			} else if (this.props.isFactory){
				Router.pushRoute(`/elections/${this.props.address}/administrationFactory/`)
			} else{
				Router.pushRoute(`/`)
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