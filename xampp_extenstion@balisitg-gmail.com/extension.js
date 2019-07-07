
const St = imports.gi.St;
const Main = imports.ui.main;

const Util = imports.misc.util;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Lang = imports.lang;

let _indicator;

function _runXampp() {
        Util.spawn(['/bin/bash', '-c', "pkexec env DISPLAY=$DISPLAY XAUTHORITY=$XAUTHORITY /opt/lampp/manager-linux-x64.run"])
}

function _openHtdocs() {
    Util.spawn(['/bin/bash', '-c', "nautilus /opt/lampp/htdocs"])
}

const Xampp_Indicator = new Lang.Class({
    Name: 'Xampp.indicator',
    Extends: PanelMenu.Button   ,

       _init: function(){
           this.parent(0.0);

           let label = new St.Label({text: 'Xampp'});
           this.actor.add_child(label);

           let menuItem = new PopupMenu.PopupMenuItem('Start xampp manager');
           menuItem.actor.connect('button-press-event',  _runXampp);

           let menuItem1 = new PopupMenu.PopupMenuItem('Open dir htdocs');
           menuItem1.actor.connect('button-press-event',  _openHtdocs);

           this.menu.addMenuItem(menuItem);
           this.menu.addMenuItem(menuItem1);
       }
 });

function init() {

}

function enable() {
    _indicator =  new Xampp_Indicator();
     Main.panel._addToPanelBox('Xampp', _indicator, 1, Main.panel._rightBox);
}

function disable() {
    _indicator.destroy();
}
