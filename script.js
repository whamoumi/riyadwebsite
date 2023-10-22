const data = [
        {
            itemIndex: "01",
            ProjectName: "Project 1",
            ProjectDate: "2023",
            itemName: "Shooting by night ",
            itemCopy: "A little shoting by night in the city of Nice",
            itemImg: [ "./assets/projet1/1.jpg", "./assets/projet1/2.jpg", "./assets/projet1/3.jpg", "./assets/projet1/4.jpg", "./assets/projet1/5.jpg", "./assets/projet1/6.jpg",
            "./assets/projet1/7.jpg", "./assets/projet1/8.jpg", "./assets/projet1/9.jpg", "./assets/projet1/10.jpg", "./assets/projet1/11.jpg", "./assets/projet1/12.jpg",]
        },

        
]

// create the items in the DOM

const itemsContainer = document.querySelector('.items');

for (let i = 0; i < data.length; i++) {
    const item = data[i];
    
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');

    const itemIndex = document.createElement('div');
    itemIndex.classList.add('item-index');
    itemIndex.textContent = item.itemIndex;

    const projectName = document.createElement('div');
    projectName.classList.add('item-name');
    projectName.textContent = item.ProjectName;

    const projectDate = document.createElement('div');
    projectDate.classList.add('item-year');
    projectDate.textContent = item.ProjectDate;

    itemElement.appendChild(itemIndex);
    itemElement.appendChild(projectName);
    itemElement.appendChild(projectDate);

    itemsContainer.appendChild(itemElement);
}

const overlay = document.querySelector('.overlay');
const overlay2 = document.querySelector('.overlay2');
const closeBtn = document.querySelector('#close-btn');

const tl = gsap.timeline({ paused: true, overwrite: "auto" });
const tl2 = gsap.timeline({ paused: true, overwrite: "auto" });

tl.to(overlay, { duration: 0.5, bottom: "0px", rotation: 0, transformOrigin : "bottom center", ease: "power1.inOut" })
tl2.to(overlay2, { duration: 0.5, bottom: "-600px", rotation: 10, transformOrigin : "bottom center", ease: "power1.inOut" })
const items = document.querySelectorAll('.item');

items.forEach((item, index) => { 
  item.addEventListener('click', () => {
    updateOverlay(data[index]);
    items.forEach((item) => {
        item.classList.remove('hover2');
    })
    item.classList.add('hover2');
    tl2.reverse();
    tl.play();
  })   
  item.addEventListener('mouseover', () => {
    item.classList.add('hover'); 
    updateOverlay2(data[index]);
    tl2.play();
   
  })

})

closeBtn.addEventListener('click', () => {
    tl2.reverse();
    tl.reverse();
    items.forEach((item) => {
        item.classList.remove('hover2');
    })
})

document.addEventListener('click', (e) => {
    if (!overlay.contains(e.target) && !isItem(e.target)) {
        items.forEach((item) => {
            item.classList.remove('hover2');
        })
        tl2.reverse();
        tl.reverse();
    }
})

// remove hover class when mouse leaves the item
items.forEach((item) => {
    item.addEventListener('mouseleave', () => {
        tl2.reverse();
        item.classList.remove('hover');
    })
})

function isItem(target) {
    return target.closest('.item');
}

function updateOverlay(item) {
    const itemTitle = document.querySelector('#item-name')
    const itemImg = document.querySelector('#item-img');
    const itemCopy = document.querySelector('#item-copy');

    itemTitle.textContent = item.itemName;
    itemCopy.textContent = item.itemCopy;

    const imgContainer = document.querySelector('.img-container');
    

    for (let i = 0; i < item.itemImg.length; i++) {
        const img = document.createElement('img');
        img.classList.add('image');
        img.src = item.itemImg[i];
        imgContainer.appendChild(img);
    }
}


function updateOverlay2(item) {
    const itemTitle = document.querySelector('#item-name2')

    itemTitle.textContent = item.itemName;

    const imgContainer = document.querySelector('.img-container2');
}
// clear images when overlay is closed
tl.eventCallback("onReverseComplete", function() {
    const imgContainer = document.querySelector('.img-container');
    imgContainer.innerHTML = '';
});






