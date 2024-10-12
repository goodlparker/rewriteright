
window.onload = () => {
    addListeners();
};

function addListeners() {
    const copyButtons = document.querySelectorAll('.copy-button');
    // Add a click event listener to each button
    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log('button clicked');
            // Get the text content from the .textcontent div in the parent of the button
            const textToCopy = this.parentElement.querySelector('.content').innerText;

            // Create a temporary textarea element
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);

            // Select the text
            textarea.select();
            textarea.setSelectionRange(0, 99999); // For mobile devices

            // Copy the text
            document.execCommand('copy');
            console.log('text to copy ', textToCopy);

            // Remove the textarea
            document.body.removeChild(textarea);

            showSuccess(this.parentElement);
        });
    });
}

function showSuccess(container) {

}


function remove() {
    // Select all buttons with the class 'copy-button'
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.removeEventListener('click', copyTextHandler);
    });
}
