const boton = document.getElementById('scrap');
const save = document.getElementById('save')
boton.addEventListener('click', ()=>{
    const input = document.getElementById('input').value;
    const pages = document.getElementById('pages').value;
    chrome.runtime.sendMessage({input, pages})
})
save.addEventListener('click', ()=>{
    const eject = 'Yes'; 
    chrome.runtime.sendMessage({eject})
})