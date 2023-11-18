import {
  ChatView,
  CreateGroupModal,
  MODAL_POSITION_TYPE,
} from "@pushprotocol/uiweb";
import { useEffect, useState, useRef } from "react";
import { PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { QRCodeSVG } from "qrcode.react";
import Svgdef from "./images/app_2.svg";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import CustomMap from "./components/Map";

function App() {
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [createGroupModal_page2, setCreateGroupModal_page2] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [alice, setAlice] = useState(null);
  const [name, setName] = useState("istanbul");
  const [description, setDescription] = useState("istanbul");
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [groupIdOfQR, setGroupIdOfQR] = useState("");

  // CreateGroup Page 1 values
  const groupNameRef = useRef(null);
  const groupDescriptionRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  // CreateGroup Page 2 values
  const [isPrivate, setIsPrivate] = useState(false);

  let selectedCoordinates = null

  function setPolygonCoordinates(inputCoords) {
    const temp = JSON.stringify(inputCoords);
    selectedCoordinates = JSON.parse(temp);
    console.log(selectedCoordinates);
  }

  function createAccessURL() {
    let c = selectedCoordinates;
    const url = `${import.meta.env.VITE_BACKEND_URL}/push/${c[0][1]}/${c[1][1]}/${c[2][1]}/${c[3][1]}/${c[0][0]}/${c[1][0]}/${c[2][0]}/${c[3][0]}/{{user_address}}/checkAccess`;
    return url;
  }

  async function createGroup() {
    console.log(alice);
    const createdGroup = await alice.chat.group.create(name, {
      description: description,
      private: isPrivate,
      image:
        "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-consensys/events/ethglobal%20istanbul%20logo%20400x400.png",
      rules: {
        entry: {
          conditions: {
            type: "PUSH",
            category: "CustomEndpoint",
            subcategory: "GET",
            data: {
              url: "https://ethglobal-istanbul-backend.onrender.com/push/2845383/2830003/2939042/2953599/4142161/4105397/4075713/4117192/{{user_address}}/checkAccess",
            },
          },
        },
      },
    });

    console.log(createdGroup);
  }

  async function joinGroup(groupChatId) {
    const joinGroup = await alice.chat.group.join(groupChatId);

    console.log(joinGroup);
  }

  useEffect(() => {
    async function fetchChats() {
      const aliceChats = await alice.chat.list("CHATS");

      setChats(aliceChats);
    }

    fetchChats();
  }, [alice]);

  useEffect(() => {
    async function fetchSigner() {
      if (typeof window === "undefined") return;
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const user = await PushAPI.initialize(signer, {
        env: "prod",
      });

      setAlice(user);
    }

    fetchSigner();
  }, []);

  function handleGroupLayout_page2_back(e) {
    setCreateGroupModal_page2(false);
    setCreateGroupModal(true);
  }

  function handleGroupLayout_page1_next(e) {
    setGroupName(groupNameRef.current.value);
    setGroupDescription(groupDescriptionRef.current.value);
    setCreateGroupModal(false);
    setCreateGroupModal_page2(true);
  }

  function CreateGroupModal() {
    return (
      <div
        className={
          "fixed left-0 top-0 bg-opacity-50 h-screen w-[100vw] z-50 flex flex-col"
        }
      >
        <div
          className={
            "relative flex flex-col justify-around items-center bg-[#ffffff] space-y-1 mx-auto my-auto h-[80vh] w-1/3 border border-gray-300 px-10 rounded-xl text-black"
          }
        >
          <h1 className="text-3xl text-center">Create Group</h1>
          <button
            onClick={() => setCreateGroupModal(false)}
            className="absolute right-0 top-0 p-2"
          >
            <AiOutlineClose size={32} />
          </button>
          <div className="w-[10vw] h-[10vh] rounded-xl flex justify-center">
            <img src={Svgdef} alt="rounded-xl" />
          </div>
          <div className={"w-full"}>
            <label className={"block text-lg"}>Group Name</label>
            <input
              type={"text"}
              placeholder={"Test Group"}
              className={
                "border border-gray-800 rounded-lg h-10 w-full placeholder:text-md px-4"
              }
              ref={groupNameRef}
            />
          </div>
          <div className="mt-4 h-[20vh] w-full">
            <label className="block text-lg">Group Description</label>
            <textarea
              rows={5}
              cols={35}
              placeholder={"Here is a gate group example"}
              className="p-4 border border-gray-800 rounded-lg h-full placeholder:text-sm px-4 w-full"
              ref={groupDescriptionRef}
            />
          </div>

          <button
            className="bg-[#D975BB] rounded-lg w-[15vw] h-[6vh] mt-4 text-[#ffffff] hover:opacity-50"
            onClick={handleGroupLayout_page1_next}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  function CreateGroupModal_page2() {
    console.log(isPrivate);
    return (
      <div
        className={
          "fixed left-0 top-0 bg-opacity-50 h-screen w-[100vw] z-50 flex flex-col"
        }
      >
        <div
          className={
            "relative flex flex-col justify-around items-center bg-[#ffffff] space-y-1 mx-auto my-auto h-[80vh] w-1/3 border border-gray-300 px-10 rounded-xl text-black"
          }
        >
          <h1 className="text-3xl text-center">Create Group</h1>
          <button
            onClick={handleGroupLayout_page2_back}
            className="absolute left-0 top-0 p-2"
          >
            <IoMdArrowBack size={32} />
          </button>
          <button
            onClick={() => setCreateGroupModal_page2(false)}
            className="absolute right-0 top-0 p-2"
          >
            <AiOutlineClose size={32} />
          </button>

          <div
            className={
              "w-full h-[10vh] flex flex-row justify-center items-center text-sm"
            }
          >
            <div
              onClick={() => setIsPrivate(false)}
              className={`w-1/2 h-full text-center rounded-l-lg flex flex-col justify-center items-center border-solid border-2 ${
                isPrivate && "hover:bg-gray-100 hover:text-black "
              } hover:cursor-pointer ${
                !isPrivate ? "bg-blue-500 text-white" : ""
              }`}
            >
              <span className="text-md font-semibold">Public</span>
              <span className="font-light px-2 py-1">
                Anyone can view chats, even without joining
              </span>
            </div>
            <div
              onClick={() => setIsPrivate(true)}
              className={`w-1/2 h-full text-center rounded-r-lg flex flex-col justify-center items-center border-solid border-2 ${
                !isPrivate && "hover:bg-gray-100 hover:text-black "
              } hover:cursor-pointer ${
                isPrivate ? "bg-blue-500 text-white" : ""
              }`}
            >
              <span className="text-md font-semibold">Private</span>
              <span className="font-light px-2 py-1">
                Encrypted Chats, Users must join group to view
              </span>
            </div>
          </div>

          <CustomMap setPolygonCoordinates={setPolygonCoordinates} />

          <button
            className="bg-[#D975BB] rounded-lg w-[15vw] h-[6vh] text-[#ffffff] hover:opacity-50"
            style={{ marginTop: "-14px" }}
            onClick={createGroup}
          >
            Create Group
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={"bg-gray-300 w-full h-screen p-10"}>
      {showQR && (
        <div
          className={
            "fixed left-0 top-0 z-50 bg-opacity-60 bg-black w-full h-screen"
          }
        >
          <div
            className={
              "flex flex-col items-center justify-center mx-auto mt-40 rounded-2xl bg-gray-300 w-fit h-1/2 px-32 py-10"
            }
          >
            <QRCodeSVG value={qrValue} className={""} size={150}/>
            <span
              className={
                "border border-gray-600 px-4 py-2 rounded-lg mt-6 w-1/2 min-w-fit flex justify-center"
              }
            >
              {" "}
              {groupIdOfQR.slice(0, 10)}...
              {groupIdOfQR.slice(groupIdOfQR.length - 10)}{" "}
            </span>
            <button
              onClick={() => {
                joinGroup(groupIdOfQR);
              }}
              className={
                "border border-gray-600 px-4 py-2 rounded-xl mt-2 w-full"
              }
            >
              {" "}
              Join{" "}
            </button>
            <button
              onClick={() => setShowQR(false)}
              className={
                "border border-gray-600 px-4 py-2 rounded-xl mt-2 w-full"
              }
            >
              {" "}
              Back{" "}
            </button>
          </div>
        </div>
      )}
      <div className={"grid lg:grid-rows-2 lg:grid-cols-6 gap-10"}>
        <div
          className={
            "lg:col-span-2 border border-gray-800 px-4 py-5 rounded-3xl"
          }
        >
          <button
            className={"border border-gray-600 rounded-lg px-4 py-2"}
            onClick={() => setCreateGroupModal(true)}
          >
            Create Group
          </button>
          <div className="flex flex-col h-[90%] mt-10 justify-between">
            <div className="flex flex-col space-y-2">
              {chats
                .filter((x) => x.groupInformation)
                .map((x) => (
                  <div
                    key={x.chatId}
                    onClick={() => setSelectedChat(x.chatId)}
                    className="flex space-x-4 items-center px-4 py-3 cursor-pointer bg-gray-300 text-left rounded-3xl border-2 border-gray-600 w-full"
                  >
                    <img
                      src={x.groupInformation.groupImage}
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <span>{x.groupInformation?.groupName}</span>
                      <span className="text-gray-500">
                        {x.groupInformation?.groupDescription}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col space-y-2">
              <button
                className="flex space-x-4 items-center px-4 py-3 cursor-pointer bg-gray-300 text-left rounded-3xl border-2 border-gray-600 w-full"
                onClick={() => {
                  setQrValue(
                    "2845383 4142161 2830003 4105397 2939042 4075713 2953599 4117192"
                  );
                  setGroupIdOfQR(
                    "b7c697f215fdd033bcab2bbb7379d360bb753e2831446a564d58203dbf9cb65b"
                  );
                  setShowQR(true);
                }}
              >
                Join Istanbul Chat
              </button>
              <button className="flex space-x-4 items-center px-4 py-3 cursor-pointer bg-gray-300 text-left rounded-3xl border-2 border-gray-600 w-full">
                Join Barcelona Chat
              </button>
              <button className="flex space-x-4 items-center px-4 py-3 cursor-pointer bg-gray-300 text-left rounded-3xl border-2 border-gray-600 w-full">
                Join Paris Chat
              </button>
            </div>
          </div>
        </div>
        {createGroupModal && (
          <div className={"absolute "}>
            <CreateGroupModal onClose={() => setCreateGroupModal(false)} />
          </div>
        )}
        {createGroupModal_page2 && (
          <div className={"absolute "}>
            <CreateGroupModal_page2
              onClose={() => setCreateGroupModal_page2(false)}
            />
          </div>
        )}

        <div className={"lg:col-span-4 h-[90vh]"}>
          <ChatView
            chatId={selectedChat}
            limit={10}
            verificationFailModalPosition={MODAL_POSITION_TYPE.RELATIVE}
            env="staging"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
