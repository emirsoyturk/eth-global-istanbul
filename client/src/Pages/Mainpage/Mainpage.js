import CardItem from "../../Components/CardItem/CardItem";
import SmallCards from "../../Components/SmallCardItem/SmallCards";
import Header from "../../Components/Header/Header";

function MainPage() {
    return (
        <div className="flex flex-col h-full text-purple font-bold flex-grow mx-auto max-w-screen-xl">
            <Header />
            <div className="flex-grow mx-auto max-w-screen-xl">
                <CardItem
                    title={"Total Distance:"}
                    subtitle={"-"}
                />
                <SmallCards />
            </div>
        </div>
    );
}

export default MainPage;
