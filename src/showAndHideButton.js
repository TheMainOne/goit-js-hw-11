export { showButton, hideButton};

function hideButton(item) {
    item.classList.add('visually-hidden');
}

function showButton(item) {
    item.classList.remove('visually-hidden');
}