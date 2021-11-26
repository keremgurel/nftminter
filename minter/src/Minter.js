import { useEffect, useState } from 'react';
import { connectWallet, getCurrentWalletConnected } from './utils/interact.js';

const Minter = (props) => {
	//State variables
	const [walletAddress, setWallet] = useState('');
	const [status, setStatus] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [url, setURL] = useState('');

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
					<a target='_blank' rel='noreferrer' href={`https://metamask.io/download.html`}>
						You must install Metamask, a virtual Ethereum wallet, in your browser.
					</a>
				</p>
			);
		}
	}

	// eslint-disable-next-line
	useEffect(async () => {
		const { address, status } = await getCurrentWalletConnected();
		setWallet(address);
		setStatus(status);

		addWalletListener();
	}, []);

	const connectWalletPressed = async () => {
		const walletResponse = await connectWallet();
		setStatus(walletResponse.status);
		setWallet(walletResponse.address);
	};

	const onMintPressed = async () => {
		//TODO: implement
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
			<h1 id='title'>NFT Minter By Kerem G</h1>
			<h2>Powered by Alchemy</h2>
			<p>Turn your amazing art to an NFT by adding your asset details below!</p>
			<form>
				<h2>🖼 Link to asset: </h2>
				<input
					type='text'
					placeholder='e.g. https://gateway.pinata.cloud/ipfs/<hash>'
					onChange={(event) => setURL(event.target.value)}
				/>
				<h2>🤔 Name: </h2>
				<input
					type='text'
					placeholder='e.g. My first NFT!'
					onChange={(event) => setName(event.target.value)}
				/>
				<h2>✍️ Description: </h2>
				<input
					type='text'
					placeholder='e.g. Even cooler than cryptokitties ;)'
					onChange={(event) => setDescription(event.target.value)}
				/>
			</form>
			<button id='mintButton' onClick={onMintPressed}>
				Mint NFT
			</button>
			<p id='status'>{status}</p>
		</div>
	);
};

export default Minter;
