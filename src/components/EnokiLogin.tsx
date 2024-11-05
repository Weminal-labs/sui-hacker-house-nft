import { useEnokiFlow } from '@mysten/enoki/react';
import { config } from '../config/env'

export function EnokiLogin() {
	const enokiFlow = useEnokiFlow();

	const handleSignIn = () => {
		const protocol = window.location.protocol;
		const host = window.location.host;
		// Set the redirect URL to the location that should
		// handle authorization callbacks in your app
		const redirectUrl = `${protocol}//${host}/auth`;

		enokiFlow
			.createAuthorizationURL({
				provider: 'google',
				network: 'testnet',
				clientId: config.GOOGLE_CLIENT_ID,
				redirectUrl,
				extraParams: {
					scope: ['openid', 'email', 'profile'],
				},
			})
			.then((url) => {
				window.location.href = url;
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<button onClick={handleSignIn}>Sign in with Google</button>
	);
}
