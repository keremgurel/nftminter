import { useEffect, useState } from 'react';
import { connectWallet, getCurrentWalletConnected, mintNFT } from './util/interact.js';
import mintify from './images/mintify.png';

const Minter = (props) => {
	const [walletAddress, setWallet] = useState('');
	const [status, setStatus] = useState('');

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [url, setURL] = useState('');

	// eslint-disable-next-line
	useEffect(async () => {
		const { address, status } = await getCurrentWalletConnected();

		setWallet(address);
		setStatus(status);

		addWalletListener();
	}, []);

	function addWalletListener() {
		if (window.ethereum) {
			window.ethereum.on('accountsChanged', (accounts) => {
				if (accounts.length > 0) {
					setWallet(accounts[0]);
					setStatus('👆🏽 Write a message in the text-field above.');
				} else {
					setWallet('');
					setStatus('🦊 Connect to Metamask using the top right button.');
				}
			});
		} else {
			setStatus(
				<p>
					{' '}
					🦊{' '}
					<a target='_blank' href={`https://metamask.io/download.html`}>
						You must install Metamask, a virtual Ethereum wallet, in your browser.
					</a>
				</p>
			);
		}
	}

	const connectWalletPressed = async () => {
		const walletResponse = await connectWallet();
		setStatus(walletResponse.status);
		setWallet(walletResponse.address);
	};

	const onMintPressed = async () => {
		const { success, status } = await mintNFT(url, name, description);
		setStatus(status);
		if (success) {
			setName('');
			setDescription('');
			setURL('');
		}
	};

	return (
		<div className='Minter'>
			<button id='walletButton' onClick={connectWalletPressed}>
				{walletAddress.length > 0 ? (
					'Connected: ' +
					String(walletAddress).substring(0, 6) +
					'...' +
					String(walletAddress).substring(38)
				) : (
					<span>Connect Wallet</span>
				)}
			</button>

			<br></br>
			<img src={mintify} alt='mintify logo' className='logo' />
			<p className='instructions'>
				Turn you art into an NFT! Simply fill in your asset details below and press Mint NFT.
			</p>
			<form>
				<h2>Link to asset: </h2>
				<input
					type='text'
					placeholder='e.g. https://gateway.pinata.cloud/ipfs/<hash>'
					onChange={(event) => setURL(event.target.value)}
				/>
				<h2>Name: </h2>
				<input type='text' placeholder='' onChange={(event) => setName(event.target.value)} />
				<h2>Description: </h2>
				<input
					type='text'
					placeholder=''
					onChange={(event) => setDescription(event.target.value)}
				/>
			</form>
			<button id='mintButton' onClick={onMintPressed}>
				Mint NFT
			</button>
			<p id='status' style={{ color: 'red' }}>
				{status}
			</p>
			<h3 id='subheading'>Powered By Alchemy</h3>
		</div>
	);
};

export default Minter;
