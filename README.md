

To run project locally on Mac:


Clone both the backend and frontend repos

cd into tune-der-backend

If you do not have rbenv installed, install it
    check if you have rbenv: $ rbenv -v
    Install rbenv: $ brew install rbenv
    
Install ruby 3.0.2
    $ rbenv install 3.0.2

Run bundle install to install required gems
    $ bundle install
    
Setup the database
    $ bundle e rails db:setup
    $ bundle e rails db:migrate
    
Install PostgresSQL if it is not already
    check if it installed: $ postgres -v
    Install via Homebrew: $ brew install postgresSQL
    Start the service: $ brew services start postgresql
 
Run the rails server
    $ bundle e rails s
    
cd into Tune-der-frontend

    $ npm install
    $ npm start
    
    


    

    
  

