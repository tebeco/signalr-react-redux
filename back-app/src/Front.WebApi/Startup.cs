using Front.WebApi.Hubs;
using Front.WebApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Streaming.Publishers;

namespace Front.WebApi
{
    public class Startup
    {

        public const string ReactSpaLocalhostCorsName = "react_spa_localhost";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy(ReactSpaLocalhostCorsName, policyBuilder =>
                {
                    policyBuilder.WithOrigins("http://localhost:3000")
                                 .AllowCredentials()
                                 .AllowAnyMethod()
                                 .AllowAnyHeader();
                });
            });

            services.AddSignalR()
                    .AddJsonProtocol()
                    .AddNewtonsoftJsonProtocol()
                    .AddMessagePackProtocol()
                    ;

            services.AddSingleton<ClientTracker>();
            services.AddSingleton<IDataFactory<Product>, ProductFactory>();
            services.AddSingleton<InfinitePublisherFactory<Product>>();
            services.AddSingleton<LimitedPublisherFactory<Product>>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors(ReactSpaLocalhostCorsName);
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<FrontClientHub>("/clients");
                endpoints.MapControllers();
            });
        }
    }
}
