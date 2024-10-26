#include <stdio.h> 
#include <stdlib.h> //Defines four variables types,macros and various functions
#include <string.h> 
#include <unistd.h> // read, write and close the sockets
#include <sys/types.h> //Header File contains definitions of a number od data types used for system calls
#include <sys/socket.h> //Need #include <sys/types.h> Defintion of structures neede for sockets
#include <netinet/in.h> //Need #include <sys/types.h>Contains constants and structures neeede for internet domain address

void error(const char *msg)
{
    perror(msg); //Output error descritption 
    exit(1); //To terminate
}

//argc is the total of parameter is being passed 1 would be file name and port number 
int main(int argc, char *argv[]){
    if(argc < 2)
    {
        fprintf(stderr, "Port Number Not Provide. Program Terminated\n");
        exit(1);
    }
    int sockfd, newsockfd, portno, n;
    char buffer[255]; //msg size

    struct sockaddr_in serv_addr, cli_addr;
    socklen_t clilen; //data type 32 bit and give us the inter address

    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if(sockfd < 0)
    {
        error("Error opening Socket.");
    }

    memset(&serv_addr, 0, sizeof(serv_addr)); //Clears any data/text 
    portno = atoi(argv[1]);

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_addr.s_addr = INADDR_ANY;
    serv_addr.sin_port = htons(portno); //htons: host to network shot

    if(bind(sockfd , (struct sockaddr *) &serv_addr, sizeof(serv_addr)) < 0)
            error("Binding Failed");

//Listening
    listen(sockfd, 5);//Max Of client connect at the same time
    clilen = sizeof(cli_addr);

//Accepting the connection 
    newsockfd = accept(sockfd, (struct sockaddr *) &cli_addr, &clilen);
    if(newsockfd < 0)
    error("Error on Accept");

//Terminating the connection
    while(1)
    {
        memset(buffer, 0, 255);
        n = read(newsockfd, buffer, 255);
        if(n < 0)
                error("Error on reading. ");
        printf("Client: %s\n", buffer);
        memset(buffer,0,255); //clearing
        fgets(buffer, 255, stdin);

        n = write(newsockfd, buffer, strlen(buffer));
        if(n < 0)
                error("Error on writing. ");
        //Gettiing Out Of The Loop
        int i = strncmp("Bye", buffer, 3);
        if(i == 0)
        break;
    }
    close(newsockfd);
    close(sockfd);
    return 0;
}