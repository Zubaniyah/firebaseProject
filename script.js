const firebaseConfig = {
    apiKey: "AIzaSyAcjGG6xIwtiNBi8mrHByBi4u-SIPbjd6U",
    authDomain: "firemessage-b6615.firebaseapp.com",
    projectId: "firemessage-b6615",
    storageBucket: "firemessage-b6615.appspot.com",
    messagingSenderId: "360851964194",
    appId: "1:360851964194:web:35c43cfdfc1a629bd4a57b",
    measurementId: "G-ESDKLSJQYR"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


const logoutButton = document.getElementById('logout');
const blogList = document.getElementById('blog-list');


auth.onAuthStateChanged(user => {
    if (user) {
        logoutButton.style.display = 'block';
        fetchBlogs();
    } else {
        logoutButton.style.display = 'none';
        blogList.innerHTML = '';
    }
});


logoutButton.addEventListener('click', () => {
    auth.signOut();
});


function fetchBlogs() {
    db.collection('blogs').get().then(snapshot => {
        snapshot.forEach(doc => {
            const blog = doc.data();
            const blogHTML = `
                <article>
                    <h2>${blog.title}</h2>
                    <p>${blog.content}</p>
                </article>
            `;
            blogList.innerHTML += blogHTML;
        });
    });
}
