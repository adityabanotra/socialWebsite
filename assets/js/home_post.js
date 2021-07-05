{   
  // method to submit the form data for new post using AJAX
  let createPost = function(){
      let newPostForm = $('#newpost');

      newPostForm.submit(function(e){
          e.preventDefault();

          $.ajax({
              type: 'post',
              url: '/posts/create',
              data: newPostForm.serialize(),
              success: function(data){
                  let newPost = newPostDom(data.data.post);
                  $('#posts-container>ul').prepend(newPost);
                //   deletePost($(' .delete-post-button', newPost));
              }, error: function(error){
                  console.log(error.responseText);
              }
          });
      });
  }


  
  // method to create a post in DOM
  let newPostDom = function(post){
      console.log('ashj');
      return $(`<li id="post-${post._id}">
      ${post.content} <br>
      ${post.user.name}
      <br><br>
      <small>
      <div id="add-comment">
        
              <small>
                  <a class="delete-post-button" href="/posts/destroy/${post.id}"> Delete</a>
              </small>
         
              <form action="/comments/create" method="POST" >
              <input type="text" name="content" placeholder="Type here to comment..." >
              <input type="hidden" name="post" value="${post._id}">
              <input type="submit" value="addComment">
              </form>
       
      </div>
  </small>
   <div class="post-comments">
       <ul id="comments-list-${post._id}">
           <% for( comment of post.comments ) {%>
             <%-include('_comment')-%>
          <%}%>    
  
       </ul>
   </div>
   <br><br><br>
  </li>`)
  }


  // method to delete a post from DOM
  let deletePost = function(deleteLink){
      $(deleteLink).click(function(e){
          e.preventDefault();

          $.ajax({
              type: 'get',
              url: $(deleteLink).prop('href'),
              success: function(data){
                  $(`#post-${data.data.post_id}`).remove();
              },error: function(error){
                  console.log(error.responseText);
              }
          });

      });
  }






  createPost();
}