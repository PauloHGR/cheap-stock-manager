
# Cheap Stock Manager

This project aims to serve as a small stock manager/list. Initially, these stocks are mined through an API written in Python (I will upload it soon), 
which selects and ranks these stocks through a methodology developed by Joel Greenblatt¹. Through this project, we can create wallets to store 
the stocks and thus have greater control over their purchases.

## Stack used

**Frontend:** Angular

* Interacts with the backend via HttpClient;

* Displays information about wallets, stocks, and allows interactions such as add/remove;

**Backend:** ASP.NET Core:

* Controllers expose REST endpoints;

* Services implement business logic, such as investment calculation;

* Repositories + EF Core access the SQL Server database;

* Also consumes the Python API to obtain updated financial data for stocks.

**External API:** Python API

* Responsible for mining or calculating stock data;

* Returns this information to the .NET backend

**SQL Server:**

Stores entities such as Wallet, Stock, WalletStock (investment history)

## Class Diagram + ER

![er](https://github.com/user-attachments/assets/c1cdd353-9d05-4ba6-823c-3de87a393c79)


## Running locally

Clone the project

```bash
  git clone https://github.com/PauloHGR/cheap-stock-manager.git
```

Enter the directory

```bash
  cd my-project
```

Install the dependecies and start the frontend

```bash
  cd stockManagerFrontend/
  npm install
  npm start
```

Start server

```bash
  dotnet run
```


## Reference

 - [Magic Formule](https://www.wiley.com/en-us/The+Little+Book+That+Still+Beats+the+Market-p-9780470624159)¹

