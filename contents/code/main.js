const config = { debug: readConfig("debug", false) };

const log = {
    debug(message) {
        if (config.debug) print('[kwin-hide-wecom-shadow][debug]' + message);
    },
    error(message) {
        print('[kwin-hide-wecom-shadow][error]' + message);
    },
};

function hideShadow(window) {
    if (!window) return;

    const windowInfo = {
        class: window.resourceClass,
        title: window.caption,
        isDialog: window.dialog,
        windowType: window.windowType,
    };

    try {
        const windowInfoJson = JSON.stringify(windowInfo);

        if (
            (window.resourceClass === "wxwork.exe" && window.dialog && window.caption !== "menu" && window.caption !== "Open")
            || (window.resourceClass === "wemail.exe" && !window.caption)
        ) {
            log.debug(`[hide]${windowInfoJson}`);
            window.opacity = 0;
            window.keepBelow = true;
            window.minimized = true;
        } else {
            log.debug(`[skip]${windowInfoJson}`);
        }
    } catch (e) {
        windowInfo.error = e.message;
        log.error(JSON.stringify(windowInfo));
    }
}

workspace.windowAdded.connect(hideShadow);
workspace.windowActivated.connect(hideShadow);
