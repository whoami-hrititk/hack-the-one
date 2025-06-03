window.addEventListener("DOMContentLoaded", () => {
    const register_btn = document.getElementById("register");
    if(register_btn){
        register_btn.addEventListener("click", async (event) => {
        event.preventDefault();
        const entered_username = document.getElementById('username');
        const entered_pass = document.getElementById('password');
        const entered_confPass = document.getElementById('confirm_pass');
        const entered_email = document.getElementById('email');

        
        const options = {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({username:entered_username.value,
                                    pass:entered_pass.value,
                                    confirm_pass: entered_confPass.value,
                                    email:entered_email.value}) 
        }
        const response = await fetch("/auth/register", options);
        const result = await response.json();
        if(response.ok && result.success){
            console.log("Account created");
            document.getElementById('message').innerText = result.message;
            window.location.href = "home.html";
        }else{
            document.getElementById('message').innerText = result.message;
            console.log(result.message);
        }
        
        });
    }

    const login_btn = document.getElementById('login');
    if(login_btn){
        login_btn.addEventListener('click', async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const options = {method : "POST",
                             headers : {"Content-Type": "application/json"},
                             body: JSON.stringify({username, password})
            }
            const response = await fetch("/auth/login", options);
            const result = await response.json();
            if(response.ok && result.success){
                document.getElementById('message').innerText = result.message;
                console.log("User logged in");
                window.location.href = "home.html";
            }else{
                document.getElementById('message').innerText = result.message;
                console.log(result.message);
            }
        });
    }
});
