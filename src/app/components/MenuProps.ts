import { ReactNode } from "react";

export interface MenuProps {
    /**
     * The buttons to display on the panel.
     */
    middle: {
        /**
         * The label for the button.
         */
        label: string;
        /**
         * The icon content for the button.
         */
        icon: ReactNode;
        /**
         * The route to navigate for the button.
         */
        route?: string;
        /**
         * Extra matching routes for the button.
         */
        extraMatchingRoutes?: string[];
        /**
         * The function to trigger for the button.
         */
        function?: () => void;
        /**
         * Is the button visible.
         */
        hidden?: boolean;
    }[];

    /**
     * The buttons to display on the panel.
     */
    end: {
        /**
         * The label for the button.
         */
        label: string;
        /**
         * The icon content for the button.
         */
        icon: ReactNode;
        /**
         * The route to navigate for the button.
         */
        route?: string;
        /**
         * The function to trigger for the button.
         */
        function?: () => void;
        /**
         * Is the button visible.
         */
        hidden?: boolean;
    }[];

    /**
     * Show the panel full width.
     */
    fullWidth: boolean;
}
