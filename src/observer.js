const observer = new IntersectionObserver(function (entries){
    entries.forEach(entry => {
        console.log(entry);
    })
})
observer.observe(document.querySelector('.gallery'))