import { EnokiLogin } from '../components/EnokiLogin'
import { useEnokiFlow } from '@mysten/enoki/react';

export const HomePage = () => {
  const enokiFlow = useEnokiFlow();
  const zkLoginState = enokiFlow.$zkLoginState.get();
  const address = zkLoginState.address;

  return (
    <div>
      {!address ? (
        <EnokiLogin />
      ) : (
        <div>
          <p>Welcome! Your address: {address}</p>
          <button onClick={async () => {
            await enokiFlow.logout();
            // Force a page refresh to clear the state
            window.location.reload();
          }}>Logout</button>
        </div>
      )}
    </div>
  )
}
