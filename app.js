const loadPhone = async (searchText = '13' , isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones , isShowAll)
}

const displayPhones = (phones , isShowAll) => {
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = '';
    const searchendler = document.getElementById('showLoader');
    if(phones.length > 6 && !isShowAll){
        searchendler.classList.remove('hidden')
    }
    else{
        searchendler.classList.add('hidden')
    }
    if(!isShowAll){
        phones = phones.slice(0,6)
    }




    phones.forEach(phones => {
        console.log(phones)
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `
            <figure><img class="w-69 mx-auto" src="${phones.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="text-xl text-center">${phones.brand}</h2> 
                <h2 class="">${phones.phone_name}</h2> 
                <h2 class="text-2xl font-semibold">$999</h2> 
                
                <button class="btn btn-primary" onclick="handleShowDetails('${phones.slug}')">Buy Now</button>
                </div>
            </div>

        `
        phoneContainer.appendChild(phoneCard);

    });
    toggleLoading(false);

}
const handleShowDetails = async (Id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${Id}`);
    const data = await res.json();
    const details = data.data;
    console.log(details)
    phoneShowDetails(details)

}

const phoneShowDetails = (details) =>{
 
    const PhoneName = document.getElementById('PhoneName');
    PhoneName.innerText ='Model: ' +  details.name;

    const detailsImg = document.getElementById('detailsImg');
    detailsImg.innerHTML = `
    <img src='${details.image}' />
    `
    const modalDiscp = document.getElementById('modal-discp');
    modalDiscp.innerText = 'Name : ' + details.brand;

    const modalPhoneDetails = document.getElementById('modal-phone-details');
    // modalPhoneDetails.innerText = 'Name : ' + details;



    showDetailsModal.showModal();

}







const handleSearch = (isShowAll) =>{

    toggleLoading(true);

    const searchField  = document.getElementById('searchField');
    const searchText = searchField.value ;

    loadPhone(searchText , isShowAll);
}

const toggleLoading = (isLoading) =>{

    const toggleLoading = document.getElementById('toggleLoading');
    if(isLoading){
        toggleLoading.classList.remove('hidden');
    }
    else{
        toggleLoading.classList.add('hidden');
    }
}


const handleShowAll = () => {
    handleSearch(true);
}









loadPhone()