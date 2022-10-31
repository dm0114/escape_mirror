FROM openjdk:8-jdk-alpine
WORKDIR /var/jenkins_home/workspace/sinbangsa_back/BACK/sinbangsa
VOLUME /tmp
ARG JAR_FILE=build/libs/demo-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]