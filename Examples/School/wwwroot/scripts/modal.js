class CustomModal {
    constructor() {
        this.modal = document.createElement('div'); // Create a new div element for the modal
        this.modal.classList.add('modal-overlay'); // Add the class 'modal-overlay' to the div element
        this.modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                </div>
            </div>
        `;
        document.body.appendChild(this.modal); // Add the modal to the body of the document
        
        this.modal.querySelector('.modal-close').addEventListener('click', () => this.hide());
    }

    show(title, body, buttons = []) {
        this.modal.querySelector('.modal-title').textContent = title;
        this.modal.querySelector('.modal-body').innerHTML = body;
        const footer = this.modal.querySelector('.modal-footer');
        footer.innerHTML = "";
        buttons.forEach(button => {
            const buttonElement = document.createElement('button');
            buttonElement.className = `btn btn-${button.type || 'secondary'}`;
            buttonElement.textContent = button.text;
            buttonElement.addEventListener('click', () => {
                if(button.handler) button.handler();
                if(button.close !== false) this.hide(); 
            });
            footer.appendChild(buttonElement);
        })

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // this.modal.style.display = "block";
    };

    hide() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        // this.modal.style.display = "none";
    };
}