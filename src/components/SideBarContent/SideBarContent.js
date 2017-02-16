import React from 'react';
import { Link } from 'react-router'

import './SideBarContent.css';
import stormOrange from './stormOrange.png';

const styles = {
	sidebar: {
		width: 256,
		height: '100%',
	},
	sidebarLink: {
		display: 'block',
		padding: '30px 16px 16px 60px',
		color: 'white',
        fontSize: '16px',
		textDecoration: 'none',
	},
	divider: {
		margin: '8px 0',
		height: 1,
		backgroundColor: '#757575',
	},
	content: {
		width: 256,
        paddingTop: '25px',
		height: '100%',
		backgroundColor: '#232830',
	},
};

const SideBarContent = (props) => {
	return (
		<div style={styles.content}>
            <div className="image">
                <img src={stormOrange} alt="Storm Control" />
            </div>
            <div >
				<Link to="/subnetting" style={styles.sidebarLink}  >
					<div className="linkFade">Subnetting</div>
				</Link>
			</div>
            <div>
				<Link to="/converter" style={styles.sidebarLink}>
					<div className="linkFade">Decimal/Binary/Hex</div>
				</Link>
			</div>
             <div>
				<Link to="/bitsnbytes" style={styles.sidebarLink}>
					<div className="linkFade">Bits/Bytes</div>
				</Link>
			</div>
			<div>
				<Link to="/whois" style={styles.sidebarLink}>
					<div className="linkFade">Who Is</div>
				</Link>
			</div>
			<div>
				<Link to="/bgp" style={styles.sidebarLink}>
					<div className="linkFade">BGP</div>
				</Link>
			</div>
		</div>
	);
};

export default SideBarContent;