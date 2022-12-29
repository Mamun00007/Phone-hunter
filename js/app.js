const loadphone = async(searchtext) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchtext}`
    const res = await fetch(url);
    const data = await res.json();
    displayphones(data.data);
}

const displayphones = phones =>{
    const phonecontainer = document.getElementById('phone-container');
    phonecontainer.textContent = '';
    //display 20 phone only
    phones = phones.slice(0,10);
    //display no fond phone
const nophone = document.getElementById('no-found-messange');
        if(phones.length===0){
            nophone.classList.remove('d-none')
        }
        else{
            nophone.classList.add('d-none');
        }

    phones.forEach(phone=>{
        const phonediv = document.createElement('div');
        phonediv.classList.add('col');
        phonediv.innerHTML =`
        <div class="card p-2">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadphonedetails('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phonedetailmodal">Show Details</button>
                    
                    </div>
                  </div>

        `;
        phonecontainer.appendChild(phonediv);

    })
    //stop loader
    toggleSpinner(false);
}




document.getElementById('btn-search').addEventListener('click',function(){
    //start loader
    toggleSpinner(true);
    const searchfield = document.getElementById('search-field');
    const searchtext = searchfield.value;
    loadphone(searchtext);

})

//serach input enter key handler
//not work 34-6 karon 34.5 e kichu korsilo ja korini ami
document.getElementById('search-field').addEventListener('keypress',function(e) {
    console.log(e.key);
    if(e.key==='Enter'){
         
    }
});



const toggleSpinner= isloading =>{
    const loadersection = document.getElementById('loader');
    if(isloading){
        loadersection.classList.remove('d-none')
    }
    else{
        loadersection.classList.add('d-none');
    }
}

const loadphonedetails=async id=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayphonedetails(data.data);
}

const displayphonedetails =phone=>{
    console.log(phone);
    const modaltitle = document.getElementById('phonedetailmodalLabel');
    modaltitle.innerText = phone.name;
    const phonedetails = document.getElementById('phone-details');
    phonedetails.innerHTML= `
    <P>Release Date:${phone.releaseDate}</p>
    <P> Storage:${phone.mainFeatures.storage}</p>
    <P> Others:${phone.others.Bluetooth}</P>
    <P> USB:${phone.others.USB}</P>
    <P> ChipSet:${phone.mainFeatures.chipSet}</p>
    <P> </P>
    <P></P>
    <P></P>
    `
}


loadphone('apple');