class ForumManager {
    static instance;
    constructor() {
        if(!!ForumManager.instance) {
            return ForumManager.instance;
        }
        ForumManager.instance = this;
        
    }

    async obtenerPosts () {
        var listaPosts = [];
        const resp = await fetch(`${URL_BASE}/forum`,{method : "GET"});
        const data = await resp.json();
        for (var post of data.data) {
            var postRef = new Post(post.id_forum, post.clienteforum, post.publicacion, post.fecha);
            listaPosts.push(postRef);
        }
        return listaPosts;
    }

    async insertarPost (dni, post) {
        const dataJSON = {
            "dni":dni,
            "post": post
        };
    
        const resp = await fetch(`${URL_BASE}/post`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        return data.msg;
        
    }

    
}
