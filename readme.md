# login

url: /users/login
method: POST
email, password

# sign in

url: /users/signup
method: POST
firstName
lastName
email
birthDate
image
password
confirmPassword

# comments

/comments -
method: POST
userId
comment
postId

get post comments:
GET
/comments/< postId >

# add like to sales

url: sales/postid/like

- userId, userFirstName,userFirstName

# remove like from sales

url: sales/postid/unlike
req.body.userId



# all user sales
sales/all/userId
# all user articles
articles/all/userId
