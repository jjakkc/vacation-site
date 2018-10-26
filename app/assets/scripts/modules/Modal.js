import $ from "jquery";

class Modal {
    constructor(){
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");
        this.events();
    }

    events(){
        // clicking the open modal button
        this.openModalButton.click(this.openModal.bind(this));

        // clicking the x close modal
        this.closeModalButton.click(this.closeModal.bind(this));

        // pushes any key
        $(document).keyup(this.keyPressHandler.bind(this))
    }

    keyPressHandler(e){
        // close window when escape key pressed
        if(e.keyCode == 27){
            this.closeModal();
        }
    }

    openModal(){
        this.modal.addClass("modal--is-visible");
        return false; // req to prevent default scrolling up with # anchor link
    }

    closeModal(){
        this.modal.removeClass("modal--is-visible");
    }
}

export default Modal;