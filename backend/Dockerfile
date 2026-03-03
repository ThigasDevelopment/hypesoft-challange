FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["backend.sln", "./"]
COPY ["src/Hypesoft.API/Hypesoft.API.csproj", "src/Hypesoft.API/"]
COPY ["src/Hypesoft.Application/Hypesoft.Application.csproj", "src/Hypesoft.Application/"]
COPY ["src/Hypesoft.Domain/Hypesoft.Domain.csproj", "src/Hypesoft.Domain/"]
COPY ["src/Hypesoft.Infrastructure/Hypesoft.Infrastructure.csproj", "src/Hypesoft.Infrastructure/"]

RUN dotnet clean "src/Hypesoft.API/Hypesoft.API.csproj"
RUN dotnet restore "src/Hypesoft.API/Hypesoft.API.csproj"

COPY . .

WORKDIR "/src/src/Hypesoft.API"
RUN dotnet build "Hypesoft.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Hypesoft.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

EXPOSE 8080

COPY --from=publish /app/publish .
ENV ASPNETCORE_HTTP_PORTS=8080

ENTRYPOINT ["dotnet", "Hypesoft.API.dll"]
