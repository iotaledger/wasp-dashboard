import "./Users.scss";
import React, { useEffect, useState } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import { User } from "../../services/wasp_client/models";
import { WaspClientService } from "../../services/waspClientService";
import AddUserDialog from "../components/dialogs/addUserDialog";
import UsersList from "../components/UsersList";

const Users: React.FC = () => {
    /**
     * The users service.
     * @private
     * @type {UsersService}
     */

    /**
     * The users state.
     */
    const [usersList, setUsersList] = useState<User[]>([]);

    /**
     * The state to handle "Add User" dialog.
     */
    const [showAddUserDialog, setShowAddUserDialog] = useState<boolean>(false);

    /**
     * The component mounted.
     */
    useEffect(() => {
        loadAllUsers();
    }, []);

    /**
     * Load all the users
     */
    function loadAllUsers(): void {
        const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waspClientService
            .users()
            .getUsers()
            .then((allUsers) => {
                setUsersList(allUsers);
            });
    }

    return (
        <div className="users">
            <div className="content">
                <div className="row spread">
                    <h2>Users</h2>
                    <div className="row">
                        <button type="button" className="add-button" onClick={() => setShowAddUserDialog(true)}>
                            Add User
                        </button>
                    </div>
                </div>
                {showAddUserDialog && (
                    <AddUserDialog onClose={() => setShowAddUserDialog(false)} onUserAdded={loadAllUsers} />
                )}
                <div className="users-panel">
                    <UsersList users={usersList} refreshUsers={loadAllUsers} moreThanOneUser={usersList.length > 1} />
                </div>
            </div>
        </div>
    );
};
export default Users;
