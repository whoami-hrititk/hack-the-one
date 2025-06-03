window.addEventListener('DOMContentLoaded', async ()=>{
    const options = {method:'GET', credentials: 'include'}
    const response = await fetch("/user/profile", options);
    const result = await response.json();
    if(response.ok && result.success){
        document.getElementById('user-name').innerText = result.user.username;
        document.getElementById('email').innerHTML= result.user.email;
    }else{
        console.log(result.message);
        window.location.href = "login.html";
    }

    const logout_btn = document.getElementById("logout");
    if(logout_btn){
        logout_btn.addEventListener('click', async () => {
            const options = {method:'POST', credentials: "include"};
            const response = await fetch('/user/logout', options);
            const result = await response.json();

            if(response.ok && result.success){
                console.log(result.message);
                window.location.href = "login.html";
            }else{
                console.log(result.message);
            }
        });
    }
});