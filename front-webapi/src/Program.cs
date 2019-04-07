using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Front.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();

                    // Add this section below
                    webBuilder.ConfigureKestrel(options =>
                    {
                        options.ConfigureHttpsDefaults(ssl =>
                        {
                            // Open the Current User's Trusted Root Certificate store
                            var store = new X509Store(StoreName.Root, StoreLocation.CurrentUser);
                            store.Open(OpenFlags.ReadOnly);

                            // Find the IIS Express Certificate
                            var cert = store.Certificates.Find(X509FindType.FindByThumbprint, "B8D21C5A667D33C66DF3533F2FF830CE37FE6ACA", validOnly: false);
                            ssl.ServerCertificate = cert.Cast<X509Certificate2>().First();
                        });
                    });
                });
    }
}
