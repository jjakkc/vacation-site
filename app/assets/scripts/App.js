// ES6 Format to import scripts
// import Person from "./modules/Person";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import $ from "jquery";
import StickyHeader from "./modules/StickyHeader";
import Modal from "./modules/Modal";

var mobileMenu = new MobileMenu();

// var revealOnScroll = new RevealOnScroll();
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");
var stickyHeader = new StickyHeader();
var modal = new Modal();