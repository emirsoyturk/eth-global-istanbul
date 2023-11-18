import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi'
import { useNavigate } from 'react-router-dom';
import ConnectButton from './WalletConnect';

function Login() {
    const navigate = useNavigate();
    const { address, connector, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName })
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()
    const handleConnect = async (selectedConnector) => {
        await connect({ connector: selectedConnector });
        navigate('/homepage')
    };

    

/*     if (isConnected) {
        return (
            <div className='h-[100vh]'>
                <img src={ensAvatar} alt="ENS Avatar" />
                <div>{ensName ? `${ensName} (${address})` : address}</div>
                <div>Connected to {connector?.name}</div>
                <button onClick={disconnect}>Disconnect</button>
            </div>
        )
    } */

    return (
        <div className='h-[100vh] flex justify-center items-center'>
{/*             <div className='h-[50vh] w-[80vw] flex flex-wrap justify-between rounded-xl'>
            {connectors.map((connector) => (
                <button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => handleConnect(connector)}

                    className='inline-block rounded bg-purpleBlack px-6 pb-2 pt-2.5 text-xl text-pink shadow-xl w-full md:w-48 p-4 mb-4 md:mb-0'
                >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                </button>
            ))}

            {error && <div>{error.message}</div>}
            </div> */}
            <ConnectButton />
        </div>
    )
}

export default Login;