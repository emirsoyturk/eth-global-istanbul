import {ChatView, CreateGroupModal, MODAL_POSITION_TYPE} from "@pushprotocol/uiweb";
import {useEffect, useState} from "react";
import * as userAlice from "@pushprotocol/restapi";

function App() {

    const [createGroupModal, setCreateGroupModal] = useState(false)

    useEffect(() => {
        async function fetchChats() {
            const aliceChats = await userAlice.chat.chats({
                account: "0x891f7737CeedC31dC149Cbe6950321345d06477D"
            })

            console.log('ALICE: ' +  aliceChats)
        }

        fetchChats()
    }, []);

    return (
        <div className={"bg-gray-300 w-full h-screen p-10"}>
            <div className={"grid lg:grid-rows-2 lg:grid-cols-5"}>
                <div className={"lg:col-span-1 border border-gray-800 px-4 py-5 rounded-3xl"}>
                    <button className={"border border-gray-600 rounded-lg px-4 py-2"}
                            onClick={() => setCreateGroupModal(true)}
                    >
                        Create Group
                    </button>
                </div>
                {
                    createGroupModal &&
                    <div className={"absolute "}>
                        <CreateGroupModal
                            onClose={() => setCreateGroupModal(false)}
                        />
                    </div>
                }
                <div className={"lg:col-span-4 h-[90vh]"}>
                    <ChatView
                        chatId="b8e068e02fe12d7136bc2f24408835573f30c6fbf0b65ea26ab4c7055a2c85f1"
                        limit={10}
                        verificationFailModalPosition={MODAL_POSITION_TYPE.RELATIVE}
                    />
                </div>
            </div>
        </div>
    )
}

export default App
