// console.log('this is project 6');

// Utility functions to get DOM element from string
// 1. 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// count variable
let addParamCount = 1;

//Hide param box initialy
let paramBox = document.getElementById('paramBox');
paramBox.style.display = 'none';

//If user click click on JSON hide param box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('paramBox').style.display = 'none';
    document.getElementById('jsonBox').style.display = 'block';
})

//If user click click on parameter hide json box
let paramRadio = document.getElementById('paramRadio');
paramRadio.addEventListener('click', () => {
    document.getElementById('paramBox').style.display = 'block';
    document.getElementById('jsonBox').style.display = 'none';
})

// if user click on + in parameter new paramter will add
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    addParamCount += 1;
    let add = `<div class="param">
                <div class="mb-3 row ">
                <!-- parameters -->
                <label for="inputParam" class="col-sm-2 col-form-label mt-1">Parameter${addParamCount}</label>

                <div class="col-sm-4 mt-1">
                    <input type="text" class="form-control" placeholder="Parameter ${addParamCount} key" aria-label="City" id="paramKey${addParamCount}">
                </div>

                <div class="col-md-4 mt-1">
                    <input type="text" class="form-control" placeholder="Parameter ${addParamCount} value" aria-label="State"
                        id="paramValue${addParamCount}">
                </div>

                <div class="col mt-1">
                    <button type="submit" class="btn btn-danger deleteParam" aria-label="" style="width: 35.8px;">-</button>
                </div>
                </div>
                `;
    let paramElement = getElementFromString(add);
    paramBox.appendChild(paramElement);
    //add an event listner to remove parameter on clicking the delete
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
        })
    }
})

//if the user click on the submit button
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
    if (document.getElementById('url').value != '') {
        //removing is-valid class in url if url is not null
        document.getElementById('url').classList.remove('is-invalid') 
        //showing please wait in response box
        document.getElementById('responseTextArea').innerHTML = 'Please wait. fetching data...';
    }
    //fetch all values user has entered
    let url = document.getElementById('url').value;
    let contentType = document.querySelector('input[name="contentType"]:checked').value;
    let requestType = document.querySelector('input[name="requestType"]:checked').value;

    //collect all parameters if user select params option
    let data = {}
    if (contentType == 'customParameter') {
        for (let i = 1; i < addParamCount + 1; i++) {
            if (document.getElementById('paramKey' + i) != undefined) {
                let key = document.getElementById('paramKey' + i).value;
                let value = document.getElementById('paramValue' + i).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonTextArea').value;
    }

    // don't fetch data if user doesn't enter any thing in url
    if (url != '') {
        //if the requestType is GET onvoke fetch api
        if (requestType == 'GET') {
            fetch(url, {
                method: 'GET',
            })
                .then(response => response.text())
                .then((text) => {
                    document.getElementById('responseTextArea').innerHTML = text;
                    Prism.highlightAll();
                });
        }
        //if the requestType is POST onvoke fetch api
        else {
            fetch(url, {
                method: 'POST',
                body: data,     // here we have data as a string
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(response => response.text())
                .then((text) => {
                    document.getElementById('responseTextArea').innerHTML = text;
                    Prism.highlightAll();
                });
        }
    }
    else{
        document.getElementById('url').classList.add('is-invalid')
    }

})


