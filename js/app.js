"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://randomuser.me/api';
    const loader = document.querySelector('.loader');
    const employeeSection = document.querySelector('.employees');
    const employeeList = document.querySelectorAll('.employees');
    var userData = [];


    // get Data

    const getJSON = async () => {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        loader.textContent = `Sorry Something went Wrong! - ${error}`;
        throw error;
      }
    };

    const getUsers = async () => {
        Array(12).fill().map( async () => {
            await getJSON()
              .then(users =>  prepareData(users.results[0]))
              .then(data => userData.length == 12 ?  renderData(data) : (loader.style.display = "block")
              );
        }); 
    };

    // prepare Data

    const prepareData = data => {
       userData.push({
        image: data.picture.large,
        name: `${data.name.first} ${data.name.last}`,
        email: data.email,
        city: data.location.city,
        phone: data.phone,
        address: `${data.location.street}, ${data.location.city} ${data.location.state} ${data.location.postcode} `,
        birthday: `Birthday: ${getFormattedDate(data.dob.date.substring(0, 10))}`
      });
    return userData;
    }

    const getFormattedDate = date => {
      const newDate = new Date(date);
      return `${("0" + (newDate.getMonth() + 1)).slice(-2)}/${("0" + newDate.getDay()).slice(-2)}/${newDate.getFullYear().toString().substr(-2)}`;
    }

    // render UI

    const styleElement = (element, elementClass = '', id = '', innerHTML = '' ) => {
        const renderElement = document.createElement(`${element}`);
        renderElement.classList.add(elementClass);
        renderElement.id = id;
        renderElement.innerHTML = innerHTML;
        return renderElement;
      }
    
      const styleImg = (elementClass, name, alt, id) => {
        const elementImg = styleElement('img', elementClass, id);
        elementImg.src = name;
        elementImg.alt = alt;
        return elementImg;
      }

    const renderData = data => {
        loader.style.display = 'none';
        data.forEach((user, i) => {
            const box = styleElement('div', 'box', i);
            const profileImg = styleImg('profile-img', user.image, user.image, i);
            const details = styleElement('div', 'details', i);
            const name = styleElement("span", "span", i, `<label class="name"><strong id=${i}>${ user.name }</strong></label>` );
            const email = styleElement('p', 'email', i, user.email);
            const city = styleElement('p', 'city', i, user.city);

            details.appendChild(name);
            details.appendChild(email);
            details.appendChild(city);
            box.appendChild(profileImg);
            box.appendChild(details);
            employeeSection.appendChild(box);
        });
    }

    const addEvents = () => {
        employeeList.forEach(item => {
            item.addEventListener('click', e => {
                const index = e.target.id;
                document.querySelector('.img-popup').src = userData[index].image;
                document.querySelector('.name-popup').innerHTML = userData[index].name;
                document.querySelector('.email-popup').innerHTML = userData[index].email;
                document.querySelector('.city-popup').innerHTML = userData[index].city;
                document.querySelector('.phone-popup').innerHTML = userData[index].phone;
                document.querySelector('.address-popup').innerHTML = userData[index].address;
                document.querySelector('.birthday-popup').innerHTML = userData[index].birthday;
                document.querySelector('#popup').style.display = 'block';
            });
        });
        document.querySelector('.hide').addEventListener('click', e => {
            document.querySelector('#popup').style.display = 'none';
        });
    }

    getUsers();
    addEvents()
});


