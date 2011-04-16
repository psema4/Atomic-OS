function ContextMenu(opts) {
    // Context menu derived from
    //   http://luke.breuer.com/tutorial/javascript-context-menu-tutorial.htm

    this.replaceContext = false;        // replace default context menu?
    this.mouseOverContext = false;      // is mouse over context menu?
    this.noContext = false;             // disable context menu?
    this.divContext = $('divContext');  // makes life easier

    this.initContext = function() {
        this.divContext.onmouseover = function() { this.mouseOverContext = true;  }
        this.divContext.onmouseout  = function() { this.mouseOverContext = false; }

        $('aDisable').onclick = this.disableContext;
        $('aEnable').onclick  = this.enableContext;

        document.body.onmousedown   = this.contextMouseDown;
        document.body.oncontextmenu = this.contextShow;
    }

    this.contextMouseDown = function(evt) {
        if (wm.cm.noContext || wm.cm.mouseOverContext) return;
        if (evt == null) evt = window.event;
        var target = (evt.target != null) ? evt.target : evt.srcElement;

        if (evt.button == 2 && target.tagName.toLowerCase() == 'a') {
            this.replaceContext = true;
        } else {
            if (! wm.cm.mouseOverContext) {
                setTimeout("wm.cm.closeContext()", 200);
            }
        }
    }

    this.closeContext = function() {
        wm.cm.mouseOverContext = false;
        $('divContext').style.display = 'none';
    }

    this.contextShow = function(evt) {
        if (this.noContext || this.mouseOverContext) return;
        if (evt == null) evt = window.event;
        var target = evt.target != null ? evt.target : evt.srcElement;
        if (this.replaceContext) {
            $('aItem1').onclick = function() {
                wm.createWindow({ c: target.innerHTML });
            };
            $('aItem2').onclick = function() { alert('b'); };

            var scrollTop  = document.body.scrollTop  ? document.body.scrollTop  : document.documentElement.scrollTop;
            var scrollLeft = document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft;

            $('divContext').style.display = 'none';
            $('divContext').style.left    = evt.clientX + scrollLeft + 'px';
            $('divContext').style.top     = evt.clientY + scrollTop + 'px';
            $('divContext').style.display = 'block';

            this.replaceContext = false;

            return false;
        }
    }

    this.disableContext = function() {
        wm.cm.noContext = true;
        wm.cm.closeContext();
        $('aEnable').style.display = '';

        return false;
    }

    this.enableContext = function() {
        wm.cm.noContext = false;
        wm.cm.mouseOverContext = false; // this gets left enabled when "disable menus" is chosen
        $('aEnable').style.display = 'none';

        return false;
    }
}
