"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://randomuser.me/api/'

    async function getJSON(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            throw error;
        }
    };

    function prepareData() {
        for (var i = 0; i < 12; i ++) {
            getJSON(url)
            .then(data => renderData(data.results[0]));
        }
    }

    prepareData(); 

    function renderData(data) {
            console.log(data)
        
            const box = document.createElement('div');
            box.classList.add('box');

            const profileImg =  document.createElement('img');
            profileImg.classList.add('profile-img');
            profileImg.src = data.picture.large;

            const details = document.createElement('div');
            details.classList.add('details');

            const name = document.createElement('span');
            const nameInnerHtml = `<label class="name"><strong>${data.name.first} ${data.name.last}</strong></label>`;
            name.innerHTML = nameInnerHtml;

            const email = document.createElement('p');
            email.classList.add('email');
            email.innerHTML = data.email;

            const city = document.createElement('p');
            city.classList.add('city');
            city.innerHTML = data.location.city;

            details.appendChild(name);
            details.appendChild(email);
            details.appendChild(city);

            box.appendChild(profileImg);
            box.appendChild(details);

            const employees = document.querySelector('.employees');
            employees.appendChild(box);
    }

    var show = id => {
        document.getElementById(id).style.display = 'block';
    }

    var hide = id => {
        document.getElementById(id).style.display = 'none';
    }


});


