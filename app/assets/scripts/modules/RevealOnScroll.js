import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class RevealOnScroll {
    constructor(els, offsetValue){
        this.itemsToReveal = els;
        this.hideInitially();
        this.createWaypoints(offsetValue);
    }

    hideInitially(){
        this.itemsToReveal.addClass("reveal-item");
    }

    createWaypoints(offsetValue){
        this.itemsToReveal.each(function(){
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function(){
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                offset: offsetValue
            });
        });
    }
}

export default RevealOnScroll;