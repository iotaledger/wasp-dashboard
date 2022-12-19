import React, { useState } from "react";
import { User } from "../../services/wasp_client";
import DeleteUserDialog from "./dialogs/DeleteUserDialog";
import "./UserTile.scss";

interface UserTileProps {
    /**
     * User to show.
     * @type {User}
     */
    user: User;
    /**
     * Refresh the list of users.
     */
    refreshUsers: () => void;
    /**
     * Whether there is more than one user.
     * @type {boolean}
     */
    canBeDeleted: boolean;
}

const UserTile: React.FC<UserTileProps> = ({ user, refreshUsers, canBeDeleted }) => {
    const [showDeleteUserDialog, setShowDeleteUserDialog] = useState<boolean>(false);
    return (
        <div className="user-panel--item card">
            <div className="col user-data">
                <h4>Username</h4>
                <p>{user?.username}</p>
                <div className="margin-t-s">
                    <h4>Permissions</h4>
                    <div className="permissions-wrapper">
                        {user?.permissions?.map((permission, idx) => (
                            <div className="permission-item" key={idx}>
                                <p>{permission}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="buttons-wrapper">
                <button type="button" className="edit-button" onClick={() => console.log("edit")}>
                    Edit
                </button>
                {canBeDeleted && (
                    <button
                        type="button"
                        className="delete-button card--action card--action-danger"
                        onClick={() => setShowDeleteUserDialog(true)}
                    >
                        Delete
                    </button>
                )}
            </div>
            {showDeleteUserDialog && (
                <DeleteUserDialog
                    onClose={() => {
                        setShowDeleteUserDialog(false);
                    }}
                    user={user}
                    onUserDeleted={refreshUsers}
                />
            )}
        </div>
    );
};

export default UserTile;
