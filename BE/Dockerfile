# Fetching latest version of Java
FROM adoptopenjdk/openjdk11:latest
 
# Setting up work directory
# WORKDIR /app

# Copy the jar file into our app
COPY target/arcade-0.0.1-SNAPSHOT.jar arcade-0.0.1-SNAPSHOT.jar
# COPY . .
# x
# # Exposing port 8080
# EXPOSE 8080

# Starting the application
ENTRYPOINT ["java", "-jar", "/arcade-0.0.1-SNAPSHOT.jar"]