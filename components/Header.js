import React from 'react';
import {Menu, Container, Image, Dropdown, Icon} from 'semantic-ui-react';
import {Link} from '../routes';
const {constants} = require('../helper/constants').default;

export default () => {
	return (
		<Menu fixed='top' inverted color={constants.COLOR} borderless>
			<Container>
				<Link route="/">
						<Menu.Item as='a' header>
							<Image size='mini' src='https://procesy.pef.mendelu.cz/images/logo.png' style={{ marginRight: '1.5em' }} />
							Hlavná stránka
						</Menu.Item>
				</Link>

				<Link route="/elections/crypto/controlVote">
						<Menu.Item as='a' header>
							<Image size='mini' src='https://images.vexels.com/media/users/3/129762/isolated/preview/b8013d3077f62d29bce2664db694246b-check-flat-icon-by-vexels.png' style={{ marginRight: '1.5em' }} />
							Skontroluj hlas
						</Menu.Item>
				</Link>
			
			<Menu.Menu position="right">
				<Link route="/elections/administration/authenticationElection">
					<a className="item">
					<Icon name='settings' />
						Správa volieb
					</a>
				</Link>
				<Link route="/elections/administration/authentication">
					<a className="item">
					<Icon name='settings' />
						Administrácia volieb
					</a>
				</Link>
			</Menu.Menu>
			</Container>
	  	</Menu>

		);
};