const logout = document.getElementById("logout");
if(logout){
    logout.addEventListener("click", async () => {
        const response = await fetch("/logout");
        const result = await response.json();
        if(result.success){
            console.log("Logout Sucessfull");
            window.location.href = "\signup";
        }else{
            console.log("Logout Failed!");
        }
    });
}



const signup = document.getElementById("signup");

if(signup){
    signup.addEventListener("click", async (event) => {
        event.preventDefault();
        const pass = document.getElementById("pass").value;
        const user = document.getElementById("username").value;
        
        const req = await fetch('http://localhost:3000/api/register',{
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },body: JSON.stringify({user, pass})
        });

        const result = await req.json();

        if(req.ok){
            console.log(result);
            if(result.success){
                window.location.href = '/home';
            }else{
                //resgistration fail logic
            }
        }
    });
}

const register = document.getElementById("register-page");

if(register){
    window.addEventListener("DOMContentLoaded", async () => {
        const res = await fetch("/api/user");
        const result = await res.json();

        if(result.session){
            window.location.href = "/home";
        }
    });
}


