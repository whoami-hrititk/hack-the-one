window.addEventListener("DOMContentLoaded", async () => {
    const homepage = document.getElementById("homepage");
    if(homepage){
        console.log("homepage loaded!");
        const options = {method: "POST", headers:{"Content-Type":"application/json"}}
        const response = await fetch("user/home", options);
        const result = await response.json();

        if(response.ok && result.user){
            document.getElementById("user-name").innerText = result.user.username;
            //Session Data
        }else{
            document.getElementById("user-name").innerText = "User";
        }

        //show gloabal posts 
    }
});
