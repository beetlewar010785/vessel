# Vessel Management System

This is a monorepo for a vessel management system.  
It consists of two main parts:

- **`server/`** — backend REST API written in Go
- **`client/`** — frontend client built with React and Material UI

The system is designed to help crews and technical managers manage vessel operations, such as refueling, port entry requests, and supply orders.

### 📄 Example Data

You can find an example of vessel and equipment data in [Example.xlsx](./docs/Example.xlsx).  
This file illustrates how to represent a vessel, its components, and related operations in spreadsheet form.

### 🚀 Run locally

```bash
docker-compose build && docker-compose up
```