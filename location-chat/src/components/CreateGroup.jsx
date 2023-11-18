import { CreateGroupModal } from "@pushprotocol/uiweb";

const CreateGroupModalTest = () => {
    return (
        <div>
            <CreateGroupModal onClose={()=>{console.log('closes the modal')}}/>
        </div>
    );
};

export default CreateGroupModalTest