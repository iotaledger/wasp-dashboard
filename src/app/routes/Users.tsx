import "./Users.scss";
import React, { useEffect, useState } from "react";
import { WaspClientService, ServiceFactory, AuthService, User } from "../../lib";
import { AddUserDialog, UsersList } from "../components";

const Users: React.FC = () => {
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
            .then(allUsers => {
                setUsersList(allUsers);
            });
    }

    /**
     * Log out if the user deleted itself, otherwise just refresh the users list
     * @param deletedUser The deleted user.
     */
    function onDeleteSuccess(deletedUser: User): void {
        const authService = ServiceFactory.get<AuthService>(AuthService.ServiceName);
        const loggedUsername = authService.getUsername();

        if (loggedUsername === deletedUser.username) {
            authService.logout();
        } else {
            loadAllUsers();
        }
    }

    /**
     *
     */
    function handleAddUserSuccess(): void {
        loadAllUsers();
        closeAddUserDialog();
    }

    /**
     *
     */
    function closeAddUserDialog(): void {
        setShowAddUserDialog(false);
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
                {showAddUserDialog && <AddUserDialog onClose={closeAddUserDialog} onSuccess={handleAddUserSuccess} />}
                <div className="users-panel">
                    <UsersList
                        users={usersList}
                        onDeleteSuccess={onDeleteSuccess}
                        canBeDeleted={usersList.length > 1}
                    />
                </div>
            </div>
        </div>
    );
};
export default Users;
