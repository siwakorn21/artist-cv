FROM ubuntu:20.04

WORKDIR code

RUN apt-get update

RUN apt-get install -y python3 python3-pip

COPY . .

RUN pip3 install -r requirements.txt

EXPOSE 8000

CMD ["python3", "main.py"]