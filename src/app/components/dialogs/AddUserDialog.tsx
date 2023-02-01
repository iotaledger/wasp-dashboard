import React, { useMemo, useState } from "react";
import zxcvbn from "zxcvbn";
import { ServiceFactory, AddUserRequest, WaspClientService, MIN_PASSWORD_STRENGTH, Permissions } from "../../../lib";
import { PasswordInput, Dialog } from "../../components";

const FORM_INITIAL_VALUES: IFormValues = {
    username: "",
    permissions: [Permissions.Write, Permissions.Read],
    password: "",
};

interface IFormValues {
    username: string;
    permissions: string[];
    password: string;
}

interface IAddUserDialog {
    onClose: () => void;
    onSuccess?: () => void;
    onError?: () => void;
}

const AddUserDialog: React.FC<IAddUserDialog> = ({ onClose, onSuccess, onError }) => {
    const [formValues, setFormValues] = useState<IFormValues>(FORM_INITIAL_VALUES);
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Add the user.
     */
    async function handleAddUser(): Promise<void> {
        setError(null);
        try {
            const waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);

            const newUser: AddUserRequest = {
                username: formValues.username,
                permissions: formValues.permissions,
                password: formValues.password,
            };

            await waspClientService.users().addUser({ addUserRequest: newUser });
            if (onSuccess && typeof onSuccess === "function") {
                onSuccess();
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            if (onError && typeof onError === "function") {
                onError();
            }
        } finally {
            setIsBusy(false);
        }
    }

    /**
     * Handle the change of the input fields.
     * @param e The event.
     */
    function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    /**
     * Validate the form.
     */
    const validForm = useMemo(() => {
        if (formValues?.username?.length <= 0 || formValues?.password?.length <= 0) {
            return false;
        }
        const passwordStrength = zxcvbn(formValues?.password);
        if (passwordStrength.score < MIN_PASSWORD_STRENGTH) {
            setError(passwordStrength.feedback.suggestions.join(" "));
            return false;
        }
        setError(null);
        return true;
    }, [formValues]);

    /**
     * Handle the change of the permission checkboxes.
     * @param e The event.
     */
    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const permission = e.target.value as Permissions;
        if (e.target.checked) {
            setFormValues({ ...formValues, permissions: [...formValues.permissions, permission] });
        } else {
            setFormValues({ ...formValues, permissions: formValues.permissions?.filter(p => p !== permission) });
        }
    };

    return (
        <Dialog
            onClose={onClose}
            title="Add new user"
            actions={
                <React.Fragment>
                    <button
                        type="button"
                        className="button button--primary"
                        onClick={handleAddUser}
                        disabled={isBusy || !validForm}
                    >
                        Add
                    </button>
                    <button type="button" className="button button--secondary" disabled={isBusy} onClick={onClose}>
                        Cancel
                    </button>
                </React.Fragment>
            }
        >
            <React.Fragment>
                <p>Please enter the username and the password.</p>
                <div className="dialog-content-label">Username</div>
                <div className="dialog-value">
                    <input
                        type="text"
                        className="input--stretch"
                        placeholder="e.g. user1"
                        name="username"
                        value={formValues.username}
                        disabled={isBusy}
                        onChange={onChange}
                    />
                </div>
                <div className="dialog-content-label">Password</div>
                <div className="dialog-value">
                    <PasswordInput inputValue={formValues.password} onChange={onChange} disabled={isBusy} />
                </div>
                <div className="dialog-content-label">Permissions</div>
                <div className="dialog-content-value">
                    {Object.values(Permissions).map(permission => (
                        <div key={permission} className="row middle">
                            <input
                                type="checkbox"
                                value={permission}
                                onChange={handlePermissionChange}
                                checked={formValues.permissions?.includes(permission)}
                            />
                            <span className="margin-l-t">{permission}</span>
                        </div>
                    ))}
                </div>
                {error && <p className="dialog-content-error">{error}</p>}
            </React.Fragment>
        </Dialog>
    );
};
AddUserDialog.defaultProps = {
    onError: () => {},
    onSuccess: () => {},
};
export default AddUserDialog;
