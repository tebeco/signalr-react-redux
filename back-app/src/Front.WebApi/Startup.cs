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
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                    .AddNewtonsoftJson();

            services.AddCors();
            services.AddSignalR();

            services.AddSingleton<IDataFactory<Product>, ProductFactory>();
            services.AddSingleton<InfinitePublisherFactory<Product>>();
            services.AddSingleton<LimitedPublisherFactory<Product>>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseStaticFiles();
            app.UseDefaultFiles();

            app.UseCors(corsPolicyBuilder =>
            {
                corsPolicyBuilder.WithOrigins("http://localhost:3000")
                                 .AllowCredentials()
                                 .AllowAnyMethod()
                                 .AllowAnyHeader()
                                 ;
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
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
