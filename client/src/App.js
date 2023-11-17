import './App.css';
import Footer from './Components/Footer/Footer';
import QrCodeScanner from './Components/QR/QR';
import MainPage from './Pages/Mainpage/Mainpage';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="flex flex-col min-h-screen text-purple font-bold flex-grow mx-auto max-w-screen-xl">
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route exact path="/qr" element={<QrCodeScanner />} />
                <Route exact path="/landing" element={<h1>Landing Page</h1>} />
            </Routes>

            {/*                 <Header />
                <div className="flex-grow mx-auto max-w-screen-xl">
                    <CardItem title={"Baslik There"} subtitle={"Subtitle There"} imageSrc={DefaultImage} />
                    <SmallCards />
                </div> */}
            <Footer />
        </div>
    );
}

export default App;

