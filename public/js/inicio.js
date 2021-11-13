const URL_BASE = 'http://localhost:3000';
var NM = new NoticeManager();
var MM = new MedicoManager();
var CM = new ComentarioManager();

const cargarNoticias = async() => {
    var noticias = await NM.obtenerNoticias();
    var carousel = document.querySelector(".carousel-inner");
    for (noticia of noticias) {
        var noticia_box = document.createElement('div');
        if(noticia.id == 1){
            noticia_box.setAttribute('class', 'carousel-item active');
        }
        else{
            noticia_box.setAttribute('class', 'carousel-item');
        }        
        noticia_box.setAttribute('style', `background-image: url(${noticia.url})`);
        carousel.appendChild(noticia_box)
    }
}

const cargarComentarios= async() => {
    const comentarios = await CM.obtenerComentarios();
    var comments_container = document.querySelector(".comments__container");
    for(comentario of comentarios) {
        //obtención de datos de medico
        var medicoRef = await MM.obtenerMedico(comentario.id_medico);
        //Creación de divs
        var comment_box = document.createElement('div');
        comment_box.setAttribute('class', 'comment__box');
        var comment_heading = document.createElement('div');
        comment_heading.setAttribute('class', 'comment__heading');
        var comment_profile = document.createElement('div');
        comment_profile.setAttribute('class', 'comment__profile');
        //creacion de divs centrales
        var profile_image = document.createElement('div');
        profile_image.setAttribute('class', 'profile__image');
        var profile_username = document.createElement('div');
        profile_username.setAttribute('class', 'profile__username');
        var comment_content = document.createElement('div');
        comment_content.setAttribute('class', 'comment__content');
        //creación de componentes
        var img_profile = document.createElement('img');
        img_profile.setAttribute("src", medicoRef.url_foto);
        var nombre_profile = document.createElement('strong');
        nombre_profile.innerHTML = medicoRef.nombre;
        var especialidad_profile = document.createElement('span');
        especialidad_profile.innerHTML = medicoRef.especialidad;
        var comentario_box = document.createElement('p');
        comentario_box.innerHTML = comentario.texto;
        //combinación de componentes
        profile_image.appendChild(img_profile);
        comment_profile.appendChild(profile_image);
        comment_heading.appendChild(comment_profile);
        comment_box.appendChild(comment_heading);

        profile_username.appendChild(nombre_profile);
        profile_username.appendChild(especialidad_profile);
        comment_profile.appendChild(profile_username);

        comment_content.appendChild(comentario_box)
        comment_box.appendChild(comment_content);
        //combinación con dom principal
        comments_container.appendChild(comment_box)
    }
    console.log(comentarios)
}


const main = () => {
    cargarNoticias();
    cargarComentarios();
}

window.onload = main;