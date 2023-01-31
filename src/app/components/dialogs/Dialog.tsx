import React, { FC, ReactNode, useEffect, useRef } from "react";
import { CloseIcon } from "../../../assets";
import IconButton from "../IconButton";
import "./Dialog.scss";

interface DialogProps extends React.PropsWithChildren {
    /**
     * The title to show on the dialog.
     */
    title: string;

    /**
     * The dialog actions.
     */
    actions?: ReactNode;

    /*
     * Extra classes for the dialog content
     */
    classnames?: string;

    /**
     * The dialog close event.
     */
    onClose?: () => void;
}

const Dialog: FC<DialogProps> = ({ title, children, actions, onClose, classnames }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (onClose) {
            dialogRef.current?.addEventListener("click", e => {
                if (e.target === dialogRef.current && onClose) {
                    onClose();
                }
            });
        }
    }, [dialogRef]);
    return (
        <React.Fragment>
            <div className="dialog-click-shield" />
            <div className="dialog-container" ref={dialogRef}>
                <div className={`dialog ${classnames}`}>
                    <div className="dialog-header row">
                        <h1>{title}</h1>
                        {onClose && (
                            <IconButton
                                icon={<CloseIcon />}
                                onClick={onClose}
                                classnames="icon-button dialog-header-close"
                            />
                        )}
                    </div>
                    <div className="dialog-content">{children}</div>
                    <div className="dialog-footer">{actions}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

Dialog.defaultProps = {
    actions: undefined,
    classnames: "",
    onClose: undefined,
};

export default Dialog;
