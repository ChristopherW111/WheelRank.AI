const rankBtn = document.getElementById("rankBtn");

rankBtn.addEventListener("click", async function () {

    const budget = document.getElementById("budget").value;
    const experience = document.getElementById("experience").value;
    const bikeType = document.getElementById("bikeType").value;
    const goal = document.getElementById("goal").value;

    document.getElementById("bikeName").textContent = "🤖 WheelRank AI is thinking...";
    document.getElementById("score").textContent = "--";

    document.getElementById("reasons").innerHTML = `
        <li>Analyzing your answers...</li>
        <li>Searching the best bikes...</li>
        <li>Calculating WheelRank Score...</li>
    `;

    try {

        const response = await fetch("/recommend", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                budget: budget,
                experience: experience,
                bikeType: bikeType,
                goal: goal

            })

        });

        const data = await response.json();

        document.getElementById("bikeName").textContent = data.bike;
        document.getElementById("score").textContent = data.score;

        let html = "";

        data.reasons.forEach(function(reason){

            html += `<li>✅ ${reason}</li>`;

        });

        document.getElementById("reasons").innerHTML = html;

    }

    catch(error){

        document.getElementById("bikeName").textContent = "Connection Error";

        document.getElementById("score").textContent = "--";

        document.getElementById("reasons").innerHTML = `
            <li>Could not connect to the AI.</li>
        `;

        console.log(error);

    }

});
// ===============================
// AI Bike Builder
// ===============================

const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", async function () {

    const bike = document.getElementById("buildBike").value;
    const height = document.getElementById("height").value;
    const build = document.getElementById("build").value;
    const dream = document.getElementById("dream").value;

    const result = document.getElementById("designText");

    result.innerHTML = `
        🤖 WheelRank AI is creating your custom build...
    `;

    try{

        const response = await fetch("/generate-bike",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                bike:bike,
                height:height,
                build:build,
                prompt:dream

            })

        });

        const data = await response.json();

        result.innerHTML = data.response;

    }

    catch(error){

        result.innerHTML = `
        Something went wrong.

        Please try again.
        `;

        console.log(error);

    }

});