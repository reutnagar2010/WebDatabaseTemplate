using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
      database.Movies.Add(new Movie("Up", "https://m.media-amazon.com/images/I/71MRrvu3zPL.jpg", "enter description later", 120, 13, 45));
      database.Movies.Add(new Movie("Toy Story", "https://m.media-amazon.com/images/I/71aBLaC4TzL.jpg", "enter description later", 120, 13, 45));
      database.Movies.Add(new Movie("Rio", "https://upload.wikimedia.org/wikipedia/en/b/bb/Rio2011Poster.jpg", "enter description later", 120, 13, 45));
      database.Movies.Add(new Movie("Avatar", "https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg", "enter description later", 120, 13, 45));
      database.Movies.Add(new Movie("Mean Girls", "https://www.movieposters.com/cdn/shop/files/meangirls.24x36_1024x1024.jpg?v=1762968678", "enter description later", 120, 13, 45));
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
      }
      catch (Exception exception)
      {
        request.SetStatusCode(500);
        Log.WriteException(exception);
      }
    }
  }
}


class Database() : DatabaseCore("database")
{
  public DbSet<Movie> Movies { get; set; } = default!;
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

