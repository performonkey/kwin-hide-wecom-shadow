log:
	journalctl -f QT_CATEGORY=js QT_CATEGORY=kwin_scripting | grep -F '[kwin-hide-wecom-shadow]'

pkg:
	git archive --format=zip -o hide-wecom-shadow.kwinscript master

install:
	kpackagetool6 --type=KWin/Script -i $(shell pwd)
