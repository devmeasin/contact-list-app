// style css import 
import "./styles.css";
// Axios Required from axios  
const axios = require('axios')

// Base_Url
const Base_Url = 'http://localhost:3000/contact'


//Start Axios Get Request .......


// Select tbody 

let tbody = document.getElementById('tbody')


window.onload = function () {

    axios.get(Base_Url)
        .then(res => {
            res.data.forEach((contact) => {

                CreateTR(contact, tbody)

            })
        })


    let subBtn = document.getElementById('subbtn')

    subBtn.addEventListener('click', function () {
        CrateNewContact()
        setTimeout(() => {
            name_empty.style.display = "none";
        }, 2000);
    })

}


//End Axios Get Request .......



// Create Tr Element Appending Parent Element 

function CreateTR(contact, parent) {

    let TR = document.createElement('tr');

    // Name Field 

    let tdName = document.createElement('td')
    tdName.innerHTML = contact.name
    TR.appendChild(tdName);

    // Phone Field 

    let tdPhone = document.createElement('td')
    tdPhone.innerHTML = contact.phone ? contact.phone : 'N/A'
    TR.appendChild(tdPhone);

    // Email Field 

    let tdEmail = document.createElement('td')
    tdEmail.innerHTML = contact.email ? contact.email : 'N/A'
    TR.appendChild(tdEmail);

    let tdAction = document.createElement('td');

    // tdAction Edit Button 
    let tdEditbtn = document.createElement('button')
    tdEditbtn.classList = 'btn btn-warning font-weight-bold mr-2'
    tdEditbtn.innerHTML = '✏️ Edit'

    tdEditbtn.addEventListener('click', function () {


        let editName = document.getElementById('editName')
        let editPhone = document.getElementById('editPhone')
        let editEmail = document.getElementById('editEmail')
        let updateBtn = document.getElementById('updateBtn')

        // console.log('Hello Edit Btn');

        let editModal = $('#edit-modal')

        editModal.modal('toggle')

        editName.value = contact.name
        editPhone.value = contact.phone ? contact.phone : ''
        editEmail.value = contact.email ? contact.email : ''

        // let editObj = 

        updateBtn.addEventListener('click', function () {

            axios.put(`${Base_Url}/${contact.id}`, {
                name: editName.value,
                phone: editPhone.value,
                email: editEmail.value
            })
                .then(res => {

                    tdName.innerHTML = res.data.name
                    tdPhone.innerHTML = res.data.phone
                    tdEmail.innerHTML = res.data.email
                    editModal.modal('hide')


                })
                .catch((err) => {
                    console.log(err.message);
                })
        })


    })

    tdAction.appendChild(tdEditbtn);


    // tdAction Delete Button 
    let tdDeletebtn = document.createElement('button')

    tdDeletebtn.classList = 'btn btn-danger font-weight-bold'
    tdDeletebtn.innerHTML = '❌ Delete'
    tdDeletebtn.addEventListener('click', function () {

        // console.log(contact);

        axios.delete(`${Base_Url}/${contact.id}`)
            .then((res) => {
                parent.removeChild(TR)
            })
            .catch((error) => {
                console.log(error.message);
            });



    })
    tdAction.appendChild(tdDeletebtn)

    // ...***********...

    TR.appendChild(tdAction)

    parent.appendChild(TR)

}




//Start Axios Post Request ......


function CrateNewContact() {


    let nameField = document.getElementById('nameField')
    let phoneField = document.getElementById('phoneField')
    let emailField = document.getElementById('emailField')


    if (nameField.value === '' || nameField.value === null) {

        let name_empty = document.getElementById('name_empty')
        name_empty.style.display = "block";


    } else {

        let addContact = {
            name: nameField.value,
            phone: phoneField.value,
            email: emailField.value
        }

        axios.post(Base_Url, addContact, { headers: { "Content-Type": "application/json" } })
            .then((res) => {

                let tbody = document.getElementById('tbody')
                CreateTR(res.data, tbody)
                nameField.value = ''
                phoneField.value = ''
                emailField.value = ''

            })
            .catch((e) => {
                console.log(e.message)
            })
    }

}


//End Axios Post Request .......

