# food-recipe-angular17-spring-boot
A Simple and responsive Food Recipe sharing app created using Angular17 and Spring Boot.

I have a demo video of this project in this [link](https://youtu.be/4Xwj0do-E3s)

# Technologies Used
* **Javascript**
* **Angular17**
* **Angular Material**
* **Java**
* **Spring Boot**
* **MySQL**

# Testing this project
You can clone this project and test it for yourself. However, you need to create *application.properties* in *server/src/main/resources/* directory and add these following variables:

## Back-end

**spring.datasource.driver-class-name** -> com.mysql.cj.jdbc.Driver  
**spring.datasource.url** -> jdbc:mysql://localhost:3306/food-recipe-spring-boot  
**spring.datasource.username** -> Your database username  
**spring.datasource.password** -> Your database password  

**spring.jpa.show-sql** -> Show SQL queries in logs. true or false  
**spring.jpa.generate-ddl** -> Enable DDL like auto table creation. true or false.  

**server.port** -> port where you want your backend to run.  

**jwt.secret.key** -> Secret key for JWT token encryption.  
**endpoint.base** -> Base endpoint of your APIs. e.g. */api/v1*

# Exported .sql file
You could import .sql file into any MySQL platform. This file is exported by PHPmyAdmin. This .sql file contains the database that I used when creating this project.