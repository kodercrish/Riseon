# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy Gradle wrapper files first to leverage Docker cache
COPY gradlew .
COPY gradle gradle
RUN chmod +x gradlew

# Copy the rest of the project files
COPY . .

# Build without tests for faster image creation
RUN ./gradlew clean build -x test

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the jar from build stage
COPY --from=build /app/build/libs/*-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
