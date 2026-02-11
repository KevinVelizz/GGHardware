const url = "http://localhost:3000/api";
const altaProducts_form = document.getElementById("altaProducts-form");
const formUser = document.getElementById("formCreateUser");

altaProducts_form.addEventListener("submit", async (event) => {

    event.preventDefault();
    try {
        // Extraemos la informacion del formulario HTML en un objeto FormData
        let formData = new FormData(event.target);
        console.log([...formData]);

        // Transformamos nuestro objeto FormData en un objeto normal JS
        let data = Object.fromEntries(formData.entries());
        console.log(data);
        console.table(data);

        if (!data.name || !data.image || !data.price) {
            alert("Todos los campos son obligatorios");
            return;
        }

        let response = await fetch(`${url}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result.message);
            alert(result.message);

        } else {
            let error = await response.json();
            console.log("Error:", error.message);
        }

    } catch (error) {
        console.log("Error al enviar los datos", error);
        alert("Erorr al procesar la solicitud");
    }
});

// Alta Usuarios
formUser.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target); // Transformamos en objeto FormData los campos del formulario

    let data = Object.fromEntries(formData.entries()); // Transformaos a objeto JS el objeto FormData

    console.log(data);

    // Vamos a enviar los datos de nuestro usuario al endpoint /api/users
    try {
        let response = await fetch(`${url}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result);
            alert(result.message)
        }

    } catch(error) { // El catch solo captura errores de red
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
});