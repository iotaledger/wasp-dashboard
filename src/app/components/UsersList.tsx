import "./UsersList.scss";
import React from "react";
import { User } from "../../services/wasp_client";
import UserTile from "./UserTile";

interface UsersListProps {
    /**
     * List of users.
     * @type {User[]}
     */
    users: User[];
    /**
     * Refresh the list of users.
     */
    refreshUsers: () => void;
    /**
     * Whether there is more than one user.
     * @type {boolean}
     */
    moreThanOneUser: boolean;
}

const UsersList: React.FC<UsersListProps> = ({ users, refreshUsers, moreThanOneUser }) => (
    <div className="users-list">
        {users.map((user, idx) => (
            <UserTile key={idx} user={user} refreshUsers={refreshUsers} moreThanOneUser={moreThanOneUser} />
        ))}
    </div>
);

export default UsersList;
