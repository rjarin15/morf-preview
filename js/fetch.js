const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let formRef = params.form;

var morfRoot = 'https://render.getmorf.io/v1';

if (formRef){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", formRef, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            window.morfConfig = {
                root: morfRoot,
                siteKey: 'ad702064b01c41a88c0946b0ea250ce2',
                targetId: 'morfcontent',
                definition: JSON.parse(this.responseText)
            };

            var embed = document.createElement('script');
            embed.setAttribute('src', morfRoot + '/js/embed.js');
            document.body.appendChild(embed);
        }
        else {
            console.error("Error occured") //TODO
        }    
    };

    xhr.send();
}