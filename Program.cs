
using System;
using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Project.DatabaseUtilities;
using Project.LoggingUtilities;
using Project.ServerUtilities;

class Program
{
  static void Main()
  {
    int port = 5000;

    var server = new Server(port);
    var database = new Database();

    Console.WriteLine("The server is running");
    Console.WriteLine($"Local:   http://localhost:{port}/website/pages/index.html");
    Console.WriteLine($"Network: http://{Network.GetLocalNetworkIPAddress()}:{port}/website/pages/index.html");

    if (database.IsNewlyCreated)
    {
      database.Movies.Add(new Movie("Up", "https://m.media-amazon.com/images/I/71MRrvu3zPL.jpg", "enter description later", 96, 5, 45));
      database.Movies.Add(new Movie("Toy Story", "https://m.media-amazon.com/images/I/71aBLaC4TzL.jpg", "enter description later", 81, 3, 45));
      database.Movies.Add(new Movie("Rio", "https://upload.wikimedia.org/wikipedia/en/b/bb/Rio2011Poster.jpg", "enter description later", 96, 3, 45));
      database.Movies.Add(new Movie("Avatar", "https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg", "enter description later", 161, 13, 45));
      database.Movies.Add(new Movie("Mean Girls", "https://www.movieposters.com/cdn/shop/files/meangirls.24x36_1024x1024.jpg?v=1762968678", "girl who joins a popular high school clique and gets caught up in drama and gossip. She later realizes its toxic and tries to fix her mistakes while learning to be herself.", 97, 13, 45));

      database.Chairs.Add(new Chair(1));
      database.Chairs.Add(new Chair(2));
      database.Chairs.Add(new Chair(3));
      database.Chairs.Add(new Chair(4));
      database.Chairs.Add(new Chair(5));
      database.Chairs.Add(new Chair(6));
      database.Chairs.Add(new Chair(7));
      database.Chairs.Add(new Chair(8));
      database.Chairs.Add(new Chair(9));
      database.Chairs.Add(new Chair(10));
      database.Chairs.Add(new Chair(11));
      database.Chairs.Add(new Chair(12));
      database.Chairs.Add(new Chair(13));
      database.Chairs.Add(new Chair(14));
      database.Chairs.Add(new Chair(15));
      database.Chairs.Add(new Chair(16));
      database.Chairs.Add(new Chair(17));
      database.Chairs.Add(new Chair(18));
      database.Chairs.Add(new Chair(19));
      database.Chairs.Add(new Chair(20));
      database.Chairs.Add(new Chair(21));
      database.Chairs.Add(new Chair(22));
      database.Chairs.Add(new Chair(23));
      database.Chairs.Add(new Chair(24));
      database.Chairs.Add(new Chair(25));
      database.Chairs.Add(new Chair(26));
      database.Chairs.Add(new Chair(27));
      database.Chairs.Add(new Chair(28));
      database.Chairs.Add(new Chair(29));
      database.Chairs.Add(new Chair(30));
      database.SaveChanges();
    }

    while (true)
    {
      var request = server.WaitForRequest();

      Console.WriteLine($"Recieved a request: {request.Name}");

      try
      {
        if (request.Name == "getMovies")
        {
          request.Respond(database.Movies);
        }
        else if (request.Name == "getMovie")
        {
          var movieId = request.GetParams<int>();

          var movie = database.Movies.Find(movieId);

          request.Respond(movie);
        }
        else if (request.Name == "addMovie")
        {
          var (movieName, imageUrl, duration, age, ticketPrice, description) = request.GetParams<(string, string, int, int, int, string)>();
          AddMovie(database, movieName, imageUrl, duration, age, ticketPrice, description);
        }
        // else if (request.Name == "signUp")
        // {
        //   var (username, password, conect)= request.GetParams<(string, string, bool)>();    
        //   AddUser(database, username, password, conect);
        // }


      }
      catch (Exception exception)
      {
        request.SetStatusCode(500);
        Log.WriteException(exception);
      }
    }
  }

  static void AddMovie(Database database, string movieName, string imageUrl, int duration, int age, int ticketPrice, string description)
  {

    database.Movies.Add(new Movie(movieName, imageUrl, description, duration, age, ticketPrice));
    database.SaveChanges();
  }
  // static void AddUser(Database database, string username, string password, bool conect)

  // {

  //   database.Users.Add(new User(username, password, conect));
  //   database.SaveChanges();
  // }
}


class Database() : DatabaseCore("database")
{
  public DbSet<Movie> Movies { get; set; } = default!;
  // public DbSet<User> Users { get; set; } = default!;
    public DbSet<Chair> Chairs { get; set; } = default!;

}

class Movie(string name, string imageUrl, string description, int duration, int age, int ticketPrice)
{
  public int Id { get; set; } = default!;
  public string Name { get; set; } = name;
  public string ImageUrl { get; set; } = imageUrl;
  public string Description { get; set; } = description;
  public int Duration { get; set; } = duration;
  public int Age { get; set; } = age;
  public int TicketPrice { get; set; } = ticketPrice;
}

// class User(string username, string password, bool conect)
// {
//     public int Id { get; set; } = default!;
//     public string Username { get; set; } = username;
//     public string Password { get; set; } = password;
//     public bool Conect { get; set; } = conect;
// }

class Chair(int chairNum){
  public int Id { get; set; } = default!;
  public int ChairNum { get; set; } = chairNum;
}

