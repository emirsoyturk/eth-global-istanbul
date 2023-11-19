import Footer from './Components/Footer/Footer';
import QrCodeScanner from './Pages/QR/QR';
import MainPage from './Pages/Mainpage/Mainpage';
import Landingpage from './Pages/Landing/Landingpage';
import { Route, Routes } from 'react-router-dom';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'
import RecentBorders from './Pages/RecentBorders/RecentBorders';

// 1. Get projectId
const projectId = '6f3d6e0a432176df529426e6531f671b'

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

function App() {
    return (
        <WagmiConfig config={wagmiConfig}>
            <div className="flex flex-col h-[100vh] text-purple font-bold flex-grow mx-auto max-w-screen-xl bg-[#E1E1E1]">
                <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route exact path="/homePage" element={<MainPage />} />
                    <Route exact path="/qr" element={<QrCodeScanner />} />
                    <Route exact path="/landingPage" element={<Landingpage />} />
                    <Route exact path="/recentborders" element={<RecentBorders />} />
                </Routes>

                <Footer />
            </div>
        </WagmiConfig>
    );
}

export default App;

