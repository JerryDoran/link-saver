const linkCategory = document.getElementById('linkCategory');
const submitButton = document.getElementById('submitButton');
const addButton = document.getElementById('addBtn');
const cancelButton = document.getElementById('cancelButton');
const addLinkPanel = document.getElementById('addLinkPanel');
const linkList = document.getElementById('linksList');
const addedCategories = document.getElementById('addedCategories');
const addLinkContainer = document.getElementById('addLinkContainer');

let editIndex = -1;

let linkCategories = [];
const links = [
  {
    title: 'Wes Bos Course',
    url: 'http://wesbos.com/courses',
    categories: ['Node', 'ES6', 'Flexbox', 'React'],
    date: new Date()
  },
  {
    title: 'Traversy Media',
    url: 'https://www.traversymedia.com',
    categories: ['Node', 'CSS', 'Javascript', 'Vue'],
    date: new Date()
  },
  {
    title: 'Colt Steele',
    url: 'https://www.udemy.com/user/coltsteele',
    categories: ['Node', 'React', 'Javascript', 'MongoDB'],
    date: new Date()
  }
];

const formatDate = date => {
  return `${('0' + (date.getMonth() + 1)).slice(-2)}/${(
    '0' + date.getDay()
  ).slice(-2)}/${date.getFullYear()}`;
};

const clearLinkForm = () => {
  linkTitle.value = '';
  linkUrl.value = '';
  linkCategory.value = '';
  linkCategories = [];
  addedCategories.innerHTML = '';
};

addButton.addEventListener('click', e => {
  showFormPanel();
});

cancelButton.addEventListener('click', e => {
  e.preventDefault();
  hideFormPanel();
});

const showFormPanel = () => {
  addLinkContainer.classList.remove('hidden');
  displayLinkedCategories();
};

const hideFormPanel = () => {
  addLinkContainer.classList.add('hidden');
  clearLinkForm();
};

linkCategory.addEventListener('keydown', e => {
  if (e.keyCode === 188) {
    e.preventDefault();

    linkCategories.push(linkCategory.value);

    linkCategory.value = '';

    // Display updated categories
    displayLinkedCategories();
  }
});

const displayLinkedCategories = () => {
  addedCategories.innerHTML = '';
  for (let category of linkCategories) {
    let html = `<span class="category">${category}</span>`;
    addedCategories.innerHTML += html;
  }
};

submitButton.addEventListener('click', e => {
  e.preventDefault();
  const title = linkTitle.value;
  const url = linkUrl.value;
  const categories = linkCategories;

  const newLink = {
    title,
    url,
    categories,
    date: new Date()
  };

  if (editIndex === -1) {
    // put a new link in front of array instead of at back using 'push'
    links.unshift(newLink);
  } else {
    links[editIndex] = newLink;
    editIndex = -1;
  }

  clearLinkForm();

  displayLinkedCategories();

  // hide the add link form
  hideFormPanel();

  displayLinks();
});

const deleteLink = index => {
  links.splice(index, 1);
  displayLinks();
};

const editLink = index => {
  editIndex = index;
  linkTitle.value = links[index].title;
  linkUrl.value = links[index].url;
  linkCategories = links[index].categories;

  showFormPanel();
};

const displayLinks = () => {
  linkList.innerHTML = '';

  let index = 0;
  for (let link of links) {
    let html = `
      <div class="flex-item">
        <div class="link panel">
        <div class="link-options">
          <button class="btn-sm" onclick="deleteLink(${index})">Delete</button>
          <button class="btn-sm" onclick="editLink(${index})">Edit</button>
        </div>
        <a href=${link.url}
          ><h1 class="header">${link.title}</h1></a
        >
        <p class="link-date">${formatDate(link.date)}</p>
        <div class="categories">
          Categories:`;
    for (let category of link.categories) {
      html += `<span class="category">${category}</span>`;
    }

    html += ` 
          </div>
        </div> 
      </div>   
        `;

    linkList.innerHTML += html;
    index += 1;
  }
};

displayLinks();
