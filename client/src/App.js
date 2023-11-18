import Footer from './Components/Footer/Footer';
import QrCodeScanner from './Pages/QR/QR';
import MainPage from './Pages/Mainpage/Mainpage';
import Landingpage from './Pages/Landing/Landingpage';

import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="flex flex-col h-[100vh] text-purple font-bold flex-grow mx-auto max-w-screen-xl">
            <Routes>

                <Route exact path="/" element={<MainPage />} />
                <Route exact path="/qr" element={<QrCodeScanner />} />
                <Route exact path="/landingPage" element={<Landingpage />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;

