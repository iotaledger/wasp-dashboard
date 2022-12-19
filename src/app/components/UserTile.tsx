import React, { useState } from "react";
import { User } from "../../services/wasp_client";
import { EditUserDialog } from "./dialogs";
import "./UserTile.scss";

interface UserTileProps {
    /**
     * User to show.
     * @type {User}
     */
    user: User;
}

const UserTile: React.FC<UserTileProps> = ({ user }) => {
    const [showEditUserDialog, setShowEditUserDialog] = useState<boolean>(false);
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
                <button type="button" className="edit-button" onClick={() => setShowEditUserDialog(true)}>
                    Edit
                </button>
                <button
                    type="button"
                    className="delete-button card--action card--action-danger"
                    onClick={() => console.log("delete")}
                >
                    Delete
                </button>
            </div>
            {showEditUserDialog && (
                <EditUserDialog
                    onClose={() => {
                        setShowEditUserDialog(false);
                    }}
                    user={user}
                />
            )}
        </div>
    );
};

export default UserTile;
