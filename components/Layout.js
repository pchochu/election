import React from 'react';
import Header from './Header';
import {Container} from 'semantic-ui-react';
import Head from 'next/head'

export default (props) => {
	return (
		<Container>
			<Head>
				<link
					rel="stylesheet"
					href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
				/>
				<script src="https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js"></script> 
			</Head>
			<Header />
			<Container style={{ marginTop: '7em' }}>
				{props.children}
			</Container>
			
		</Container>
	);
};