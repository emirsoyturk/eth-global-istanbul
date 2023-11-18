import { ChatView, CreateGroupModal, MODAL_POSITION_TYPE } from "@pushprotocol/uiweb";
import { useEffect, useState } from "react";
import { PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import Svgdef from './images/app_2.svg'
import { AiOutlineClose } from "react-icons/ai";

function App() {

    const [createGroupModal, setCreateGroupModal] = useState(false)
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)
    const [alice, setAlice] = useState(null)
    const [name, setName] = useState('istanbul')
    const [description, setDescription] = useState('istanbul')

    async function createGroup() {
        const createdGroup = await alice.chat.group.create(name,
            {
                description: description,
                private: true,
                rules: {
                    entry: {
                        conditions: {
                            type: "PUSH",
                            category: 'CustomEndpoint',
                            subcategory: "POST",
                            data: {
                                url: "https://google.com/{{user_address}}/checkAccess"
                            }
                        }
                    }
                }
            }
        );
    }

    useEffect(() => {
        async function fetchChats() {
            const aliceChats = await alice.chat.list('CHATS')

            setChats((aliceChats))
        }

        if (chats.length === 0) {
            fetchChats()
        }
    }, [alice]);

    useEffect(() => {
        async function fetchSigner() {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const userAlice = await PushAPI.initialize(signer, { env: "prod" });

            setAlice(userAlice)

        }

        // fetchSigner()
    }, []);

    function CreateGroupModal() {
        return (
            <div className={"fixed left-0 top-0 bg-opacity-50 h-screen w-[100vw] z-50 flex flex-col"}>
                <div
                    className={"relative flex flex-col justify-around items-center bg-[#ffffff] space-y-1 mx-auto my-auto h-[80vh] w-1/3 border border-gray-300 px-10 rounded-xl text-black"}>
                    <h1 className="text-3xl text-center">Create Group</h1>
                    <button onClick={() => setCreateGroupModal(false)} className="absolute right-0 top-0 p-2"><AiOutlineClose size={32}/></button>
                    <div className="w-[10vw] h-[10vh] rounded-xl">
                        <img src={Svgdef} alt="rounded-xl" />
                    </div>
                    <div className={"w-full"}>
                        <label className={"block text-lg"}>
                            Group Name 
                        </label>
                        <input type={"text"} placeholder={"Test Group"}
                            className={"border border-gray-800 rounded-lg h-10 w-full placeholder:text-md px-4"} />
                    </div>
                    <div className="mt-4 h-[20vh] w-full">
                        <label className="block text-lg">
                            Group Description
                        </label>
                        <textarea
                            rows={5}
                            cols={35}
                            placeholder={"Here is a gate group example"}
                            className="p-4 border border-gray-800 rounded-lg h-full placeholder:text-sm px-4 w-full"
                        />
                    </div>

                    <button className="bg-[#D975BB] rounded-lg w-[15vw] h-[6vh] mt-4 text-[#ffffff]">Next</button>
                </div>
            </div>
        )
    }


    console.log(chats)

    return (
        <div className={"bg-gray-300 w-full h-screen p-10"}>
            <div className={"grid lg:grid-rows-2 lg:grid-cols-6 gap-10"}>
                <div className={"lg:col-span-2 border border-gray-800 px-4 py-5 rounded-3xl"}>
                    <button className={"border border-gray-600 rounded-lg px-4 py-2"}
                        onClick={() => setCreateGroupModal(true)}
                    >
                        Create Group
                    </button>
                    <div className={"flex flex-col mt-10 space-y-2"}>
                        {
                            chats.filter(x => x.groupInformation).map(x => {
                                return (
                                    <div key={x.chatId} onClick={() => setSelectedChat(x.chatId)}
                                        className={"flex space-x-4 items-center px-4 py-3 cursor-pointer bg-gray-300  text-left rounded-3xl border-2 border-gray-600 w-full "}>
                                        <img src={x.groupInformation.groupImage} width={40} height={40} />
                                        <div className={"flex flex-col"}>
                                            <span>
                                                {x.groupInformation?.groupName}
                                            </span>
                                            <span className={"text-gray-500"}>
                                                {x.groupInformation?.groupDescription}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
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
                        chatId={selectedChat}
                        limit={10}
                        verificationFailModalPosition={MODAL_POSITION_TYPE.RELATIVE}
                    />
                </div>
            </div>
        </div>
    )
}

export default App
