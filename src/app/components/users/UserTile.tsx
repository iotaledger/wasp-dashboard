import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "../../../assets";
import { Action, User } from "../../../lib";
import { DeleteUserDialog, EditUserDialog, IconButton } from "../../components";
import { usePermissions } from "../../hooks";
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
    /**
     * Success callback when the user is edited.
     */
    onEditSuccess?: () => void;
}

const UserTile: React.FC<UserTileProps> = ({ user, canBeDeleted, onDeleteSuccess, onDeleteError, onEditSuccess }) => {
    const [hasWritePermission] = usePermissions();
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
        if (onEditSuccess && typeof onEditSuccess === "function") {
            onEditSuccess();
        }
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
                <div className="info-actions-data">
                    <div>
                        <h4>Username</h4>
                        <p>{user?.username}</p>
                    </div>
                    <div className="buttons-wrapper">
                        <IconButton
                            disabled={!hasWritePermission}
                            icon={<EditIcon />}
                            onClick={() => setShowEditUserDialog(true)}
                            type={Action.Edit}
                        />
                        {canBeDeleted && (
                            <IconButton
                                disabled={!hasWritePermission}
                                icon={<DeleteIcon />}
                                onClick={() => setShowDeleteUserDialog(true)}
                                type={Action.Delete}
                            />
                        )}
                    </div>
                </div>
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
    onEditSuccess: () => {},
};

export default UserTile;
