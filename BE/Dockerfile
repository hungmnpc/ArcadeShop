# Fetching latest version of Java
# FROM adoptopenjdk/openjdk11:latest
 
# # Setting up work directory
# # WORKDIR /app

# # Copy the jar file into our app
# COPY target/arcade-0.0.1-SNAPSHOT.jar arcade-0.0.1-SNAPSHOT.jar
# # COPY . .
# # x
# # # Exposing port 8080
# # EXPOSE 8080

# # Starting the application


#
# Build stage
#
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package
RUN mvn -f /home/app/pom.xml clean install

#
# Package stage
#
FROM openjdk:11-jre-slim
COPY --from=build /home/app/target/arcade-0.0.1-SNAPSHOT.jar /usr/local/lib/falcon.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/falcon.jar"]
