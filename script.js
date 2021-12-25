const modal=document.getElementById('modal')
const modalShow=document.getElementById('show-modal')
const modalClose=document.getElementById('close-modal')
const bookmarkForm=document.getElementById('bookmark-form')
const websiteNmaeEl=document.getElementById('website-name')
const websiteUrlEl=document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks=[]
// Show modal focus on input
function showModal(){
    modal.classList.add('show-modal')
    websiteNmaeEl.focus()
}
// Close modal focus
function closeModal(){
    modal.classList.remove('show-modal')
    websiteNmaeEl.focus()
}

// Modal event listener
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', closeModal)
window.addEventListener('click', (e)=>{
  e.target===modal ? modal.classList.remove('show-modal') : false
})

// Validate form

function validate(nameValue, urlValue){
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex=new RegExp(expression)
    if(!nameValue || !urlValue){
        alert('Please submit values for both fields')
        return false
    }
    if(!urlValue.match(regex)){
        alert('please provide a valid web address')
        return false
    }
    return true
}


// Build Bookmarks
function buildBookmarks() {
    // Remove all bookmark elements
    bookmarksContainer.textContent = '';
    // Build items
    bookmarks.forEach((bookmark) => {
      const { name, url } = bookmark;
      // Item
      const item = document.createElement('div');
      item.classList.add('item');
      // Close Icon
      const closeIcon = document.createElement('i');
      closeIcon.classList.add('fas', 'fa-times');
      closeIcon.setAttribute('title', 'Delete Bookmark');
      closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
      // Favicon / Link Container
      const linkInfo = document.createElement('div');
      linkInfo.classList.add('name');
      // Favicon
      const favicon = document.createElement('img');
      favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
      favicon.setAttribute('alt', 'Favicon');
      // Link
      const link = document.createElement('a');
      link.setAttribute('href', `${url}`);
      link.setAttribute('target', '_blank');
      link.textContent = name;
      // Append to bookmarks container
      linkInfo.append(favicon, link);
      item.append(closeIcon, linkInfo);
      bookmarksContainer.appendChild(item);
    });
  }
// Delete a bookmark
function deleteBookmark(url){
// Loop through the bookmarks array
bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();

}

// Fetch bookmarks ffrom local storage
function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks=JSON.parse(localStorage.getItem('bookmarks'))
    }else{
        // Create a bookmarks array inlocal storage
        bookmarks=[{
            name:'Ndeta',
            url:'ndeta.io'
        }]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
   buildBookmarks()
}
// Handle data from form
function storeBookmark(e){
e.preventDefault()
const nameValue=websiteNmaeEl.value
let urlValue=websiteUrlEl.value
if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
    urlValue = `https://${urlValue}`;
  }

  if(!validate(nameValue, urlValue)){
      return false
  }
 const bookmark={
     name:nameValue,
     url:urlValue
 }
 bookmarks.push(bookmark)
localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
fetchBookmarks()
 bookmarkForm.reset()
 websiteUrlEl.focus()
}
// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark)

// On load fetch bookmarks
fetchBookmarks()