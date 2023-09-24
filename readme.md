# Simple CRUD API with MongoDB and ExpressJS

## Overview

This repository contains a simple API for performing CRUD (Create, Read, Update, Delete) operations built using MongoDB and ExpressJS. It also includes an API key system to control access to the data, with read access being available to the public.

## Features

- **Create**: Create new data records.
- **Read**: Retrieve data records (publicly accessible).
- **Update**: Update existing data records.
- **Delete**: Delete data records.
- **API Key System**: Control access to CRUD operations using API keys.
- **MongoDB**: Utilizes MongoDB as the database for data storage.

## API Endpoint

- **GET /http://localhost:3000/book (Public)**: Retrieve data records.
- **GET http://localhost:3000/key (public)**: Retrieve new API key.
- **POST http://localhost:3000/book (API Key Required)**: Create a single/multiple data record.
- **PUT http://localhost:3000/book (API Key Required)**: Update a specific data record.
- **DELETE http://localhost:3000/book (API Key Required)**: Delete a specific data record.