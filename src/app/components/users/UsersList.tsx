import "./UsersList.scss";
import React from "react";
import { User } from "../../../lib";
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
    onDeleteSuccess: (user: User) => void;
    /**
     * Whether there is more than one user.
     * @type {boolean}
     */
    canBeDeleted: boolean;
}

const UsersList: React.FC<UsersListProps> = ({ users, onDeleteSuccess, canBeDeleted }) => {
    const orderedUsers = users.sort((a, b) => a.username?.localeCompare(b.username as string) as number);
    return (
        <div className="users-list">
            {orderedUsers.map((user, idx) => (
                <UserTile
                    key={idx}
                    user={user}
                    onDeleteSuccess={() => onDeleteSuccess(user)}
                    canBeDeleted={canBeDeleted}
                />
            ))}
        </div>
    );
};

export default UsersList;
