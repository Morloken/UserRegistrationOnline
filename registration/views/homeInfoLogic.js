
document.addEventListener('DOMContentLoaded', function() {
    
    fetch('/get-username')
    .then(response => response.text()) 
    .then(text => {
        
        try {
            const data = JSON.parse(text);
            const nickname = data.username;
            document.getElementById('displayName').textContent = nickname ? `Hello, ${nickname}!` : 'Hello, Guest!';
        } catch (e) {
            console.log('Invalid info from server');
            document.getElementById('displayName').textContent = 'Hello, Guest!';
        }
    });




    
});



