const OverlayMessageBox = ({ children, label, action, beModal }) => {

    return (
        <>
            <div className="darkBG overlayOutside" onClick={beModal ? null : action} />
            <div className="overlayBox">
                <div className="overlayVertical">
                    <div className="overlayContent">
                        {children}
                    </div>
                    <button className="button overlayButton" onClick={action}>{label}</button>
                </div>
            </div>
        </>
    )
}

OverlayMessageBox.displayName = 'OverlayMessageBox'

export default OverlayMessageBox
