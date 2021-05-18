//TODO: add showModal functions
import {createElement} from '../helpers/domHelper.js'



export function getModalContainer(){
    return document.getElementById('root');
}

export function createStartModal(onClose){
    let modalStart = createElement({
        tagName: "div",
        className:"modalStart"
    });
    let modalImg = createElement({
        tagName: "img",
        attributes: {
            src:"images/message_bg.jpg",
            alt:"Start"
        }
    });
    let modalP = createElement({
        tagName: "p",
        attributes:{id:"start"}
    });
    let modalBtn = createElement({
        tagName: "button",
    });
    modalP.innerText = "Почніть гру";
    modalBtn.innerText = "Start"
    modalStart.append(modalImg,modalP,modalBtn);

    const close = () => {
        hideModal();
        onClose();
    }
    modalBtn.addEventListener('click', close);

    return modalStart;
}

function hideModal() {
    const modal = document.getElementsByClassName('modalStart')[0];
    modal?.remove();
  }