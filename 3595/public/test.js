window.onload = () => getStats();
function getVariants() {
    fetch('/variants', {method: "GET", headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then( data => {
            console.log(data);
            let root = document.getElementById('root');
            if (!root.hasChildNodes()){
                let variants = data.map( variant => `<input type="button" id="${variant.code}" value="${variant.text}" onclick="vote(this.id)">`)
                    .join('');
                let variantsContainer = document.createElement('div');
                variantsContainer.innerHTML = variants;
                root.appendChild(variantsContainer);
            }
        })
}

function updateStats(data) {
    document.getElementById('stat1').innerText = `${data.yes}`;
    document.getElementById('stat2').innerText = `${data.no}`;
    document.getElementById('stat3').innerText = `${data.dunno}`;
}

function getStats() {
    fetch('/stats', {method: "GET", headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then( data => updateStats(data))
}

function vote(id){
    fetch('/vote', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({vote: id})})
        .then(response => response.json())
        .then(data => updateStats(data))

}

function saveResults(type) {
    let ct ='';
    if (type === 'html' || type === 'xml'){
        ct = `text/${type}`
    } else {
        ct = `application/json`
    }

    fetch(`/save?save=${type}`, {method: "GET", headers: {'Content-type': ct }})
        .then(response => response.text())
        .then(data => document.getElementById('result').innerText = data)
}