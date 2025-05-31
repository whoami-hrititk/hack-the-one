window.addEventListener("DOMContentLoaded", () => {
    console.log("register page loaded.");
    const register_btn = document.getElementById("register");
    if(register_btn){
        register_btn.addEventListener("click", async (event) => {
        console.log("clicked submit btn");
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
            window.location.href = "home.html";
        }else{
            console.log(result.message);
        }
        
        });
    }
});