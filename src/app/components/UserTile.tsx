import React from "react";
import { User } from "../../services/wasp_client";
import "./UserTile.scss";

interface UserTileProps {
    /**
     * User to show.
     * @type {User}
     */
    user: User;
}

const UserTile: React.FC<UserTileProps> = ({ user }) => (
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

            <button
                type="button"
                className="delete-button card--action card--action-danger"
                onClick={() => console.log("delete")}
            >
                Delete
            </button>
        </div>
    </div>
);

export default UserTile;
