
const cardForm = document.querySelector('.form');
let gridCards = document.querySelector('.grid-cards');
const fruitShoop = document.querySelector('#fruit-shoop');
let fruit_count;

let cardsArray = [];

cardForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fruit_name = document.querySelector('#fruit-name').value;
    const fruit_desc = document.querySelector('#fruit-desc').value;
    const fruit_price = document.querySelector('#fruit-price').value;
    const fruit_discount = document.querySelector('#fruit-discount').value;
    const fruit_image = document.querySelector('#fruit-img').files[0];
    fruit_count = document.querySelector('#fruit-count').value;
    // console.log(fruit_count);

    const reader = new FileReader();

    reader.onload = function (e) {
        const imageSrc = e.target.result;

        const newCard = { fruit_image: imageSrc, fruit_name, fruit_desc, fruit_price, fruit_discount: fruit_discount, fruit_count: fruit_count };
        cardsArray.push(newCard);

        cardForm.reset();
        displayCards();
        // console.log(cardsArray);
    };

    reader.readAsDataURL(fruit_image);
});

function displayCards() {
    if (cardsArray.length > 0) {
        fruitShoop.style.display = 'block';
        gridCards.innerHTML = ' ';

        for (let i = 0; i < cardsArray.length; i++) {
            // cardsArray.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                        <img src="${cardsArray[i].fruit_image}" alt="">
                        <div class="card_content">
                            <h3>${cardsArray[i].fruit_name}</h3>
                            <p>${cardsArray[i].fruit_desc}</p>
                            <p><span>${(cardsArray[i].fruit_price) - (cardsArray[i].fruit_discount)}$</span> <del>${cardsArray[i].fruit_price}$</del></p>
                            <div class="btns">
                                <div class="btn1">
                                    <span id="plus" onclick=pluseCount(${i})><i>+</i></span> <span>${cardsArray[i].fruit_count}</span><span id='minus' onclick=minusCount(${i})><i>-</i></span>
                                </div>
                                <a href="#" class="btn2  id="removeBtn" onclick='deleteCard(${i})'  ">Remove</a>
                            </div>
                        </div>
                    `;
            gridCards.appendChild(cardElement);
        };
    } else {
        fruitShoop.style.display = 'none';
    }
};

function deleteCard(i) {
    cardsArray.splice(i, 1); // delete from array of cards
    displayCards();
}

//update card count 
function pluseCount(i) {
    cardsArray[i].fruit_count = fruit_count++;
    displayCards();
}
function minusCount(i) {
    cardsArray[i].fruit_count = fruit_count--;
    displayCards();
}

