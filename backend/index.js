// Creamos un servidor base con Express.js.
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { productRoutes, viewRoutes, userRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";
import session from "express-session";
import connection from "./src/api/database/db.js";
import bcrypt from "bcrypt";

const app = express();
const PORT = environments.port;

// Middlewares
app.use(cors()); // middleware básico que permite todas las solicitudes.
app.use(express.json()); // Middleware para parsear JSON en el body.


app.use(session({
   secret: environments.session.key,
   resave: false, // evitar guardar la sesion si no hubos cambios.
   saveUninitialized: true, // no guarda sesiones vacias.
}));

app.use(express.urlencoded({ extended: true }));

// Configuramos EJS como motor de plantillas.
app.set("view engine", "ejs");

// Definimos la ruta donde estan almacenadas las plantillas .ejs, con join combinamos el directorio raiz del proyecto con src/views.
app.set("views", join(__dirname, "src/views"));

app.use('/img', express.static(join(__dirname, 'src/public/img')));
app.use('/css', express.static(join(__dirname, 'src/public/css')));
app.use('/js', express.static(join(__dirname, 'src/public/js')));

// ENDPOINTS
// Get -> traer todos los productos de la base de datos.
app.use("/api/products", productRoutes); // Rutas productos.

app.use("/dashboard", viewRoutes);

app.use("/api/users", userRoutes);

app.get("/login", async (req, res) => {
    res.render('login', {
        title: "login",
    });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('123456', saltRounds);

    // Antes de hashear
    //const [rows] = await UserModels.insertUser(name, email, password);

    // Con la contraseña hasheada
    const sql = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
    return connection.query(sql, [3, "matias", "matias@matias.com", hashedPassword]);

});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body; // Recibimos el email y el password

        // Optimizacion 1: Evitamos consulta innecesaria y le pasamos un mensaje de error a la vista
        if(!email || !password) {
            return res.render("login", {
                title: "login",
                error: "Todos los campos son necesarios!"
            });
        }


        // Sentencia antes de bcrypt
        // const sql = `SELECT * FROM users where email = ? AND password = ?`;
        // const [rows] = await connection.query(sql, [email, password]);

        // Bcrypt I -> Sentencia con bcrypt, traemos solo el email
        const sql = "SELECT * FROM users where email = ?";
        const [rows] = await connection.query(sql, [email]);


        // Si no recibimos nada, es porque no se encuentra un usuario con ese email o password
        if(rows.length === 0) {
            return res.render("login", {
                title: "Login",
                error: "Error! Email o password no validos"
            });
        }

        console.log(rows); // [ { id: 7, name: 'test', email: 'test@test.com', password: 'test' } ]
        const user = rows[0]; // Guardamos el usuario en la variable user
        console.table(user);

        // Bcrypt II -> Comparamos el password hasheado (la contraseña del login hasheada es igual a la de la BBDD?)
        const match = await bcrypt.compare(password, user.password); // Si ambos hashes coinciden, es porque coinciden las contraseñas y match devuelve true
        console.log(user);
        console.log(match);

        if(match) {            
            // Guardamos la sesion
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            }
    
            // Una vez guardada la sesion, vamos a redireccionar al dashboard
            res.redirect("/dashboard");

        } else {
            return res.render("login", {
                title: "Login",
                error: "Epa! Contraseña incorrecta"
            });
        }


    } catch (error) {
        console.log("Error en el login: ", error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


// Endpoint para /logout 
app.post("/logout", (req, res) => {
    // Destruimos la sesion
    req.session.destroy((err) => {
        // En caso de existir algun error, mandaremos una respuesta error
        if(err) {
            console.log("Error al destruir la sesion: ", err);

            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }

        res.redirect("/login");
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})