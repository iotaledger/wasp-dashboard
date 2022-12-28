import React, { useState } from "react";
import { User } from "../../../services/wasp_client";
import { DeleteUserDialog, EditUserDialog } from "../../components";
import "./UserTile.scss";

interface UserTileProps {
    /**
     * User to show.
     * @type {User}
     */
    user: User;
    /**
     * Whether there is more than one user.
     * @type {boolean}
     */
    canBeDeleted: boolean;
    /**
     * Success callback when the user is deleted.
     */
    onDeleteSuccess?: () => void;
    /**
     * Error callback when the user is deleted.
     */
    onDeleteError?: () => void;
}

const UserTile: React.FC<UserTileProps> = ({ user, canBeDeleted, onDeleteSuccess, onDeleteError }) => {
    const [showDeleteUserDialog, setShowDeleteUserDialog] = useState<boolean>(false);
    const [showEditUserDialog, setShowEditUserDialog] = useState<boolean>(false);

    /**
     *
     */
    function handleDeleteSuccess(): void {
        closeDeleteDialog();
        if (onDeleteSuccess && typeof onDeleteSuccess === "function") {
            onDeleteSuccess();
        }
    }

    /**
     *
     */
    function closeEditDialog(): void {
        setShowEditUserDialog(false);
    }

    /**
     *
     */
    function closeDeleteDialog(): void {
        setShowDeleteUserDialog(false);
    }

    return (
        <div className="user-panel-item card">
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
                    onClose={closeDeleteDialog}
                    user={user}
                    onSuccess={handleDeleteSuccess}
                    onError={onDeleteError}
                />
            )}
            {showEditUserDialog && <EditUserDialog onClose={closeEditDialog} user={user} onSuccess={closeEditDialog} />}
        </div>
    );
};
UserTile.defaultProps = {
    onDeleteError: () => {},
    onDeleteSuccess: () => {},
};

export default UserTile;
