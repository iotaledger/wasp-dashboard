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
}

const UsersList: React.FC<UsersListProps> = ({ users }) => (
    <div className="users-list">
        {users.map((user, idx) => (
            <UserTile key={idx} user={user} />
        ))}
    </div>
);

export default UsersList;
