let po = "";
{   
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/create-post',
                data: newPostForm.serialize(),
                success:function(data){
                    let newPost = newPostDom(data.data);
                    // console.log(data);
                    po = data.data.post;
                    $('#posts').prepend(newPost);
                    // console.log("from the fucnt",data.data.post,data.data.post.content);
                },error:function(error){
                    console.log(error.resposntText);
                }
            })
        });
    }

    // method to create a post
    let newPostDom = function(data){
        // post = JSON.parse(post);
        // await $('.post-count').html+=1;
        let date = new Date(Date.parse(data.post.createdAt));
        return $(`<div id = "post-${data.post._id}" class="post">
        <dt><h4>post 1
            <a class="delete-post-button" href="/post/destroy/${data.post._id }">X</a>
        </h4></dt>
        <dd>
            <small>${data.user.name+" "+date.toDateString()}</small><br>
            <b>${data.post.content}</b>

            <dl><form action="/comment-create" method="post">
            <input type="text" name="content" placeholder="comment" required> <input type="hidden" name="post" value="${data.post._id }"><button type="submit">comment</button></form></dl>
        </dd>
    </div>`)

    }


    //method to delte a post from the dom
    let deletePost = function(event){
            event.preventDefault();
            console.log("clicked is ",event);
            po = event
            $.ajax({
                type:'get',
                url:$(event.target).prop('href'),
                success:function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.resposntText);
                }
            })
        
    }
    // adding event listner 
    $('.post a').on('click',function(event){
        deletePost(event);
    })
    

    createPost();
}