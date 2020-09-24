# playsite
fefefew

users table
-----------------------------------------------------------------
| id  | username  | password   | email    | role |
-----------------------------------------------------------------
  AI  | required  | required   | required | defaulted to bssic
-----------------------------------------------------------------

hacks table

-----------------------------------------------------------------
| id  |  title      | post     | created_at    | user_id |
-----------------------------------------------------------------
  AI  | required    | required |autotimestamps | required
-----------------------------------------------------------------

  register - /api/users/register  
  login - /api/users/login
  getallhacks - /api/hacks/gethacks
  gethacksbyId - /api/hacks/gethacks/:id    
  addhack - /api/hacks/newhack     only admin and superadmins
  updatehack - /api/hacks/update/:id   only admin and superadmins
  getallusers - /api/users/getusers    only superadmins
  deletehacks - /api/hacks/delete/:id   onlu superadmins