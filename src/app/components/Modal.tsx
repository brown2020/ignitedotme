import React, { ReactElement } from "react";

interface Props {
    children: ReactElement;
    show: boolean;
}

export const Modal: React.FC<Props> = (props) => {
    if (props.show) {
        return (

            <div className="relative z-[9999] overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-black/75 z-40 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-50 md:w-1/2 mx-auto overflow-y-auto">
                    {props.children}
                </div>
            </div>
        )
    }
    return null;
}
