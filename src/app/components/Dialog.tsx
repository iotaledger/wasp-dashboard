import React, { FC, ReactNode, useEffect, useRef } from "react";
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

    /**
     * The dialog close event.
     */
    onClose?: () => void;
}

const Dialog: FC<DialogProps> = ({ title, children, actions, onClose }) => {
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
                <div className="dialog">
                    <div className="dialog-header row">
                        <h1>{title}</h1>
                        {onClose && (
                            <button type="button" className="icon-button dialog-header-close" onClick={onClose}>
                                &#x2715;
                            </button>
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
    onClose: undefined,
};

export default Dialog;
