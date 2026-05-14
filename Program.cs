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
      database.Movies.Add(new Movie("Up", "https://m.media-amazon.com/images/I/71MRrvu3zPL.jpg", "enter description later", 120, 13, 45, "blob:https://web.whatsapp.com/adfcc797-1d5a-484e-b244-c2ce31ae2a25"));
      database.Movies.Add(new Movie("Toy Story", "https://m.media-amazon.com/images/I/71aBLaC4TzL.jpg", "enter description later", 120, 13, 45, "blob:https://web.whatsapp.com/f6a640c4-2273-4a85-bf50-c6b8b7d39cfc"));
      database.Movies.Add(new Movie("Rio", "https://upload.wikimedia.org/wikipedia/en/b/bb/Rio2011Poster.jpg", "enter description later", 120, 13, 45, "blob:https://web.whatsapp.com/5edcfe69-b704-4f7d-80f9-25058e9d6501"));
      database.Movies.Add(new Movie("Avatar", "https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg", "enter description later", 120, 13, 45, "blob:https://web.whatsapp.com/7b49f625-234f-44a7-9430-877d5c5f8dd4"));
      database.Movies.Add(new Movie("Mean Girls", "https://www.movieposters.com/cdn/shop/files/meangirls.24x36_1024x1024.jpg?v=1762968678", "enter description later", 120, 13, 45,"blob:https://web.whatsapp.com/5e18c52b-1e98-4a2a-b13c-36a7b40b28cd"));
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

class Movie(string name, string imageUrl, string description, int duration, int age, int ticketPrice, string imageUrl2)
{
  public int Id { get; set; } = default!;
  public string Name { get; set; } = name;
  public string ImageUrl { get; set; } = imageUrl;
  public string Description { get; set; } = description;
  public int Duration { get; set; } = duration;
  public int Age { get; set; } = age;
  public int TicketPrice { get; set; } = ticketPrice;
  public string ImageUrl2 { get; set; } = imageUrl2;

}

