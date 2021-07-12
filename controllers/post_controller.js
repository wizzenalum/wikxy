const flash = require("connect-flash/lib/flash");
const {Comment,Post} = require("../models");

module.exports.createPost = function(req,res){
    Post.create({content:req.body.content,user:req.user._id},function(err,post){
        if(err){
            console.log(`err in creating the post ${err}`);
            req.flash('error','post is not created');
            
            return res.redirect('/');
        }
        // if(req.xhr){
        //     return res.status(200).json({
        //         data:{
        //             post:post
        //         },message:"post created"
        //     })
        // }

        req.flash('success','post is created');

        console.log(`creted post is ${post}`);
        return res.redirect('/');
    })
}

module.exports.destroy = function(req,res){
    console.log("start destroying post");
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(err){
            console.log(`find Error: ${err}`);
            flash.req('error','your post is deleted');

            return res.redirect('back');
        }
        console.log(`post is found where post.user is ${post.user} and req.user.id is ${req.user.id}`);
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    console.log("Error: ",err);
                }
                req.flash('success','post is deleted');

                console.log(`post deletion is completed`);
                return res.redirect('back');
            })
            
        }
    })
}