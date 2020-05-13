using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Front.WebApi.Hubs;
using Front.WebApi.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Front.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
#if DEBUG_FROM_CSHARP_Client
            DebugCSharpClient();
#endif

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        public static void DebugCSharpClient()
        {
            StartClient<ISignalRBuilder>((hubConnectionBuilder) => { hubConnectionBuilder.AddMessagePackProtocol(); return "   MSGPACK"; });
            StartClient<ISignalRBuilder>((hubConnectionBuilder) => { hubConnectionBuilder.AddJsonProtocol(); return "      JSON"; });
            StartClient<ISignalRBuilder>((hubConnectionBuilder) => { hubConnectionBuilder.AddNewtonsoftJsonProtocol(); return "NEWTONSOFT"; });
        }

        public static void StartClient<T>(Func<ISignalRBuilder, string> addProtocol) where T : ISignalRBuilder
        {
            var hubConnectionBuilderBuilder = new HubConnectionBuilder()
                .WithUrl("https://localhost:5043/clients")
                .WithAutomaticReconnect()
                ;
            var protocolName = addProtocol(hubConnectionBuilderBuilder);
            var hubConnection = hubConnectionBuilderBuilder.Build();

            Task.Run(async () =>
            {
                await hubConnection.StartAsync();
                var channel = await hubConnection.StreamAsChannelAsync<Product>(nameof(FrontClientHub.SubscribeToInfiniteProduct), "EUR/USD");
                while (true)
                {
                    var product = await channel.ReadAsync();
                    Console.WriteLine($"{protocolName} ---- {product.ProductId} : '{product.Price}'");
                }
            });
        }
    }
}