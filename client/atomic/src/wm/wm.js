function WindowManager(opts) {
    this.cm = new ContextMenu();
    this.launchers = new Array();
    this.windows = new Array();
    this.zIndex = 0;
    this.nextX = 10;
    this.nextY = 10;

    this.createWindow = function(opts) {
        var winIndex = this.windows.length;
        var c = '#ddd';

        if (opts.c) c = opts.c.toLowerCase();

        var win = document.createElement('div');
        win.style.position = 'absolute';
        win.style.top = this.nextY + 'px';
        win.style.left = this.nextX + 'px';
        win.style.width = '640px';
        win.style.height = '320px';
        win.style.zIndex = 0;
        win.style.backgroundColor = c;
        win.style.border = '1px solid #000';

        this.windows.push(win);
        $('desktop1').appendChild(win);

        this.nextX += 10;
        this.nextY += 10;
        this.focus(winIndex);

        return true;
    }

    this.focus = function(win) {
        this.windows[win] = this.zIndex++;
    }
}
