const URL_BASE = 'http://localhost:3000';
var UM = new UsuarioManager();
var FM = new ForumManager();

const cargarPublicaciones = async() => {
    var subforum = document.querySelector(".subforum");
   while( subforum.firstChild  ){
    subforum.removeChild( subforum.firstChild );
      }
    const publicaciones = await FM.obtenerPosts();
    
    var subforum_title = document.createElement('div');  
    subforum_title.setAttribute('class', 'subforum__title');
    var title = document.createElement('h1');  
    title.innerHTML = "FORUM"
    subforum_title.appendChild(title)  

    var subforum_textspace = document.createElement('div');  
    subforum_textspace.setAttribute('class', 'subforum__textspace');
    var text_area = document.createElement('textarea'); 
    text_area.id = "post"
    var button = document.createElement('button'); 
    button.id = "publicar"
    button.innerHTML = "Publicar"
    button.onclick = publicarEnForum;

    subforum_textspace.appendChild(text_area)
    subforum_textspace.appendChild(button)

    subforum.appendChild(subforum_title)
    subforum.appendChild(subforum_textspace)

    for(publicacion of publicaciones) {
        //obtencion de datos de usuario
        var userRef = await UM.obtenerUsuario(publicacion.id_cliente)
        //creacion de divs centrales
        var subforum_row = document.createElement('div');
        subforum_row.setAttribute('class', 'subforum__row');
        var subforum_image = document.createElement('div');
        subforum_image.setAttribute('class', 'subforum__image');
        var subforum_description = document.createElement('div');
        subforum_description.setAttribute('class', 'subforum__description');
        var subforum_info = document.createElement('div');
        subforum_info.setAttribute('class', 'subforum__info');
        //creación de componentes
        var img_profile = document.createElement('img');
        img_profile.setAttribute("src", "/images/user.png");
        var post = document.createElement('p');
        post.innerHTML = publicacion.publicacion;
        var usuario = document.createElement('b');
        usuario.innerHTML = `Realizado por ${userRef.nombre}`;
        var fecha = document.createElement('small');
        fecha.innerHTML = publicacion.fecha.slice(0, 10);
        //combinación de componentes
        subforum_image.appendChild(img_profile);
        subforum_description.appendChild(post);
        subforum_info.appendChild(usuario);
        subforum_info.appendChild(fecha);

        subforum_row.appendChild(subforum_image);
        subforum_row.appendChild(subforum_description);
        subforum_row.appendChild(subforum_info);
    
        //combinación con dom principal
        subforum.appendChild(subforum_row)
    }
}

const publicarEnForum = async() => {
    var publicacion = document.getElementById("post").value;
    var user = await UM.obtenerUsuarioEnSesion();
    var data = await FM.insertarPost(user.dni, publicacion)
    if(data == ""){
        console.log("todo gucci");
    }
    cargarPublicaciones();
}


const main = () => {
    cargarPublicaciones();
    
}

window.onload = main;